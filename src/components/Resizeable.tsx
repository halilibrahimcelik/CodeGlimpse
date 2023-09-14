/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResizableBox, ResizableBoxProps } from "react-resizable";

export interface ResizeableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactElement;
}

const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      width: window.innerWidth * 0.75,
      height: Infinity,
      className: "resize-horizontal",
      resizeHandles: ["e"],
      maxConstraints: [Infinity, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  } else {
    resizableProps = {
      width: Infinity,
      className: "resize-vertical",
      height: 400,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.7],
      minConstraints: [Infinity, 25],
    };
  }
  return (
    <ResizableBox
      children={children}
      className={resizableProps.className}
      resizeHandles={resizableProps.resizeHandles}
      height={resizableProps.height}
      width={resizableProps.width}
      maxConstraints={resizableProps.maxConstraints}
      minConstraints={resizableProps.minConstraints}
    />
  );
};

export default Resizeable;
