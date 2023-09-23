import { useSelector } from "react-redux";

import { getOrder, getData } from "../app/features/cellSlice";
import CellListItem from "./CellListItem";
import AlertComponent from "./Alert";
import { motion, LayoutGroup } from "framer-motion";
import AddCell from "./AddCell";

const CellList = () => {
  const order = useSelector(getOrder);
  const data = useSelector(getData);

  const cells = order.map((id) => {
    return data[id];
  });

  return (
    <LayoutGroup>
      <ul className="flex flex-col  py-10">
        <motion.li
          layout={true}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-10"
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <AddCell id={null} />
        </motion.li>
        {cells.map((cell) => (
          <motion.li
            layout={true}
            key={cell.id}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-10"
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <CellListItem key={cell.id} cell={cell} />
            <AddCell id={cell.id} />
          </motion.li>
        ))}
        <AlertComponent />
      </ul>
    </LayoutGroup>
  );
};

export default CellList;
