import { Slot } from "@radix-ui/react-slot";
import { InputHTMLAttributes, ReactNode } from "react";

export interface TextInputRootProps
  extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}
function TextInputRoot(props: TextInputRootProps) {
  return (
    <div className="flex items-center  w-72 gap-1 h-12 px-2 rounded border-solid border-2 border-cyan-900 text-cyan-900 text-xs placeholder:text-cyan-900 focus-whithin:ring-2 ring-cyan-700">
      {props.children}
    </div>
  );
}

TextInputRoot.displayName = "TextInput.Root";

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-cyan-900">{props.children}</Slot>;
}

TextInputIcon.displayName = "TextInput.Icon";

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="flex rounded mt-16 mb-16 px-1  text-cyan-900 text-xs outline-none  placeholder:text-cyan-900 cursor-pointer"
      {...props}
    />
  );
}

TextInputInput.displayName = "TextInput.Input";

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  ICon: TextInputIcon,
};
