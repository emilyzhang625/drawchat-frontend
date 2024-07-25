import { combineReducers } from "redux";
import canvasReducer from "./canvasReducer";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
  room: roomReducer,
  canvas: canvasReducer,
});

export default rootReducer;
