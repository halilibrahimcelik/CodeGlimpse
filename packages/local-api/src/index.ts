import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellRouter } from "./routes/cell";
export const serveLocalAPI = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:5173",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve("codebook/dist/index.html");
    //packagePath is the path to the index.html file in the codebook package in node_modules

    app.use(express.static(path.dirname(packagePath)));
  }

  //we wired up our cell router to our express app
  app.use(createCellRouter(filename, dir));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
