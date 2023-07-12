import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import Projects from "../components/shared/code/Projects";
import { isAuth } from "../utils/ChatUtils";

const Home = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isAuth(navigate);
  }, []);

  let arr = [1, 2, 31, 2, 31, 2, 31, 2, 3];
  return (
    <main className="bg-gray-800 w-screen h-screen">
      <NavTwo />
      <section className="flex-grow max-h-[92%] gap-8 flex flex-wrap w-full justify-around p-4 px-6 overflow-scroll">
        {arr.map((arr: number) => (
          <Projects key={arr} />
        ))}
      </section>
    </main>
  );
};

export default Home;
