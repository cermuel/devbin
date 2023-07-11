import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <h2 className="w-full lg:w-[300px] text-5xl font-medium text-white">
      {text}
    </h2>
  );
};

export default Header;
