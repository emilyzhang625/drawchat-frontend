import EnterRoomPage from "./EnterRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomPage from "./RoomPage/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterRoomPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
