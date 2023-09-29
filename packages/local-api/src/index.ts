import express from "express";

export const serveLocalAPI = (port: number, filename: string, dir: string) => {
  const app = express();

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
    console.log("saving/fetching cells from", filename);
    console.log("that file is in directory => ", dir);
  });
};
