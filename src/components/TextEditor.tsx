import { useState, useEffect } from "react";

import MDEditor from "@uiw/react-md-editor";
import Container from "./Container";
import { useAppDispatch } from "../app/store";
import { getTextValue, setTextValue } from "../app/features/globalSlice";
import { useSelector } from "react-redux";
import { Cell, updateCell } from "../app/features/cellSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/ui/tooltip";

const TextEditor = ({ id }: Cell) => {
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const value = useSelector(getTextValue);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const textEditor = document.querySelector(".text-editor")!;
      if (textEditor?.contains(e.target as Node)) {
        setEdit(true);
      } else {
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
  }, [dispatch, id, value]);

  if (edit) {
    return (
      <Container>
        {" "}
        <MDEditor
          className="cursor-pointer text-editor"
          value={value}
          onChange={(v) => dispatch(setTextValue(v))}
        />
      </Container>
    );
  }
  return (
    <Container>
      <div
        className="max-h-[400px] overflow-auto flex preview-editor-container"
        onClick={() => setEdit(true)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MDEditor.Markdown
                className="cursor-pointer preview-editor list-disc    border-2 rounded-md p-2.5   dark:border-gray-600 dark:text-white dark:bg-primaryBgLight"
                source={value}
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
