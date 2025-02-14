import { http, HttpResponse, passthrough } from "msw";

export const handlers = [
  http.get(
    "https://ap-northeast-1afthjej7w.auth.ap-northeast-1.amazoncognito.com/.well-known/openid-configuration",
    () => {
      return passthrough();
    },
  ),
  http.get("/api/game/questions", () => {
    return HttpResponse.json({
      questions: [
        {
          id: 1,
          title: "プログラミング言語の特徴",
          content: "次のうち、Pythonの特徴として正しいものを選択してください。",
          category: {
            id: 1,
            title: "プログラミング",
          },
          answer_id: 1,
          choices: [
            {
              id: 1,
              content: "インタプリタ型言語であり、動的型付けを採用している",
              description:
                "Pythonはインタプリタ型であり、実行時に型が決定されるため、動的型付けである。",
            },
            {
              id: 2,
              content: "コンパイル型言語であり、静的型付けを採用している",
              description:
                "Pythonはインタプリタ型のため、この記述は正しくありません。",
            },
            {
              id: 3,
              content: "マシンコードに直接変換されるため、非常に高速である",
              description:
                "Pythonはインタプリタ型であるため、直接マシンコードに変換されません。",
            },
            {
              id: 4,
              content: "主にウェブ開発のために設計された言語である",
              description:
                "Pythonは多目的に使用され、ウェブ開発に限定されないため、この記述は不十分です。",
            },
          ],
        },
        {
          id: 2,
          title: "OSI参照モデルの基礎",
          content:
            "OSI参照モデルはネットワーク通信の標準を示す階層モデルです。第3層であるネットワーク層の主な役割は何でしょうか？",
          category: {
            id: 2,
            title: "ネットワーク",
          },
          answer_id: 2,
          choices: [
            {
              id: 1,
              content: "物理的な信号の伝送",
              description: "物理層の役割です。",
            },
            {
              id: 2,
              content: "データのルーティングと転送",
              description:
                "ネットワーク層は、パケットのルーティングと転送を担当します。",
            },
            {
              id: 3,
              content: "データの暗号化と復号化",
              description:
                "これはトランスポート層やアプリケーション層で扱われる場合が多いです。",
            },
            {
              id: 4,
              content: "ユーザー認証の管理",
              description:
                "これはセキュリティやアプリケーション層の機能に関連します。",
            },
          ],
        },
        {
          id: 3,
          title: "基本的なセキュリティ対策",
          content:
            "以下の中で、システムの不正アクセス防止に最も効果的な初級レベルの対策はどれですか？",
          category: {
            id: 3,
            title: "セキュリティ",
          },
          answer_id: 1,
          choices: [
            {
              id: 1,
              content: "定期的なパスワードの変更",
              description:
                "定期的なパスワードの変更は、不正アクセス防止の基本的な対策です。",
            },
            {
              id: 2,
              content: "ファイアウォールの設定",
              description:
                "ファイアウォールは重要ですが、初級レベルではまずパスワード管理が推奨されます。",
            },
            {
              id: 3,
              content: "全てのソフトウェアの自動更新設定",
              description:
                "ソフトウェアの更新はセキュリティ向上に寄与しますが、初級対策としては他の対策が優先されます。",
            },
            {
              id: 4,
              content: "多要素認証の導入",
              description:
                "多要素認証は強力な対策ですが、初級レベルでは設定が難しい場合もあります。",
            },
          ],
        },
      ],
    });
  }),
];
