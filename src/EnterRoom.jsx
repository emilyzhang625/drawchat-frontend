import { useDispatch } from "react-redux";
import { useRef } from "react";
import { io } from "socket.io-client";

function EnterRoom() {
  const dispatch = useDispatch();
  const roomID = useRef(null);

  const handleEnter = () => {
    if (roomID.current.value.trim().length === 0)
      window.alert("Please input a room ID.");
    else {
      dispatch({ type: "SET_ROOM_ID", payload: roomID.current.value });
      const socket = io("http://localhost:3001");
      socket.emit("createOrJoin", roomID.current.value);
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

export default EnterRoom;
