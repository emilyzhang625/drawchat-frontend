import { combineReducers } from "redux";
import canvasReducer from "./canvasReducer";
import roomReducer from "./roomReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  room: roomReducer,
  canvas: canvasReducer,
  messages: messageReducer,
});

export default rootReducer;
