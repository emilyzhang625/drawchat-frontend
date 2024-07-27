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
  const numUsers = useSelector((state) => state.room.users);

  const handleEnter = () => {
    if (roomID.current.value.trim().length === 0)
      window.alert("Please input a room ID.");
    else {
      dispatch({ type: "SET_ROOM_ID", payload: roomID.current.value });
      socket.emit(
        "createOrJoin",
        roomID.current.value,
        socket.id,
        (message) => {
          dispatch({ type: "SEND_MESSAGE", payload: message });
        }
      );
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
    if (socket.id) {
      socket.emit("sendMessage", currRoom, socket.id, message.current.value);
      dispatch({
        type: "SEND_MESSAGE",
        payload: `You: ${message.current.value}`,
      });
      message.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("getMessage", (message) => {
      dispatch({ type: "GET_MESSAGE", payload: message });
    });

    socket.on("updateSize", (newSize) => {
      dispatch({ type: "SET_ROOM_SIZE", payload: newSize });
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
            <button onClick={handleLeave}>
              Leave room {currRoom} {"(active users: "}
              {numUsers}
              {")"}
            </button>
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
