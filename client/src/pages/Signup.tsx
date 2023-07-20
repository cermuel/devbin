import React, { useLayoutEffect, useState } from "react";
//@ts-ignore
import gif from "../assets/authleft.gif";
//@ts-ignore
import longlogo from "../assets/longlogo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/shared/auth/Input";
import Header from "../components/shared/auth/Header";
import { signuptype } from "../types/functions/auth";
import { signup } from "../functions/auth";
import { Toaster } from "react-hot-toast";
import { isAuthLogin } from "../utils/ChatUtils";

const Signup = () => {
  const [details, setdetails] = useState<signuptype>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isAuthLogin(navigate);
  }, []);
  return (
    <main className="w-screen bg-gray-800 h-screen flex flex-row-reverse items-center">
      <Toaster />
      <section className="w-[65%] max-md:hidden h-full">
        <img src={gif} className="w-full h-full" alt="" />
      </section>
      <section className="w-[35%] max-md:w-full h-full py-12 flex justify-between items-center flex-col">
        <img src={longlogo} className="w-[40%]" alt="" />
        <div className="w-full space-y-4 max-lg:px-20 max-md:px-12 max-sm:px-4">
          <div className="flex flex-col items-center px-4 w-full">
            <Header text="Signup" />
          </div>
          <AuthInput
            label="Firstname"
            type="text"
            onChange={(e: any) =>
              setdetails({ ...details, firstName: e.target.value })
            }
          />
          <AuthInput
            label="Lastname"
            type="text"
            onChange={(e: any) =>
              setdetails({ ...details, lastName: e.target.value })
            }
          />
          <AuthInput
            label="Email"
            type="email"
            onChange={(e: any) =>
              setdetails({ ...details, email: e.target.value })
            }
          />
          <AuthInput
            label="Password"
            type="password"
            onChange={(e: any) =>
              setdetails({ ...details, password: e.target.value })
            }
          />
          <div className="flex flex-col items-center px-4 w-full ">
            <button
              onClick={() => signup(details, navigate)}
              className="w-full lg:w-[300px] text-center py-3 bg-pry flex justify-center items-center text-white text-lg font-medium rounded-sm"
            >
              Signup
            </button>
          </div>
          <div className="w-full text-center text-white">
            Already have an account?
            <Link to={"/auth/login"} className="text-pry">
              {" "}
              Login!
            </Link>
          </div>
        </div>
        <footer>
          <p className="text-gray-400">
            Copyright &copy; DevBIN {new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Signup;
