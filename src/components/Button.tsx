import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "2-xl";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  category?: "PRIMARY" | "SECONDARY" | "DANGER";
}

export function Button({
  size = "md",
  children,
  asChild,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={clsx(
        " flex py-3  mt-6 w-72 justify-center items-center bg-cyan-700 rounded font-bold  text-write text-sm transition-colors hover:bg-cyan-600 focus:ring-2 ring-white cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
