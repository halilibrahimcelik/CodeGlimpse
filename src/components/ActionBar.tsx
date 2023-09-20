import React from "react";

import { BiSolidUpArrowCircle, BiSolidDownArrowCircle } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";

const ActionBar = () => {
  return (
    <div className="flex actionBar justify-end gap-2 absolute z-50 top-0 right-0 opacity-0 translate-y-[-100px] group-hover:opacity-100 group-hover:translate-y-0 transition-all">
      <span
        title="Up"
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
      >
        <BiSolidUpArrowCircle />
      </span>
      <span
        title="Down"
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
      >
        <BiSolidDownArrowCircle />
      </span>
      <span
        title="Delete"
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
      >
        <RiDeleteBin7Fill />
      </span>
    </div>
  );
};

export default ActionBar;
