import axios from "axios";
import { Dispatch } from "react";
import { toast } from "react-hot-toast";

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = localStorage.getItem("devbin_token");

export const getMe = async ({
  setLoading,
  setUser,
}: {
  setLoading: Dispatch<boolean>;
  setUser: Dispatch<any>;
}) => {
  setLoading(true);
  try {
    let user = await axios.get(`${BASEURL}users/me`, {
      headers: { Authorization: `${TOKEN}` },
    });
    user = user.data.user;
    setUser(user);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};
export const getAllUsers = async ({
  setLoading,
  setUsers,
}: {
  setLoading: Dispatch<boolean>;
  setUsers: Dispatch<any>;
}) => {
  setLoading(true);
  try {
    let users = await axios.get(`${BASEURL}users`, {
      headers: { Authorization: `${TOKEN}` },
    });
    users = users.data.data.users;
    setUsers(users);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};
export const getSingleUser = async ({
  setLoading,
  setUser,
  id,
}: {
  setLoading: Dispatch<boolean>;
  setUser: Dispatch<any>;
  id: string;
}) => {
  setLoading(true);
  if (typeof id === "string") {
    try {
      let user = await axios.get(`${BASEURL}users/${id}`, {
        headers: { Authorization: `${TOKEN}` },
      });
      user = user.data?.data?.user;
      setUser(user);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      let message =
        err?.response.data?.msg || err?.message || `An error occurred`;
      toast.error(message);
    }
  }
};
