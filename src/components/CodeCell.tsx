// import Form from "./Form";
import { useEffect } from "react";
import { setCode, setError } from "../app/features/globalSlice";
import CodeEditor from "./CodeEditor";
import Container from "./Container";
import Resizeable from "./Resizeable";
import { useSelector } from "react-redux";
import bundle from "../bundler";
import { useAppDispatch } from "../app/store";
import { Cell, CellState, getContent } from "../app/features/cellSlice";
import { MyArgs, bundleCells } from "@/app/features/bundleSlice";

const CodeCell = (props: Cell) => {
  const input = useSelector((state) =>
    getContent(state as { cell: CellState }, props?.id as string)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);

      const results: MyArgs = {
        id: props?.id as string,
        input,
      };

      dispatch(bundleCells(results));
      dispatch(setCode(output.code));

      dispatch(setError(output.error));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input, dispatch, props?.id]);
  return (
    <Container>
      <Resizeable
        direction="vertical"
        children={<CodeEditor {...props} initialValue={input} />}
      />
    </Container>
  );
};

export default CodeCell;
