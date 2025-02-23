import React from "react";
import LinkButton from "./linkButton";

export default function Error({ error }: { error: string }) {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="inline-grid -translate-y-12 transform place-items-center">
        <p className="mb-4 text-red-500">{error}</p>
        <LinkButton url="/">ホームに戻る</LinkButton>
      </div>
    </div>
  );
}
