import React, { Dispatch } from "react";
import Navbar from "../shared/code/Navbar";

const CodeLayout = ({
  children,
  setShowMinScreen,
  toShow,
  showMinScreen,
}: {
  children: React.ReactNode;
  setShowMinScreen: Dispatch<string>;
  toShow: string[];
  showMinScreen: string;
}) => {
  // document.addEventListener("keydown", function (event) {
  //   if ((event.ctrlKey || event.metaKey) && event.key === "w") {
  //     console.log("ctrl + w");
  //   }
  // });
  return (
    <main className="w-screen h-screen">
      <Navbar
        showMinScreen={showMinScreen}
        toShow={toShow}
        setShowMinScreen={setShowMinScreen}
      />
      <div className="md:h-[92vh] h-[89vh] overflow-scroll w-full">
        {children}
      </div>
    </main>
  );
};

export default CodeLayout;
