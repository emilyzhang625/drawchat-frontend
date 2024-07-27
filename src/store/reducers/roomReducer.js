const initialState = {
  id: "",
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM_ID":
      return { ...state, id: action.payload };
    case "REMOVE_ROOM_ID":
      return { ...state, id: "" };
    case "SET_ROOM_SIZE":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default roomReducer;
