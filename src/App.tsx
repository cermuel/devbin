import { useEffect, useState } from "react";
import CodeEditor from "./Editor";
import HTMLRenderer from "./HTMLRender";
import socket from "socket.io-client";
import CodeLayout from "./components/layouts/CodeLayout";
import CodeContext from "./contexts/CodeContext";
import Code from "./pages/Code";
import CodeSettingsContext from "./contexts/CodeSettingsContext";

function App() {
  return (
    <CodeContext>
      <CodeSettingsContext>
        <Code />
      </CodeSettingsContext>
    </CodeContext>
  );
}

export default App;
