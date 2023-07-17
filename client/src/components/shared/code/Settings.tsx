import React, { Dispatch, useContext } from "react";
import { FontSizes, monacoEditorThemes } from "../../../utils/ChatUtils";
import { CodeSettingsCont } from "../../../contexts/CodeSettingsContext";

const Settings = ({
  setshowSettings,
}: {
  setshowSettings: Dispatch<boolean>;
}) => {
  const { theme, setTheme, setfontSize } = useContext(CodeSettingsCont);
  return (
    <div className="md:w-[500px] space-y-3 w-[80%] md:h-80 p-4 md:p-8 h-72 z-10 bg-[#101010] border-2 border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] absolute left-[50%] translate-x-[-50%] top-10">
      <section>
        <h1 className="text-gray-200 font-semibold">Theme</h1>
        <select
          name=""
          className="outline-none"
          onChange={(e: any) => setTheme(e.target.value)}
          id=""
        >
          {monacoEditorThemes.map((theme: string, key: number) => (
            <option key={key} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </section>
      <section>
        <h1 className="text-gray-200 font-semibold">Font Size</h1>
        <select
          name=""
          className="outline-none"
          onChange={(e: any) => setfontSize(e.target.value)}
          id=""
        >
          {FontSizes.map((font: number, key: number) => (
            <option value={font} key={key}>
              {font}
            </option>
          ))}
        </select>
      </section>
      <button
        onClick={() => setshowSettings(false)}
        className="text-white absolute bottom-2 right-2 px-4 py-2 bg-pry rounded-sm max-md:text-sm"
      >
        Close
      </button>
    </div>
  );
};

export default Settings;
