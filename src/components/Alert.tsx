import { AiOutlineWarning, AiOutlineClose } from "react-icons/ai";

import { Alert, AlertDescription } from "@/components/UI/ui/alert";
import React from "react";
import { useAppDispatch } from "@/app/store";
import {
  clearAlertMessage,
  getAlertMessage,
  isActiveMessage,
} from "@/app/features/cellSlice";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

type Props = {
  icon?: React.ReactElement;
};
const AlertComponent = ({ icon = <AiOutlineWarning /> }: Props) => {
  const nodeRef = React.useRef(null);

  const dispatch = useAppDispatch();
  const alertMessage = useSelector(getAlertMessage);
  const isActive = useSelector(isActiveMessage);

  console.log(alertMessage);
  const handleRemove = () => {
    dispatch(clearAlertMessage());
  };
  console.log(isActive);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={isActive}
        timeout={300}
        unmountOnExit
        classNames={"alert-component"}
      >
        <Alert
          ref={nodeRef}
          className="max-w-md fixed flex items-center justify-between gap-6  before:content:[''] before:absolute before:h-full before:w-[2px]  before:left-14 before:bg-gray-300"
        >
          <span className="text-3xl">{icon}</span>

          <AlertDescription className="text-base">
            {alertMessage?.message}
          </AlertDescription>
          <span className="text-3xl cursor-pointer" onClick={handleRemove}>
            <AiOutlineClose />
          </span>
        </Alert>
      </CSSTransition>
    </>
  );
};
export default AlertComponent;
