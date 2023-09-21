import { useSelector } from "react-redux";

import { getOrder, getData } from "../app/features/cellSlice";
import CellListItem from "./CellListItem";
import AlertComponent from "./Alert";
import { motion, LayoutGroup } from "framer-motion";

const CellList = () => {
  const order = useSelector(getOrder);
  const data = useSelector(getData);

  const cells = order.map((id) => {
    return data[id];
  });

  return (
    <LayoutGroup>
      <ul className="flex flex-col gap-10 py-10">
        {cells.map((cell) => (
          <motion.li
            layout={true}
            key={cell.id}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <CellListItem cell={cell} key={cell.id} />
          </motion.li>
        ))}
        <AlertComponent />
      </ul>
    </LayoutGroup>
  );
};

export default CellList;
