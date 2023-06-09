import React from "react"
import { type VariantProps } from "class-variance-authority"


import { boxVariants } from "./variants"
import { cn } from "@/lib/utils"

export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> & {
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span"
  }

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      gap,
      as,
      flexDirection,
      color,
      background,
      position,
      display,
      flexWrap,
      alignItems,
      justifyContent,
      width,
      height,
      zIndex,
      p,
      px,
      py,
      pb,
      pl,
      pr,
      pt,
      top,
      bottom,
      left,
      right,
      ...props
    },
    ref
  ) => {
    const Ele = as ? as : "div"
    return (
      <Ele
        className={cn(
          boxVariants({
            gap,
            flexDirection,
            color,
            background,
            p,
            px,
            py,
            pr,
            pl,
            pb,
            pt,
            position,
            display,
            flexWrap,
            alignItems,
            justifyContent,
            width,
            height,
            zIndex,
            top,
            bottom,
            left,
            right,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Box.displayName = "Box"

export { Box }
