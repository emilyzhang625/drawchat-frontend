const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, { message: action.payload, sent: true }],
      };
    case "GET_MESSAGE":
      console.log("in get Message");
      return {
        ...state,
        messages: [...state.messages, { message: action.payload, sent: false }],
      };
    case "CLEAR_MESSAGES":
      return { messages: [] };
    default:
      return state;
  }
};

export default messageReducer;
