import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DrawingCanvas() {
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const shouldDraw = useSelector((state) => state.canvas.mouseDown);

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
  }, [canvas]);

  const updateCoords = (event) => {
    if (shouldDraw) {
      const context = canvas.current.getContext("2d");
      context.lineTo(event.clientX, event.clientY);
      context.stroke();
    }
  };

  const startPath = (event) => {
    const context = canvas.current.getContext("2d");
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
    dispatch({ type: "MOUSE_IS_DOWN" });
  };

  const endPath = () => {
    const context = canvas.current.getContext("2d");
    context.closePath();
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

export default DrawingCanvas;
