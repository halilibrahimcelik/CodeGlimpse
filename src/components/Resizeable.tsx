import { ResizableBox } from "react-resizable";

interface ResizeableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizeable: React.FC<ResizeableProps> = ({ children }) => {
  return (
    <ResizableBox resizeHandles={["s"]} height={300} width={300}>
      {" "}
      {children}
    </ResizableBox>
  );
};

export default Resizeable;
