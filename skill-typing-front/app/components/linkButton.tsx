import React from "react";
import { Link } from "react-router";

export default function LinkButton({
  children,
  url,
  ...props
}: {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <Link
      to={url}
      className="w-40 rounded-full bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-500"
      {...props}
    >
      {children}
    </Link>
  );
}
