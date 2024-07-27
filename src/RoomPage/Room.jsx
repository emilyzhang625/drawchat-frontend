import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import getSocket from "../services/socket";
import Messages from "./components/Messages";
import Canvas from "./components/Canvas";
import "./Room.css";

function EnterRoom() {
  const dispatch = useDispatch();
  const roomID = useRef(null);
  const message = useRef(null);
  const socket = getSocket();
  const [showLeave, setShowLeave] = useState(false);
  const currRoom = useSelector((state) => state.room.id);

  const handleEnter = () => {
    if (roomID.current.value.trim().length === 0)
      window.alert("Please input a room ID.");
    else {
      dispatch({ type: "SET_ROOM_ID", payload: roomID.current.value });
      socket.emit("createOrJoin", roomID.current.value, (message) => {
        dispatch({ type: "SEND_MESSAGE", payload: message });
      });
      setShowLeave(true);
    }
  };

  const handleLeave = () => {
    socket.emit("leaveRoom", currRoom);
    dispatch({ type: "REMOVE_ROOM_ID" });
    dispatch({ type: "CLEAR_MESSAGES" });
    if (roomID.current) roomID.current.value = "";
    setShowLeave(false);
  };

  const sendMessage = () => {
    socket.emit("sendMessage", currRoom, message.current.value);
    dispatch({ type: "SEND_MESSAGE", payload: message.current.value });
    message.current.value = "";
  };

  useEffect(() => {
    socket.on("getMessage", (message) => {
      dispatch({ type: "GET_MESSAGE", payload: message });
    });
  }, []);

  return (
    <div>
      {!showLeave && (
        <div className="enter-container">
          <div className="title">DrawChat</div>
          <div className="join-room">
            <input
              type="text"
              placeholder="Room ID"
              ref={roomID}
              required
            ></input>
            <button onClick={handleEnter}>Create/Join room</button>
          </div>
        </div>
      )}
      {showLeave && (
        <div className="room">
          <div className="sidebar">
            <button onClick={handleLeave}>Leave room {currRoom}</button>
            <div className="send-message">
              <input type="text" placeholder="Message" ref={message}></input>
              <button onClick={sendMessage}>Send</button>
            </div>
            <hr></hr>
            <Messages />
          </div>
          <Canvas className="canvas" />
        </div>
      )}
    </div>
  );
}

export default EnterRoom;
