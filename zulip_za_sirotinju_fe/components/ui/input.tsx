import * as React from "react";

import { cn } from "@/lib/utils";
import { Stack } from "../primitives/stack";
import { Box } from "../primitives/box/box";
import { FieldError } from "react-hook-form";
import { Color } from "@/styles/vars/colors";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?:FieldError | undefined
  color?: Color
  background?: Color
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, color, ...props }, ref) => {
    return (
      <Stack gap={'xs'}>
        <label>{label}</label>
        <input 
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          color={color}
          style={{background:props.background}}
          {...props}
        />
        <Box color='red-500'>{error?.message}</Box>
      </Stack>
    );
  }
);
Input.displayName = "Input";

export { Input };