import Image from "next/image";
import React, { FC } from "react";

interface Props {
  src: string;
  width: number;
  height: number;
}
export const ImageBox: FC<Props> = ({ src, width = 100, height = 100 }) => {
  return <Image alt="user_avatar" width={width} height={height} src={src} />;
};
