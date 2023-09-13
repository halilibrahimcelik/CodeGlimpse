import { useEffect, useRef } from "react";
import Form from "./components/Form";

import * as esbuild from "esbuild-wasm";
import CodeEditor from "./components/CodeEditor";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";
import PreviwCode from "./components/PreviwCode";

export type EsbuildService = esbuild.Service;

function App() {
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
      <CodeEditor initialValue="const a=1" />
      <Form serviceRef={serviceRef} />

      <PreviwCode />
    </main>
  );
}

export default App;
