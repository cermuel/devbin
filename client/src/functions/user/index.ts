import axios from "axios";
import { toast } from "react-hot-toast";

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = localStorage.getItem("devbin_token");

export const getUser = async () => {
  try {
    let user = await axios.get(`${BASEURL}users/me`, {
      headers: { Authorization: `${TOKEN}` },
    });
    user = user.data.user;
    console.log(user);
  } catch (err: any) {
    // toast.error(err);
    console.log(err);
  }
};
