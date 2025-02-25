import React from "react";
import type { ButtonProps } from "~/types/types";

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-40 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
