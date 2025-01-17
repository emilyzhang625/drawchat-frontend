import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSocket from "../../services/socket";
import "./Canvas.css";
import { getPos } from "./coords";

function Canvas() {
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const shouldDraw = useSelector((state) => state.canvas.mouseDown);
  const roomID = useSelector((state) => state.room.id);
  const socket = getSocket();
  const context = useRef(null);

  useEffect(() => {
    context.current = canvas.current.getContext("2d");
    resize();

    socket.on("drawing", (data) => {
      context.current.lineTo(data.x, data.y);
      context.current.stroke();
    });

    socket.on("startDrawing", (data) => {
      context.current.beginPath();
      context.current.moveTo(data.x, data.y);
    });

    socket.on("endDrawing", () => {
      context.current.closePath();
    });

    socket.on("clearDrawing", () => {
      clear();
    });
  }, [canvas]);

  const updateCoords = (event) => {
    if (shouldDraw) {
      const pos = getPos(canvas.current, event);
      context.current.lineTo(pos.x, pos.y);
      context.current.stroke();
      socket.emit("draw", roomID, {
        x: pos.x,
        y: pos.y,
      });
    }
  };

  const startPath = (event) => {
    const pos = getPos(canvas.current, event);
    context.current.beginPath();
    context.current.moveTo(pos.x, pos.y);
    socket.emit("startDraw", roomID, {
      x: pos.x,
      y: pos.y,
    });
    dispatch({ type: "MOUSE_IS_DOWN" });
  };

  const endPath = () => {
    context.current.closePath();
    socket.emit("endDraw", roomID);
    dispatch({ type: "MOUSE_IS_UP" });
  };

  const resize = () => {
    canvas.current.width = 0.55 * window.innerWidth;
    canvas.current.height = 0.8 * window.innerHeight;
  };

  const handleClear = () => {
    clear();
    dispatch({ type: "SEND_MESSAGE", payload: "You cleared canvas" });
    socket.emit("clearDraw", roomID, socket.id);
  };

  const clear = () => {
    if (canvas.current) {
      context.current.clearRect(
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );
    }
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvas}
        onMouseDown={startPath}
        onMouseUp={endPath}
        onMouseMove={updateCoords}
      ></canvas>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default Canvas;
