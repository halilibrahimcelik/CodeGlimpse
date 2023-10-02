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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth * 0.5);
  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (window.innerWidth * 0.5 < innerWidth) {
          setInnerWidth(window.innerWidth * 0.5);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [innerWidth]);

  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      width: innerWidth,
      height: Infinity,
      className: "resize-horizontal",
      resizeHandles: ["e"],
      maxConstraints: [width * 0.7, Infinity],
      minConstraints: [width * 0.2, Infinity],
      onResizeStop: (_event, data) => {
        setInnerWidth(data.size.width);
      },
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
  return <ResizableBox children={children} {...resizableProps} />;
};

export default Resizeable;
