import React from "react";
import { useNavigate } from "react-router";

const app = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mt-60 flex flex-col items-center gap-4">
      <button
        onClick={() => handleNavigate("/create")}
        className="boder relative inline-block rounded border-gray-400 bg-white px-10 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
      >
        新規問題作成
      </button>
      <button
        onClick={() => handleNavigate("/edit")}
        className="boder relative inline-block rounded border-gray-400 bg-white px-14 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
      >
        問題編集
      </button>
    </div>
  );
};

export default app;
