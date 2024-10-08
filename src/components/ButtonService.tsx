import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "2-xl";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function ButtonService({
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
        "flex justify-center h-10 items-center border border-cyan-300 bg-write rounded font-bold  text-cyan-600 text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
