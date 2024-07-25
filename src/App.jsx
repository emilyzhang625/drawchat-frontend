import EnterPage from "./Enter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
