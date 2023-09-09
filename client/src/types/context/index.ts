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
  setLiveError: Dispatch<string>;
  liveError: string;
  HTMLCursor: cursorType;
  setHTMLCursor: Dispatch<cursorType>;
  CSSCursor: cursorType;
  setCSSCursor: Dispatch<cursorType>;
  JSCursor: cursorType;
  setJSCursor: Dispatch<cursorType>;
  HTMLEditor: any;
  setHTMLEditor: Dispatch<any>;
  CSSEditor: any;
  setCSSEditor: Dispatch<any>;
  JSEditor: any;
  setJSEditor: Dispatch<any>;
};
export type cursorType = {
  line: number;
  column: number;
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
