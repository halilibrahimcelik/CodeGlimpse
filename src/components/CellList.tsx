import { useSelector } from "react-redux";
import { getOrder, getData } from "../app/features/cellSlice";
import CellListItem from "./CellListItem";
import AlertComponent from "./Alert";
const CellList = () => {
  const order = useSelector(getOrder);
  const data = useSelector(getData);

  const cells = order.map((id) => {
    return data[id];
  });

  return (
    <ul className="flex flex-col gap-10 py-10">
      {cells.map((cell) => (
        <li key={cell.id}>
          <CellListItem key={cell.id} cell={cell} />
        </li>
      ))}

      <AlertComponent />
    </ul>
  );
};

export default CellList;
