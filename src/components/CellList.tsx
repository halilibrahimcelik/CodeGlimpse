import React from "react";
import { useSelector } from "react-redux";
import { getOrder, getData } from "../app/features/cellSlice";
import CellListItem from "./CellListItem";

const CellList = () => {
  const order = useSelector(getOrder);
  const data = useSelector(getData);

  const cells = order.map((id) => {
    return data[id];
  });
  const renderedCells = cells.map((cell) => {
    return <CellListItem key={cell.id} cell={cell} />;
  });
  return renderedCells;
};

export default CellList;
