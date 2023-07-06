import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Box } from "../primitives/box/box";
import { Heading } from "./Heading";

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
      className="bg-gray-700"
      style={{
        display: "flex",
        position: "absolute",
        right: "-60%",
        top: 0,
        flexDirection:'column',
      }}
    >
      <Box style={{ cursor: "pointer", alignSelf:'flex-end', marginBottom: '10px' }} color="red-600">
        <Heading type="h1">X</Heading>
      </Box>
      <div onClick={skipChild}>{children}</div>
    </dialog>
  );
};
