import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { GridLoader } from "react-spinners";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<string | null | editor.IStandaloneCodeEditor>("");

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
      editorRef.current = editor.getValue();
    });

    editor.getModel()?.updateOptions({
      tabSize: 2,
    });
  };
  const handleFormat = () => {
    console.log(editorRef.current);
  };
  return (
    <>
      <Editor
        theme="vs-dark"
        height={"500px"}
        language="javascript"
        onMount={handleEditorDidMount}
        value={initialValue}
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
        }}
        loading={<GridLoader color="#36d7b7" margin={3} />}
      />

      <button onClick={handleFormat}>Format</button>
    </>
  );
};

export default CodeEditor;
