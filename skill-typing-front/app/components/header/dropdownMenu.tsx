import React from "react";
import { Link } from "react-router";

export default function DropdownMenu({
  handleLogout,
  url = "/management",
}: {
  handleLogout: () => Promise<void>;
  url?: string;
}) {
  return (
    <div className="absolute right-0 mt-4 w-32 rounded border border-blue-600 bg-white shadow-lg">
      <Link
        to={url}
        className="block w-full px-4 py-2 text-center text-gray-900 hover:text-gray-400"
      >
        問題管理
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-center text-gray-900 hover:text-gray-400"
      >
        ログアウト
      </button>
    </div>
  );
}
