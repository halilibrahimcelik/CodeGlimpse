/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { EsbuildService } from "../App";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";
import { useSelector } from "react-redux";
import { getSelectedInput, setCode } from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";

type Props = {
  serviceRef: React.MutableRefObject<EsbuildService | null>;
};
const env = ["process", "env", "NODE_ENV"].join(".");
const Form = ({ serviceRef }: Props) => {
  const dispatch = useAppDispatch();
  const input = useSelector(getSelectedInput);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
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
    dispatch(setCode(result.outputFiles[0].text));
  };

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
      <button type="submit" value={"Submit"}>
        Submit
      </button>
    </form>
  );
};

export default Form;
