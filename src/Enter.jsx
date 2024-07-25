import { useDispatch } from "react-redux";
import { useRef } from "react";
import store from "./store/store";

function Enter() {
  const dispatch = useDispatch();
  const roomID = useRef(null);

  const handleEnter = () => {
    if (roomID.current.value.trim().length === 0)
      window.alert("Please input a room ID.");
    else {
      dispatch({ type: "SET_ROOM_ID", payload: roomID.current.value });
      console.log(store.getState());
      roomID.current.value = "";
    }
  };
  return (
    <div>
      <input type="text" placeholder="Room ID" ref={roomID} required></input>
      <button onClick={handleEnter}>Join/Create Room</button>
    </div>
  );
}

export default Enter;
