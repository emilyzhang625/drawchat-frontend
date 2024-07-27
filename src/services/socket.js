import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:3001";

let socket = null;

const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export default getSocket;
