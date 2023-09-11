import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";

import * as esbuild from "esbuild-wasm";

export type EsbuildService = esbuild.Service;

function App() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");
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
        setCode={setCode}
        serviceRef={serviceRef}
      />
      <pre>{code} </pre>
      <iframe sandbox="" srcDoc={html}></iframe>
    </main>
  );
}
const html = `
<h1>Test</h1>
`;
export default App;
