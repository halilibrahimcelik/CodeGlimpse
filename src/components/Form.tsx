/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useSelector } from "react-redux";
import { getSelectedInput, setCode } from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";
import bundle from "../bundler";

const Form = () => {
  const dispatch = useAppDispatch();
  const input = useSelector(getSelectedInput);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const output = await bundle(input);

    dispatch(setCode(output));
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
