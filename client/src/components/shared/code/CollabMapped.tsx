import React, { useContext } from "react";
//@ts-ignore
import userImg from "../../../assets/user.jpeg";
import { AiOutlineLoading } from "react-icons/ai";
import { Collab } from "../../../functions/project";
import { CodeCont } from "../../../contexts/CodeContext";
const CollabMapped = ({
  user,
  currentUser,
}: {
  user: any;
  currentUser: boolean;
}) => {
  const [myloading, setmyloading] = React.useState(false);
  const { activeID } = useContext(CodeCont);
  return (
    <li className="h-14 relative gap-1 flex rounded-md items-center p-2 border-[1px] border-gray-300">
      <img src={userImg} className="h-full  rounded-full" alt="" />
      <div className="h-full flex flex-col justify-center pr-10">
        <p className="text-xs font-medium">
          {user.firstName} {user.lastName}
        </p>
        <span className="text-xs font-light text-gray-600">{user.email}</span>
      </div>
      <button
        onClick={() => {
          Collab({
            setLoading: setmyloading,
            projectID: activeID,
            userId: user._id,
          });
        }}
        className={`absolute right-4 bg-pry rounded-md text-white text-xs w-12 h-6 flex justify-center items-center text-center ${
          currentUser && "hidden"
        }`}
      >
        {myloading ? <AiOutlineLoading className="animate-spin" /> : "Invite"}
      </button>
    </li>
  );
};

export default CollabMapped;
