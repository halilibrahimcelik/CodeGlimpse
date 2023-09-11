import Editor from "@monaco-editor/react";
import { GridLoader } from "react-spinners";

const CodeEditor = () => {
  return (
    <Editor
      theme="vs-dark"
      height={"500px"}
      language="javascript"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        fontFamily: "Consolas",
        automaticLayout: true,
        value: 'function hello() {\n  console.log("Hello, world!");\n}',
      }}
      loading={<GridLoader color="#36d7b7" margin={3} />}
    />
  );
};

export default CodeEditor;
