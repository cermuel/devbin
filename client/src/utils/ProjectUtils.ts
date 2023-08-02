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
  socket.on("error", (data: any) => {
    // console.log(data);
  });
};

export const typing = ({
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
  socket.emit("typing", {
    room,
    content,
    file,
  });
};

export let toShow = ["HTML", "CSS", "JAVASCRIPT", "OUTPUT"];
