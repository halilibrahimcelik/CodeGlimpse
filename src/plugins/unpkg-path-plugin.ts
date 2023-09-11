/* eslint-disable @typescript-eslint/no-explicit-any */

import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });
      //handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });
      //handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // if (args.path === "index.js") {
        //   return { path: args.path, namespace: "a" };
        // }
        // if (args.path.includes("./") || args.path.includes("../")) {
        //   return {
        //     namespace: "a",
        //     path: new URL(
        //       args.path,
        //       "https://unpkg.com" + args.resolveDir + "/"
        //     ).href,
        //   };
        // } we can use the above code or the below code to do the same thing as the above code we use regex in the filter object

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
