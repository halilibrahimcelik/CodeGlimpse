import { useState, useEffect } from "react";

import MDEditor from "@uiw/react-md-editor";
import Container from "./Container";

const TextEditor = () => {
  const [value, setValue] = useState<string | undefined>("# Hello world!!!**");
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const textEditor = document.querySelector(".text-editor")!;
      if (textEditor?.contains(e.target as Node)) {
        setEdit(true);
      } else {
        setEdit(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (edit) {
    return (
      <Container>
        {" "}
        <MDEditor
          className="cursor-pointer text-editor"
          value={value}
          onChange={setValue}
        />
      </Container>
    );
  }
  return (
    <Container>
      <div onClick={() => setEdit(true)}>
        <MDEditor.Markdown
          className="cursor-pointer preview-editor   border-2 rounded-md p-2.5   dark:border-gray-600 dark:text-white dark:bg-primaryBgLight"
          source={value}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </Container>
  );
};

export default TextEditor;
