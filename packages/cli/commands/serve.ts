import path from "path";
import { Command } from "commander";
import { serveLocalAPI } from "local-api";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "codeBook.js", options: { port: string }) => {
    const directory = path.join(process.cwd(), path.dirname(filename));
    console.log(path.basename(filename), "hello");
    serveLocalAPI(parseInt(options.port), path.basename(filename), directory);
  });
