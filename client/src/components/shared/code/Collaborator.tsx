import React, { Dispatch, useContext, useState } from "react";
import { getAllUsers, getMe } from "../../../functions/user";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlineSearch,
} from "react-icons/ai";
import { CodeSettingsCont } from "../../../contexts/CodeSettingsContext";
import CollabMapped from "./CollabMapped";

const Collaborator = ({
  setshowCollab,
}: {
  setshowCollab: Dispatch<boolean>;
}) => {
  const { codeName } = useContext(CodeSettingsCont);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [query, setquery] = useState<string>("");
  const [me, setUser] = useState<any>();
  const [MeLoading, setMeLoading] = useState<boolean>(false);
  React.useLayoutEffect(() => {
    getAllUsers({ setLoading, setUsers });
    getMe({ setLoading: setMeLoading, setUser });
  }, []);
  console.log(users);
  const filteredUsers = users.filter((user: any) => {
    let fullname = user.firstName + " " + user.lastName;
    return (
      fullname.toLowerCase().includes(query.toLowerCase()) ||
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase())
    );
  });
  return (
    <div className="sm:w-[400px] z-[100000] bg-white w-[80%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] fixed h-96 rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <button
        className="absolute text-lg top-4 right-4"
        onClick={() => setshowCollab(false)}
      >
        <AiOutlineClose />
      </button>
      {loading || MeLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <AiOutlineLoading className="animate-spin text-pry text-4xl" />
        </div>
      ) : (
        <div className="w-full h-full">
          {users && users.length > 0 ? (
            <section className="w-full h-full px-4 py-10">
              <h1 className="mb-2 text-xl font-medium">{codeName}</h1>
              <div className="w-full h-8 border-[1px] border-gray-300 flex rounded-md items-center px-3 gap-1">
                <AiOutlineSearch />
                <input
                  type="text"
                  placeholder="Search Users..."
                  onChange={(e: any) => setquery(e.target.value)}
                  className="outline-none bg-transparent font-light w-full"
                />
              </div>
              <ul className="flex h-[75%] overflow-y-scroll flex-col gap-2 my-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user: any) => {
                    let currentUser = me._id === user._id;
                    return (
                      <CollabMapped user={user} currentUser={currentUser} />
                    );
                  })
                ) : (
                  <h1 className="pl-1">User not found</h1>
                )}
              </ul>
            </section>
          ) : (
            <section className="w-full h-full flex justify-center items-center">
              <h1 className="text-xl font-semibold"> No Users Found</h1>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Collaborator;
