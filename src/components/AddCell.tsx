import { Button } from "./UI/ui/button";
import { RiAddCircleLine } from "react-icons/ri";
import { useAppDispatch } from "@/app/store";
import { insertCellBefore } from "@/app/features/cellSlice";

type Props = {
  id: string | null;
};

const AddCell = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const handleAddText = () => {
    dispatch(
      insertCellBefore({
        id,
        type: "text",
      })
    );
  };
  const handleAddCode = () => {
    dispatch(
      insertCellBefore({
        id,
        type: "code",
      })
    );
  };
  return (
    <div className="flex justify-center gap-4 w-5/6 mx-auto before:z-0 relative before:absolute before:content-[''] before:w-full before:h-[1px] before:top-[50%] dark:before:bg-gray-500 before:bg-primaryBgDark">
      <Button
        onClick={handleAddText}
        className="button-primary flex gap-1 relative z-10"
      >
        {" "}
        <RiAddCircleLine /> <span>Text</span>
      </Button>
      <Button
        onClick={handleAddCode}
        className="button-primary flex gap-1 relative z-10"
      >
        {" "}
        <RiAddCircleLine /> <span>Code</span>{" "}
      </Button>
    </div>
  );
};

export default AddCell;
