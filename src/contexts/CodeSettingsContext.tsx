import React from "react";
import { CodeSettingsType } from "../types/context";
export const CodeSettingsCont = React.createContext<CodeSettingsType>({
  theme: "vs-dark",
  setTheme: () => {},
  fontSize: 12,
  setfontSize: () => {},
  codeName: "My DevBIN App",
  setCodeName: () => {},
  editorNotMounted: true,
  setEditorNotMounted: () => {},
});
const CodeSettingsContext = ({ children }: { children: React.ReactNode }) => {
  const [theme, settheme] = React.useState<string>("vs-dark");
  const [fontSize, setfontSize] = React.useState<number>(12);
  const [codeName, setCodeName] = React.useState<string>("My DevBIN App");
  const [editorNotMounted, setEditorNotMounted] = React.useState<boolean>(true);
  return (
    <CodeSettingsCont.Provider
      value={{
        theme,
        setTheme: settheme,
        setfontSize,
        fontSize,
        codeName,
        setCodeName,
        editorNotMounted,
        setEditorNotMounted,
      }}
    >
      {children}
    </CodeSettingsCont.Provider>
  );
};

export default CodeSettingsContext;
