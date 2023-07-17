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
