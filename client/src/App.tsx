import CodeContext from "./contexts/CodeContext";
import Code from "./pages/Code";
import CodeSettingsContext from "./contexts/CodeSettingsContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Entry from "./pages/Entry";
import CreateProject from "./pages/CreateProject";
import User from "./pages/User";
import PageNotFound from "./pages/404";

const knownRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/code/bin",
  "/code/bin/new",
  "/code/home",
  "/code/profile/me",
];

const allroutes = knownRoutes.filter((route: string) =>
  route.includes(window.location.pathname)
);
const isProfile = window.location.pathname.includes("/code/profile/");

function App() {
  if (allroutes.length > 0 || isProfile) {
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
              <Route path="/code/bin/new" element={<CreateProject />} />
              <Route path="/code/home" element={<Home />} />
              <Route path="/code/profile/me" element={<Profile />} />
              <Route path="/code/profile/:id" element={<User />} />
            </Routes>
          </CodeSettingsContext>
        </CodeContext>
      </Router>
    );
  } else {
    return <PageNotFound />;
  }
}

export default App;
