import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> 
}

export const Dialog: FC<Props> = ({ children, open, setOpen}) => {
  const closeDialog = () => {
    setOpen(false)
  };

  if(!open) return null

  return (
    <dialog
      onClick={closeDialog}
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {children}
    </dialog>
  );
};

