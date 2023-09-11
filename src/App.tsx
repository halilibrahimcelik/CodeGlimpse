import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";

import * as esbuild from "esbuild-wasm";

export type EsbuildService = esbuild.Service;

function App() {
  const [input, setInput] = useState<string>("");
  //const [code, setCode] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const serviceRef = useRef<EsbuildService | null>(null);

  const startService = async () => {
    const response = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
    serviceRef.current = response;
  };

  useEffect(() => {
    startService();
  }, []);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
       window.addEventListener("message", (event) => {
        eval(event.data);
       },false)
      </script>
    </body>
    </html>
`;
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "1rem",
        margin: "0 auto",
      }}
    >
      <Form
        setInput={setInput}
        input={input}
        iframeRef={iframeRef}
        serviceRef={serviceRef}
      />

      <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={html} />
    </main>
  );
}

export default App;
