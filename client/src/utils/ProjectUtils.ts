import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { handleSession } from "../contexts/CodeContext";

export const selectProject = ({
  id,
  setactiveID,
  navigate,
  owner,
}: {
  id: string;
  setactiveID: Dispatch<string>;
  navigate: NavigateFunction;
  owner: string;
}) => {
  setactiveID(id);
  navigate("/code/bin");
  localStorage.setItem("active_owner", owner);
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
  handleSession();
  live ? socket.emit("join", activeID) : socket.emit("leave", activeID);
  socket.on("error", (data: string) => {
    if (data === "You are not a collaborator") {
      setLiveError(data);
    }
  });
  socket.on("success", (data: string) => {
    console.log(data);
    if (data === "successfully") {
      setLiveError("Joined Successfully!");
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
  fileType,
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
  fileType: string;
}) => {
  socket.emit("insertText", { room, data, file, fileType });
};

export const deleteText = ({
  room,
  data,
  file,
  socket,
  fileType,
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
  fileType: string;
}) => {
  socket.emit("deleteText", { room, data, file, fileType });
};

export let toShow = ["HTML", "CSS", "JAVASCRIPT", "OUTPUT"];
