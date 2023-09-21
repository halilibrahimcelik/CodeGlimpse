import { Direction, moveCell } from "@/app/features/cellSlice";
import { useAppDispatch } from "@/app/store";
import React from "react";

import { BiSolidUpArrowCircle, BiSolidDownArrowCircle } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";

type Props = {
  id: string | null;
};
const ActionBar = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const handleUp = () => {
    dispatch(moveCell({ id, direction: Direction.UP }));
  };
  const handleDown = () => {
    dispatch(moveCell({ id, direction: Direction.DOWN }));
  };
  return (
    <div className="flex actionBar justify-end gap-2 absolute z-50 top-1 right-0 opacity-0 translate-y-[-100px] group-hover:opacity-100 group-hover:translate-y-0 transition-all">
      <span
        onClick={handleUp}
        title="Up"
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
      >
        <BiSolidUpArrowCircle />
      </span>
      <span
        title="Down"
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
        onClick={handleDown}
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
