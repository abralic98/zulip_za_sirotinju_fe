import { Color } from "@/styles/vars/colors";
import React, { FC, ReactNode } from "react";

interface Props {
  type: "h1" | "h2" | "h3" | "h4";
  color?: Color;
  children: ReactNode;
}
export const Heading: FC<Props> = ({ type, color, children }) => {
  const heading = () => {
    switch (type) {
      case "h1":
        return (
          <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{children}</h1>
        );
      case "h2":
        return (
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>{children}</h2>
        );
      case "h3":
        return <h3 style={{ fontSize: "14px" }}>{children}</h3>;
      case "h4":
        return <h4 style={{ fontSize: "12px" }}>{children}</h4>;

      default:
        break;
    }
  };
  return <>{heading()}</>;
};
