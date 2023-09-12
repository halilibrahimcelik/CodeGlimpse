import { useState } from "react";
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

import { useSelector } from "react-redux";
import { selectDarkMode } from "../app/features/globalSlice";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const isDarkMode = useSelector(selectDarkMode);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.getModel()?.updateOptions({
      tabSize: 1,
    });
    console.log(language);
    monaco.editor.setModelLanguage(editor.getModel()!, language);
  };
  const handleFormat = async () => {
    //unformated code
    const unformated = editorRef?.current?.getValue() as string;

    const currentLanguage = language;
    console.log(currentLanguage);
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

  return (
    <section className="text-white group overflow-hidden dark:bg-primaryBgLight relative   flex flex-col  gap-3">
      <button
        className="button-primary  hide-element format-btn w-fit self-end  group-hover:show-element absolute right-0 top-0 z-10 "
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
          onChange={(e) => setLanguage(e.target.value)}
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
      <Editor
        className="dark:bg-primaryBgLight border-2 border-primaryBgLight dark:border-none rounded-sm"
        theme={isDarkMode ? "vs-dark" : "light"}
        height={"500px"}
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
        loading={<GridLoader color="#36d7b7" margin={3} />}
      />
    </section>
  );
};

export default CodeEditor;
