import { Color } from "@/styles/vars/colors";
import { alignItems, justifyContent } from "@/styles/vars/display";
import { width } from "@/styles/vars/width";
import React, { FC } from "react";
import { Box } from "../primitives/box/box";

interface Props {
  text: string;
  width?: string;
  height?: string;
  color?: Color;
  background?: Color;
  borderRadius?: string
}
export const TextBox: FC<Props> = ({
  text,
  width,
  height,
  background,
  color,
  borderRadius
}) => {
  return (
    <Box
      className={`text-${color} bg-${background}`}
      style={{
        width: width,
        height: height,
        borderRadius:borderRadius,
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        fontWeight:'bold'
      }}
    >
      {text}
    </Box>
  );
};
