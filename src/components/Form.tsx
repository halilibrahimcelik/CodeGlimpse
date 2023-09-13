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
    <form className="flex justify-center items-center mt-4" onSubmit={onSubmit}>
      <button type="submit" className="button-primary w-fit" value={"Submit"}>
        Submit
      </button>
    </form>
  );
};

export default Form;
