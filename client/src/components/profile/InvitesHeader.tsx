import React from "react";

const InvitesHeader = () => {
  return (
    <section className="text-white bg-pry w-full border-b-[1px] max-sm:text-sm font-medium flex text-xl justify-between">
      <div className="flex w-[35%] px-1 py-2">Project Name</div>
      <div className="flex w-[30%] px-1 py-2">Sender</div>
      <div className="flex w-[20%] px-1 py-2">Status</div>
      <div className="flex w-[15%] px-1 py-2 justify-center">Action</div>
    </section>
  );
};

export default InvitesHeader;
