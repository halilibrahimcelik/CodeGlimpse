import { Cell } from "../app/features/cellSlice";

import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  console.log(cell);

  if (cell.type === "code") {
    return <CodeCell />;
  } else {
    return <TextEditor />;
  }
};

export default CellListItem;
