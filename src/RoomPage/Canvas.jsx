import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Canvas({ socket, roomID }) {
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const shouldDraw = useSelector((state) => state.canvas.mouseDown);

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
  }, [canvas]);

  useEffect(() => {
    socket.on("drawing", (data) => {
      const context = canvas.current.getContext("2d");
      context.lineTo(data.x, data.y);
      context.stroke();
    });

    socket.on("startDrawing", (data) => {
      console.log("start drawing pls");
      const context = canvas.current.getContext("2d");
      context.beginPath();
      context.moveTo(data.x, data.y);
    });

    socket.on("endDrawing", () => {
      const context = canvas.current.getContext("2d");
      context.closePath();
    });
  }, []);

  const updateCoords = (event) => {
    if (shouldDraw) {
      const context = canvas.current.getContext("2d");
      context.lineTo(event.clientX, event.clientY);
      context.stroke();

      socket.emit("draw", roomID, { x: event.clientX, y: event.clientY });
    }
  };

  const startPath = (event) => {
    const context = canvas.current.getContext("2d");
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
    socket.emit("startDraw", roomID, { x: event.clientX, y: event.clientY });
    dispatch({ type: "MOUSE_IS_DOWN" });
  };

  const endPath = () => {
    const context = canvas.current.getContext("2d");
    context.closePath();
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
