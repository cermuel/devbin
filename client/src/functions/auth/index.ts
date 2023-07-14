import { logintype, signuptype } from "../../types/functions/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { isEmailAddress } from "../../utils/AuthUtils";

const BASEURL = process.env.REACT_APP_BASE_URL;

export const signup = async (details: signuptype, navigate: any) => {
  if (
    details.email &&
    details.password &&
    details.lastName &&
    details.firstName
  ) {
    let isValidEmail = isEmailAddress(details.email);
    if (details.firstName.length < 3) {
      toast.error(`Firstname must be at least 3 characters`);
    } else if (details.lastName.length < 3) {
      toast.error(`Lastname must be at least 3 characters`);
    } else if (details.password.length < 7) {
      toast.error(`Password must be at least 7 characters`);
    } else if (!isValidEmail) {
      toast.error(`Invalid Email Address`);
    } else {
      try {
        let data = { ...details, role: "user" };
        const createdUser = await axios.post(`${BASEURL}auth/register`, data);
        let message = createdUser.data?.message || `User created successfully`;
        toast.success(message);
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } catch (err: any) {
        let message =
          err?.response.data?.msg || err?.message || `An error occurred`;
        toast.error(message);
      }
    }
  } else {
    toast.error("Fill in all the details");
  }
};

export const login = async (details: logintype, navigate: any) => {
  if (details.email && details.password) {
    let isValidEmail = isEmailAddress(details.email);
    if (!isValidEmail) {
      toast.error(`Invalid Email Address`);
    } else if (details.password.length < 7) {
      toast.error(`Password must be at least 7 characters`);
    } else {
      try {
        const loggedUser = await axios.post(`${BASEURL}auth/login`, details);
        let message = loggedUser.data?.message || `Login successful`;
        toast.success(message);
        localStorage.setItem("devbin_token", loggedUser.data.token);
        setTimeout(() => {
          navigate("/code/home");
        }, 3000);
      } catch (err: any) {
        let message =
          err?.response.data?.msg || err?.message || `An error occurred`;
        toast.error(message);
        console.log(err);
      }
    }
  } else {
    toast.error("Fill in all the details");
  }
};
export const Logout = (navigate: any) => {
  localStorage.removeItem("devbin_token");
  toast.success("Successfully logged out");
  setTimeout(() => {
    navigate("/auth/login");
  }, 2000);
};
