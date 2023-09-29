import { Cell } from "../app/features/cellSlice";

import CodeCell from "./CodeCell";
import TextEditor from "@/components/TextEditor";

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell key={cell.id} {...cell} />;
  } else {
    child = <TextEditor key={cell.id} {...cell} />;
  }
  return <>{child}</>;
};

export default CellListItem;
