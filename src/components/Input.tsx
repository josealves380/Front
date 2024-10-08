import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      className="w-[100%] h-12 border-2 font-light border-cyan-900 px-2 rounded outline-none"
      type="text"
    />
  );
}
