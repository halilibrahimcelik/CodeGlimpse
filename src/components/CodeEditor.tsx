import { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { GridLoader } from "react-spinners";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import htmlplugin from "prettier/plugins/html";
import typescriptPlugin from "prettier/plugins/typescript";
import cssPlugin from "prettier/plugins/postcss";
import graphqlPlugin from "prettier/plugins/graphql";
import { useAppDispatch } from "../app/store";
import { setInput } from "../app/features/globalSlice";

import { useSelector } from "react-redux";
import { selectDarkMode } from "../app/features/globalSlice";
import PreviwCode from "./PreviwCode";
import Container from "./Container";
import Resizeable from "./Resizeable";

interface CodeEditorProps {
  initialValue: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(async () => {
      setCode(editor.getValue());
    });

    editor.getModel()?.updateOptions({
      tabSize: 1,
    });
    monaco.editor.setModelLanguage(editor.getModel()!, language);
  };
  const handleFormat = async () => {
    //unformated code
    const unformated = editorRef?.current?.getValue() as string;

    // Set the language for the current editor model

    try {
      //formated code
      const formated: string = await prettier.format(unformated, {
        parser: language === "javascript" ? "babel" : language,
        plugins: [
          babelPlugin,
          estreePlugin,
          graphqlPlugin,
          typescriptPlugin,
          htmlplugin,
          cssPlugin,
        ],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });

      //set formated code to editor
      editorRef?.current?.setValue(formated.replace(/\n$/, ""));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setInput(code));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [code, dispatch]);
  const handleLangueageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    localStorage.getItem("language")! && localStorage.removeItem("language");
    localStorage.setItem("language", e.target.value);
  };
  return (
    <Container>
      <div className="text-white w-full  group overflow-hidden h-full dark:bg-primaryBgLight relative   flex flex-col  gap-3">
        <button
          className="button-primary  hide-element format-btn w-fit self-end  group-hover:show-element absolute right-0 top-10 z-10 "
          onClick={handleFormat}
        >
          Format
        </button>
        <div className="flex flex-col w-fit">
          <label
            htmlFor="languages"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an language
          </label>
          <select
            id="languages"
            value={language}
            onChange={handleLangueageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="javascript">Choose a language</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="graphql">Graphql</option>
            <option value="css">Css</option>
            <option value="html">Html</option>
          </select>
        </div>
        <div className="flex flex-row h-full ">
          <Resizeable
            direction="horizontal"
            children={
              <Editor
                className="dark:bg-primaryBgLight border-2 w-[calc(100%-10px)] border-primaryBgLight dark:border-none rounded-sm"
                theme={isDarkMode ? "vs-dark" : "light"}
                height={"100%"}
                language={language}
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
                loading={<GridLoader color="#60a2d8" margin={3} />}
              />
            }
          />

          <PreviwCode language={language} />
        </div>
      </div>
    </Container>
  );
};

export default CodeEditor;
