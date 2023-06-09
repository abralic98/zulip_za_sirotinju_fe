
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Options: FC<Props> = ({ children, open, setOpen }) => {
  const skipChild = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!open) return null;

  return (
    <dialog
      onClick={() => setOpen(false)}
      className='bg-gray-700'
      style={{
        display: "block",
        position: "absolute",
        right:'-70%',
        top:0,
        
      }}
    >
      <div onClick={skipChild}>{children}</div>
    </dialog>
  );
};
