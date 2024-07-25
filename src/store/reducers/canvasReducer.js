const initialState = {
  mouseDown: false,
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_IS_DOWN":
      return { mouseDown: true };
    case "MOUSE_IS_UP":
      return { mouseDown: false };
    default:
      return state;
  }
};

export default canvasReducer;
