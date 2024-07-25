const initialState = {
  id: "",
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM_ID":
      return { id: action.payload };
    default:
      return state;
  }
};

export default roomReducer;
