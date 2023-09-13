import React from "react";
import CodeEditor from "./CodeEditor";
import PreviwCode from "./PreviwCode";
import Form from "./Form";
import Resizeable from "./Resizeable";

const CodeCell = () => {
  return (
    <section>
      <Resizeable direction="vertical">
        <CodeEditor initialValue="const a=1" />
        <Form />
        <PreviwCode />
      </Resizeable>
    </section>
  );
};

export default CodeCell;
