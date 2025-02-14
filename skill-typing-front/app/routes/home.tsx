import React from "react";
import Button from "~/components/button";
import LinkButton from "~/components/linkButton";

export default function Home() {
  return (
    <div className="grid min-h-screen -translate-y-32 transform place-items-center">
      <div className="grid max-w-screen-xl place-items-center gap-4 px-4">
        <Button>モード選択</Button>
        <LinkButton url="/game">ゲーム開始</LinkButton>
        <p className="text-gray-900">最終スコア : ◯◯問</p>
      </div>
    </div>
  );
}
