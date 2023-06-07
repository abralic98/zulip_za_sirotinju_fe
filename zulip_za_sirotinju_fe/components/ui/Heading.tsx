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
          <h1 className={`text-${color}`} style={{ fontSize: "20px", fontWeight: "bold" }}>{children}</h1>
        );
      case "h2":
        return (
          <h2 className={`text-${color}`}style={{ fontSize: "16px", fontWeight: "bold" }}>{children}</h2>
        );
      case "h3":
        return <h3 className={`text-${color}`}style={{ fontSize: "14px" }}>{children}</h3>;
      case "h4":
        return <h4 className={`text-${color}`}style={{ fontSize: "12px" }}>{children}</h4>;

      default:
        break;
    }
  };
  return <>{heading()}</>;
};
