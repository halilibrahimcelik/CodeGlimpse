// import Form from "./Form";
import { useEffect } from "react";
import { getSelectedInput, setCode } from "../app/features/globalSlice";
import CodeEditor from "./CodeEditor";
import Container from "./Container";
import Resizeable from "./Resizeable";
import { useSelector } from "react-redux";
import bundle from "../bundler";
import { useAppDispatch } from "../app/store";

const CodeCell = () => {
  const input = useSelector(getSelectedInput);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);

      dispatch(setCode(output));
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [input, dispatch]);
  return (
    <Container>
      <Resizeable
        direction="vertical"
        children={<CodeEditor initialValue="const a=1" />}
      />
    </Container>
  );
};

export default CodeCell;
