import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import Container from "./Container";
import { useAppDispatch } from "../app/store";
import {
  Cell,
  CellState,
  getContent,
  updateCell,
} from "../app/features/cellSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/ui/tooltip";
import ActionBar from "./ActionBar";
import { useSelector } from "react-redux";

const TextEditor = ({ id }: Cell) => {
  const [edit, setEdit] = useState<boolean>(false);
  const content = useSelector((state: { cell: CellState }) =>
    getContent(state, id as string)
  );
  const [value, setValue] = useState<string>(content);

  const dispatch = useAppDispatch();

  console.log(content, "content");
  const actionBar = document.querySelector(".actionBar" + id)!;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const textEditor = document.querySelector(".text-editor")!;
      if (
        textEditor?.contains(e.target as Node) &&
        textEditor.getAttribute("data-id") === id
      ) {
        setEdit(true);
      } else {
        const isActionBar = actionBar?.contains(e.target as Node);
        if (isActionBar) return;
        setEdit(false);
      }
    };

    const timer = setTimeout(() => {
      dispatch(updateCell({ id: id, content: value }));
    }, 1000);
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
      clearTimeout(timer);
    };
  }, [dispatch, id, value, actionBar]);
  if (edit) {
    return (
      <Container>
        {" "}
        <MDEditor
          value={value}
          className="cursor-pointer text-editor mt-10  bg-gray-600"
          data-id={id}
          onChange={(v) => setValue(v as string)}
        />
      </Container>
    );
  }
  return (
    <Container>
      <div
        className=" overflow-auto group  flex preview-editor-container relative pt-12 "
        onClick={(e) => {
          actionBar?.contains(e.target as Node)
            ? setEdit(false)
            : setEdit(true);
        }}
      >
        <ActionBar id={id} type="text" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MDEditor.Markdown
                className="cursor-pointer h-[300px] shadow-md preview-editor list-disc    border-[3px] rounded-md p-2.5   dark:border-gray-600 dark:text-white dark:bg-primaryBgLight"
                source={content}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click To Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Container>
  );
};

export default TextEditor;
