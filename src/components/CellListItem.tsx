import { Cell } from "../app/features/cellSlice";

import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell />;
  } else {
    child = <TextEditor />;
  }
  return <>{child}</>;
};

export default CellListItem;
