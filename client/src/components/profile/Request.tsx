import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acceptRequest, declineRequest } from "../../functions/project";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { selectProject } from "../../utils/ProjectUtils";
import { CodeCont } from "../../contexts/CodeContext";

const Request = ({
  request,
  id,
  owner,
}: {
  request: any;
  id: string;
  owner: string;
}) => {
  const navigate = useNavigate();
  const { setactiveID } = useContext(CodeCont);
  return (
    <section className="text-white w-full border-b-2 max-md:text-sm max-md:font-medium flex justify-between">
      <div
        onClick={() => {
          console.log({ request });
          selectProject({
            id,
            navigate,
            owner,
            setactiveID,
          });
        }}
        className="flex w-[35%] cursor-pointer py-3 px-2 capitalize"
      >
        {request.project.name}
      </div>
      <div className="flex w-[30%] cursor-pointer hover:underline py-3 px-2">
        <Link to={`/code/profile/${request.sender._id}`} target="blank">
          {request.sender.firstName + " " + request.sender?.lastName}
        </Link>
      </div>
      <div className="flex w-[20%] py-3 px-2 capitalize text-xs sm:text-sm">
        {request.status}
      </div>
      <div
        className={`flex w-[15%] py-3 px-2 justify-center max-sm:text-base text-xl gap-2 ${
          request.status !== "pending" && "cursor-not-allowed"
        }`}
      >
        <button
          className="text-green-300"
          onClick={() => acceptRequest({ id: request._id })}
          disabled={request.status !== "pending"}
        >
          <BsCheck />
        </button>

        <button
          className="text-red-500"
          onClick={() => declineRequest({ id: request._id })}
          disabled={request.status !== "pending"}
        >
          <IoMdClose />
        </button>
      </div>
    </section>
  );
};

export default Request;
