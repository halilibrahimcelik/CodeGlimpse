import { AiOutlineWarning } from "react-icons/ai";

import { Alert, AlertDescription, AlertTitle } from "@/components/UI/ui/alert";
import React from "react";

type Props = {
  content: string;
  icon: React.ReactElement;
};
const AlertDiv = ({ icon = <AiOutlineWarning />, content }: Props) => {
  return (
    <Alert>
      <span>{icon}</span>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{content}</AlertDescription>
    </Alert>
  );
};
export default AlertDiv;
