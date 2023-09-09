import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";

export const selectProject = ({
  id,
  setactiveID,
  navigate,
}: {
  id: string;
  setactiveID: Dispatch<string>;
  navigate: NavigateFunction;
}) => {
  setactiveID(id);
  navigate("/code/bin");
};

export const handleSucessError = (socket: any) => {
  socket.on("success", (data: any) => {
    // console.log(data);
  });
  socket.on("error", (data: string) => {
    console.log(data);
    // toast.error(data);
  });
};

export const handleJoin = ({
  live,
  socket,
  activeID,
  setLiveError,
}: {
  live: boolean;
  socket: any;
  setLiveError: Dispatch<string>;
  activeID: string;
}) => {
  live ? socket.emit("join", activeID) : socket.emit("leave", activeID);
  socket.on("error", (data: string) => {
    if (data === "You are not a collaborator") {
      setLiveError(data);
    }
  });
  socket.on("success", (data: string) => {
    if (data === "Joined successfully") {
      setLiveError(data);
    }
  });
};

export const save = ({
  socket,
  content,
  room,
  file,
}: {
  socket: any;
  room: string;
  content: string;
  file: string;
}) => {
  socket.emit("save", {
    room,
    content,
    file,
  });
};

export const insertText = ({
  room,
  data,
  file,
  socket,
}: {
  room: string;
  data: {
    cursorPosition: {
      line: number;
      column: number;
    };
    text: string;
    timestamp: Date;
  };
  file: string;
  socket: any;
}) => {
  socket.emit("insertText", { room, data, file });
};

export const deleteText = ({
  room,
  data,
  file,
  socket,
}: {
  room: string;
  data: {
    cursorPosition: {
      line: number;
      column: number;
    };
    text: string;
    timestamp: Date;
  };
  file: string;
  socket: any;
}) => {
  socket.emit("deleteText", { room, data, file });
};

export let toShow = ["HTML", "CSS", "JAVASCRIPT", "OUTPUT"];
