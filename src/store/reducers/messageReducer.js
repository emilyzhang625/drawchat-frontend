const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      console.log("adding the message in reducer");
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CLEAR_MESSAGES":
      return { messages: [] };
    default:
      return state;
  }
};

export default messageReducer;
