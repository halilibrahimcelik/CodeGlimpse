// import Form from "./Form";
import { useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Container from "./Container";
import Resizeable from "./Resizeable";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../app/store";
import { Cell, CellState, getContent } from "../app/features/cellSlice";
import { MyArgs, bundleCells } from "@/app/features/bundleSlice";
import { createSelector } from "@reduxjs/toolkit";

const CodeCell = (props: Cell) => {
  const input = useSelector((state) =>
    getContent(state as { cell: CellState }, props?.id as string)
  );
  const dispatch = useAppDispatch();
  const getCells = (state: RootState) => state.cell;

  const getCumulativeContent = createSelector([getCells], (cell) => {
    const orderedCells = cell.order.map((id) => cell.data[id]);
    const cumulativeContent = [
      `
      function show(input){
        const root = document.querySelector("#root");
        if(typeof input === 'object'){
          if(input.$$typeof && input.props){
            //this is for react elements
           ReactDom.render(input,root)
              
            
          }else{
            root.innerHTML = JSON.stringify(input);
          }
        }
        else{
          root.innerHTML = input;
        }

      }
      `,
    ];
    for (const c of orderedCells) {
      if (c.type === "code") {
        cumulativeContent.push(c.content);
      }
      if (c.id === props?.id) {
        break;
      }
    }
    return cumulativeContent;
  });
  const cumulativeContent = useSelector(getCumulativeContent);
  console.log(cumulativeContent);
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
        children={<CodeEditor {...props} initialValue={input} />}
      />
    </Container>
  );
};

export default CodeCell;
