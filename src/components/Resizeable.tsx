import { ResizableBox } from "react-resizable";
import CodeEditor from "./CodeEditor";

interface ResizeableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactElement;
}

const Resizeable: React.FC<ResizeableProps> = () => {
  return (
    <ResizableBox
      children={<CodeEditor initialValue="const a=1" />}
      className=""
      resizeHandles={["s"]}
      height={400}
      width={Infinity}
      maxConstraints={[Infinity, window.innerHeight * 0.7]}
      minConstraints={[Infinity, 100]}
    />
  );
};

export default Resizeable;
