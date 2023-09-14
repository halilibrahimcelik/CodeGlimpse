import React from "react";

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return <section className="container mx-auto h-full">{children}</section>;
}

export default Container;
