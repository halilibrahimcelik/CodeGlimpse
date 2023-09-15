/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Form = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
