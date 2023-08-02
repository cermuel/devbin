import { Dispatch } from "react";

export type CodeContType = {
  HTML: any;
  CSS: any;
  JS: any;
  setHTML: Dispatch<any>;
  setCSS: Dispatch<any>;
  setJS: Dispatch<any>;
  activeID: string;
  setactiveID: Dispatch<string>;
  socket: any;
  live: boolean;
  setLive: Dispatch<boolean>;
};

export type CodeSettingsType = {
  theme: string;
  setTheme: Dispatch<string>;
  fontSize: number;
  setfontSize: Dispatch<number>;
  codeName: string;
  setCodeName: Dispatch<string>;
  editorNotMounted: boolean;
  setEditorNotMounted: Dispatch<boolean>;
};
