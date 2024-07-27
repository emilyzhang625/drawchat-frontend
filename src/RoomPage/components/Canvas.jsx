import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSocket from "../../services/socket";

function Canvas() {
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const shouldDraw = useSelector((state) => state.canvas.mouseDown);
  const roomID = useSelector((state) => state.room.id);
  const socket = getSocket();
  const context = useRef(null);

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    context.current = canvas.current.getContext("2d");
  }, [canvas]);

  useEffect(() => {
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
  }, []);

  const updateCoords = (event) => {
    if (shouldDraw) {
      context.current.lineTo(event.clientX, event.clientY);
      context.current.stroke();
      socket.emit("draw", roomID, { x: event.clientX, y: event.clientY });
    }
  };

  const startPath = (event) => {
    context.current.beginPath();
    context.current.moveTo(event.clientX, event.clientY);
    socket.emit("startDraw", roomID, { x: event.clientX, y: event.clientY });
    dispatch({ type: "MOUSE_IS_DOWN" });
  };

  const endPath = () => {
    context.current.closePath();
    socket.emit("endDraw", roomID);
    dispatch({ type: "MOUSE_IS_UP" });
  };

  return (
    <canvas
      ref={canvas}
      onMouseDown={startPath}
      onMouseUp={endPath}
      onMouseMove={updateCoords}
    ></canvas>
  );
}

export default Canvas;
