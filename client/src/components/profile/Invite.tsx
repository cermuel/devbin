import React from "react";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { acceptInvite, declineInvite } from "../../functions/project";

const Invite = ({ invite }: { invite: any }) => {
  console.log(invite);
  return (
    <section className="text-white w-full border-b-2 max-md:text-sm max-md:font-medium flex justify-between">
      <div className="flex w-[35%] py-3 px-2 capitalize">
        {invite.project.name}
      </div>
      <div className="flex w-[30%] cursor-pointer hover:underline py-3 px-2">
        <Link to={`/code/profile/${invite.sender._id}`} target="blank">
          {invite.sender.firstName + " " + invite.sender?.lastName}
        </Link>
      </div>
      <div className="flex w-[20%] py-3 px-2 capitalize text-xs sm:text-sm">
        {invite.status}
      </div>
      <div
        className={`flex w-[15%] py-3 px-2 justify-center max-sm:text-base text-xl gap-2 ${
          invite.status !== "pending" && "cursor-not-allowed"
        }`}
      >
        <button
          className="text-green-300"
          onClick={() => acceptInvite({ id: invite._id })}
          disabled={invite.status !== "pending"}
        >
          <BsCheck />
        </button>

        <button
          className="text-red-500"
          onClick={() => declineInvite({ id: invite._id })}
          disabled={invite.status !== "pending"}
        >
          <IoMdClose />
        </button>
      </div>
    </section>
  );
};

export default Invite;
