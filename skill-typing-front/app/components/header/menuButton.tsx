import React from "react";

export default function MenuButton({ ...props }) {
  return (
    <button type="button" className="grid grid-rows-3 gap-2 p-2" {...props}>
      <div className="h-0.5 w-8 bg-gray-900" />
      <div className="h-0.5 w-8 bg-gray-900" />
      <div className="h-0.5 w-8 bg-gray-900" />
    </button>
  );
}
