/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { EsbuildService } from "../App";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

type Props = {
  setInput: (input: any) => void;
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
  input: string;
  serviceRef: React.MutableRefObject<EsbuildService | null>;
};
const env = ["process", "env", "NODE_ENV"].join(".");
const Form = ({ setInput, serviceRef, input, iframeRef }: Props) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!serviceRef?.current) {
      return;
    }

    const result = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        [env]: '"production"',
        global: "window",
      },
    });
    // setCode(result.outputFiles[0].text);
    iframeRef.current?.contentWindow?.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        margin: "0 auto",
        gap: "1rem",
      }}
      onSubmit={onSubmit}
    >
      <textarea
        ref={textAreaRef}
        name=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        id=""
        cols={40}
        rows={10}
      ></textarea>
      <button type="submit" value={"Submit"}>
        Submit
      </button>
    </form>
  );
};

export default Form;
