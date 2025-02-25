import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ReactNode } from "react";

export interface TextProps {
  size?: "sm" | "md" | "lg" | "2-xl";
  children?: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Text({ size = "md", children, asChild, className }: TextProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={clsx(
        "text-cyan-900 font-sans",
        {
          "text-xs": size == "sm",
          "text-sm": size == "md",
          "text-md": size == "lg",
          "text-lg": size == "2-xl",
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
