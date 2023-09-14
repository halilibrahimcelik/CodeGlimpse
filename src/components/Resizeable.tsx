/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
export interface ResizeableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactElement;
}

const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      width: width * 0.5,
      height: Infinity,
      className: "resize-horizontal",
      resizeHandles: ["e"],
      maxConstraints: [width * 0.5, Infinity],
      minConstraints: [width * 0.2, Infinity],
    };
  } else {
    resizableProps = {
      width: Infinity,
      className: "resize-vertical",
      height: 400,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, height * 0.9],
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
