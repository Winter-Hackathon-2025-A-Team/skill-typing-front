import React from "react";
import { useNavigate } from "react-router";

const app = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => handleNavigate("/create")}
        className="boder relative inline-block rounded-full border-gray-400 bg-blue-600 px-10 py-2 font-semibold text-white hover:bg-blue-500 active:bottom-[-1px]"
      >
        新規問題作成
      </button>
      <button
        onClick={() => handleNavigate("/edit")}
        className="boder relative inline-block rounded-full border-gray-400 bg-blue-600 px-14 py-2 font-semibold text-white hover:bg-blue-500 active:bottom-[-1px]"
      >
        問題編集
      </button>
    </div>
  );
};

export default app;
