import React from "react";
import Button from "./button";
import type { CategoryFromProps } from "~/types/types";

export default function CategoryForm({
  handleSubmit,
  category,
  handleChange,
}: CategoryFromProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 items-center justify-items-center gap-4"
    >
      <label className="grid grid-cols-1 gap-2 text-center">
        カテゴリー選択
        <select
          value={category}
          onChange={handleChange}
          className="rounded border border-blue-600 bg-white p-2 text-center"
        >
          <option value="基本情報技術者">基本情報技術者</option>
          <option value="AWSアソシエイト">AWSアソシエイト</option>
        </select>
      </label>
      <Button type="submit">ゲーム開始</Button>
    </form>
  );
}
