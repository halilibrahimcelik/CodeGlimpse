import { AiOutlineWarning, AiOutlineClose } from "react-icons/ai";

import { Alert, AlertDescription } from "@/components/UI/ui/alert";
import React, { useEffect } from "react";
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

  const handleRemove = () => {
    dispatch(clearAlertMessage());
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        dispatch(clearAlertMessage());
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isActive]);
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
          className="max-w-md fixed flex items-center justify-between gap-6 z-50  before:content:[''] before:absolute before:h-full before:w-[2px]  before:left-14 before:bg-gray-300"
        >
          <span className="text-3xl">{icon}</span>

          <AlertDescription className="text-base">
            {alertMessage?.message}
          </AlertDescription>
          <span
            className="text-3xl cursor-pointer  transition-opacity hover:opacity-60"
            onClick={handleRemove}
          >
            <AiOutlineClose />
          </span>
        </Alert>
      </CSSTransition>
    </>
  );
};
export default AlertComponent;
