// import Form from "./Form";
import { useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Container from "./Container";
import Resizeable from "./Resizeable";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../app/store";
import {
  Cell,
  CellState,
  getContent,
  useCumulativeCode,
} from "../app/features/cellSlice";
import { MyArgs, bundleCells } from "@/app/features/bundleSlice";

const CodeCell = (props: Cell) => {
  const dispatch = useAppDispatch();
  const cumulativeContent = useSelector(useCumulativeCode(props?.id as string));
  const content = useSelector((state: { cell: CellState }) =>
    getContent(state, props?.id as string)
  );
  useEffect(() => {
    const timer = setTimeout(async () => {
      const results: MyArgs = {
        id: props?.id as string,
        input: cumulativeContent.join("\n"),
      };
      dispatch(bundleCells(results));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, props?.id, cumulativeContent]);

  return (
    <Container>
      <Resizeable
        direction="vertical"
        children={<CodeEditor {...props} initialValue={content} />}
      />
    </Container>
  );
};

export default CodeCell;
