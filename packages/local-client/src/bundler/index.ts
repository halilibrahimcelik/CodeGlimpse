import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;
const env = ["process", "env", "NODE_ENV"].join(".");
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
  const languageSelected = localStorage.getItem("language");
  try {
    const result = await service.build({
      entryPoints: languageSelected === "html" ? ["index.html"] : ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        [env]: '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: result.outputFiles[0].text,
      error: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        error: err.message,
      };
    } else {
      throw err;
    }
  }
};
export default bundle;
