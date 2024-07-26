// import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { io } from "socket.io-client";

import Canvas from "./RoomPage/Canvas";

function EnterRoom() {
  //   const dispatch = useDispatch();
  const roomID = useRef(null);
  const message = useRef(null);
  const socket = io("http://localhost:3001");
  const [showCanvas, setShowCanvas] = useState(false);
  //   const currRoom = useSelector((state) => state.room.id);
  //   console.log(currRoom);

  const handleEnter = () => {
    if (roomID.current.value.trim().length === 0)
      window.alert("Please input a room ID.");
    else {
      socket.emit("createOrJoin", roomID.current.value, (message) => {
        // dispatch({ type: "SET_ROOM_ID", payload: roomID.current.value });
        setShowCanvas(true);
        window.alert(message);
      });
    }
  };

  const handleLeave = () => {
    socket.emit("leaveRoom", roomID.current.value, (message) => {
      //   dispatch({ type: "REMOVE_ROOM_ID" });
      roomID.current.value = "";
      setShowCanvas(false);
      window.alert(message);
    });
  };

  const sendMessage = () => {
    socket.emit(
      "sendMessage",
      roomID.current.value,
      message.current.value,
      (cbMessage) => {
        window.alert(cbMessage);
        message.current.value = "";
      }
    );
  };

  socket.on("getMessage", (message) => {
    console.log(message);
  });

  return (
    <div>
      <input type="text" placeholder="Room ID" ref={roomID} required></input>
      <button onClick={handleEnter}>Create/Join room</button>
      <button onClick={handleLeave}>Leave room</button>
      <input type="text" placeholder="Message" ref={message}></input>
      <button onClick={sendMessage}>Send</button>
      {showCanvas && <Canvas socket={socket} roomID={roomID.current.value} />}
    </div>
  );
}

export default EnterRoom;
