import {
  Direction,
  clearAlertMessage,
  deleteCell,
  moveCell,
  warningMessage,
} from "@/app/features/cellSlice";
import { useAppDispatch } from "@/app/store";
import { useState } from "react";

import { BiSolidUpArrowCircle, BiSolidDownArrowCircle } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";

type Props = {
  id: string | null;
  type?: string;
};
const ActionBar = ({ id, type }: Props) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleUp = () => {
    dispatch(moveCell({ id, direction: Direction.UP }));
  };
  const handleDown = () => {
    dispatch(moveCell({ id, direction: Direction.DOWN }));
  };
  const handleDelete = () => {
    setConfirm(true);
    dispatch(warningMessage());
    if (confirm) {
      dispatch(deleteCell({ id }));
      dispatch(clearAlertMessage());
      setConfirm(false);
    }
  };
  return (
    <div
      className={`flex ${
        type === "text" ? "actionBar" + `${id}` : ""
      } justify-end gap-2 absolute z-[100] top-1 right-0 opacity-0 translate-y-[-100px] group-hover:opacity-100 group-hover:translate-y-0 transition-all`}
    >
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
        onClick={handleDelete}
        className="text-4xl dark:text-white  text-primaryBgLight  transition-opacity hover:opacity-75 cursor-pointer"
      >
        <RiDeleteBin7Fill />
      </span>
    </div>
  );
};

export default ActionBar;
