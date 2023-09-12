import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";

import * as esbuild from "esbuild-wasm";
import CodeEditor from "./components/CodeEditor";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";

export type EsbuildService = esbuild.Service;
export const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
     window.addEventListener("message", (event) => {

      try {
        eval(event.data);
      } catch (err) {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;text-align:center;"><h4>Runtime Error</h4>' + err + '</div>';
     console.error(err);
      }

     },false)
    </script>
  </body>
  </html>
`;
function App() {
  const [input, setInput] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const serviceRef = useRef<EsbuildService | null>(null);
  const dispatch = useAppDispatch();

  const startService = async () => {
    const response = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
    serviceRef.current = response;
  };

  useEffect(() => {
    startService();
    dispatch(toggleDarkMode());
  }, []);

  return (
    <main className="dark:bg-primaryBg bg-white ">
      <DarkMode />
      <CodeEditor
        initialValue="const a=1"
        onChange={(value) => setInput(value)}
      />
      <Form
        setInput={setInput}
        input={input}
        iframeRef={iframeRef}
        serviceRef={serviceRef}
      />

      <iframe
        title="Code Preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </main>
  );
}

export default App;
