import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/game/questions", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    if (category === "基本情報技術者") {
      return HttpResponse.json({
        questions: [
          {
            id: 1,
            title: "アルゴリズムの時間計算量",
            content:
              "あるアルゴリズムが入力サイズnに対して実行時間がn^2で増加する場合、このアルゴリズムの時間計算量として正しいものはどれか？",
            category: {
              id: 1,
              title: "基本情報技術者",
            },
            answer_id: 3,
            choices: [
              {
                id: 1,
                content: "O(n)",
                description: "線形時間計算量ではありません。",
              },
              {
                id: 2,
                content: "O(n log n)",
                description: "線形対数時間計算量ではありません。",
              },
              {
                id: 3,
                content: "O(n^2)",
                description: "正解。二次時間計算量を示します。",
              },
              {
                id: 4,
                content: "O(2^n)",
                description: "指数時間計算量ではありません。",
              },
            ],
          },
          {
            id: 2,
            title: "メモリ管理の基本",
            content:
              "コンピュータのメモリ管理において、仮想記憶が提供する主な利点はどれか？",
            category: {
              id: 1,
              title: "基本情報技術者",
            },
            answer_id: 2,
            choices: [
              {
                id: 1,
                content: "プログラムの実行速度向上",
                description:
                  "実行速度向上ではなく、むしろオーバーヘッドが生じることもあります。",
              },
              {
                id: 2,
                content: "メモリ容量の拡張",
                description:
                  "正解。仮想記憶により物理メモリの制約を超えたメモリ空間が提供されます。",
              },
              {
                id: 3,
                content: "データの永続化",
                description: "データの永続化はストレージの役割です。",
              },
              {
                id: 4,
                content: "ハードウェアの故障予防",
                description: "ハードウェアの故障予防には直接関係しません。",
              },
            ],
          },
          {
            id: 3,
            title: "ネットワークプロトコルの基礎",
            content:
              "OSI参照モデルにおいて、データの物理的な伝送を担う層はどれか？",
            category: {
              id: 1,
              title: "基本情報技術者",
            },
            answer_id: 4,
            choices: [
              {
                id: 1,
                content: "アプリケーション層",
                description:
                  "アプリケーション層はユーザーと直接対話する層です。",
              },
              {
                id: 2,
                content: "トランスポート層",
                description: "トランスポート層は通信の信頼性を担います。",
              },
              {
                id: 3,
                content: "セッション層",
                description: "セッション層は通信のセッション管理を行います。",
              },
              {
                id: 4,
                content: "物理層",
                description: "正解。物理層はデータの伝送を物理的に行います。",
              },
            ],
          },
        ],
      });
    } else if (category === "AWSアソシエイト") {
      return HttpResponse.json({
        questions: [
          {
            id: 1,
            title: "EC2の基本",
            content: "Amazon EC2はどのようなサービスを提供していますか？",
            category: {
              id: 2,
              title: "AWSアソシエイト",
            },
            answer_id: 2,
            choices: [
              {
                id: 1,
                content: "サーバーレスコンピューティング",
                description: "サーバーレスはLambdaなどが該当します。",
              },
              {
                id: 2,
                content: "仮想サーバーの提供",
                description: "正解。EC2は仮想サーバーを提供します。",
              },
              {
                id: 3,
                content: "データベース管理",
                description: "RDSがデータベース管理サービスです。",
              },
              {
                id: 4,
                content: "コンテンツ配信ネットワーク",
                description: "CDNはCloudFrontが該当します。",
              },
            ],
          },
          {
            id: 2,
            title: "S3の特徴",
            content: "Amazon S3に関して、正しい特徴はどれか？",
            category: {
              id: 2,
              title: "AWSアソシエイト",
            },
            answer_id: 1,
            choices: [
              {
                id: 1,
                content:
                  "高い可用性とスケーラビリティを持つオブジェクトストレージサービス",
                description:
                  "正解。S3は高い可用性とスケーラビリティを備えたオブジェクトストレージです。",
              },
              {
                id: 2,
                content: "リレーショナルデータベースサービス",
                description: "リレーショナルデータベースはRDSが該当します。",
              },
              {
                id: 3,
                content: "コンピューティングリソースの自動スケーリング",
                description: "自動スケーリングはEC2 Auto Scalingが該当します。",
              },
              {
                id: 4,
                content: "コンテナ管理サービス",
                description: "コンテナ管理はECSやEKSが該当します。",
              },
            ],
          },
          {
            id: 3,
            title: "VPCの利用目的",
            content: "Amazon VPCの主な利用目的として正しいものはどれですか？",
            category: {
              id: 2,
              title: "AWSアソシエイト",
            },
            answer_id: 2,
            choices: [
              {
                id: 1,
                content: "AWSリソースをインターネットに直接公開するため",
                description:
                  "直接公開するのは逆にセキュリティリスクを高めます。",
              },
              {
                id: 2,
                content: "仮想ネットワーク環境内でのリソースの分離と制御",
                description:
                  "正解。VPCは仮想ネットワーク内でのリソースの分離と制御を提供します。",
              },
              {
                id: 3,
                content: "大規模なデータ解析の実行",
                description: "大規模データ解析はAmazon EMRなどが該当します。",
              },
              {
                id: 4,
                content: "サーバーレスアプリケーションの管理",
                description: "サーバーレスはLambdaなどで管理されます。",
              },
            ],
          },
        ],
      });
    } else {
      return new HttpResponse(JSON.stringify({ message: "Invalid category" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }),
  http.get("/api/scores/latest", () => {
    return HttpResponse.json({ score: "40" });
  }),
  http.post("/api/scores", () => {
    return HttpResponse.json({
      message: "registered successfully",
    });
  }),
];
