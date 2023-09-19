import { Cell } from "../app/features/cellSlice";

import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell {...cell} />;
  } else {
    child = <TextEditor {...cell} />;
  }
  return <>{child}</>;
};

export default CellListItem;
