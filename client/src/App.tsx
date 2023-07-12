import socket from "socket.io-client";
import CodeContext from "./contexts/CodeContext";
import Code from "./pages/Code";
import CodeSettingsContext from "./contexts/CodeSettingsContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Entry from "./pages/Entry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
      <CodeContext>
        <CodeSettingsContext>
          <Routes>
            <Route path="/code/bin" element={<Code />} />
            <Route path="/code/home" element={<Home />} />
            <Route path="/code/profile" element={<Profile />} />
          </Routes>
        </CodeSettingsContext>
      </CodeContext>
    </Router>
  );
}

export default App;
