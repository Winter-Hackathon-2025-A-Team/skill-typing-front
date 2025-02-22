import React from "react";
import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";
import Button from "../components/button";
import LinkButton from "../components/linkButton";

function isCustomProfile(
  profile: unknown,
): profile is { "cognito:username": string; email: string } {
  return (
    typeof profile === "object" &&
    profile !== null &&
    "cognito:username" in profile &&
    typeof (profile as Record<string, unknown>)["cognito:username"] ===
      "string" &&
    typeof (profile as Record<string, unknown>).email === "string"
  );
}

export default function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform">リダイレクト中...</p>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="grid -translate-y-12 transform place-items-center gap-2">
          <p>エラーが発生しました</p>
          <p>エラー内容 : {auth.error.message}</p>
          <Button onClick={() => auth.signinRedirect()}>ログイン</Button>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform place-items-center">
          ログイン・サインアップは
          <span
            onClick={() => auth.signinRedirect()}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            こちら
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      {auth.user && isCustomProfile(auth.user.profile) && (
        <div className="grid min-h-screen place-items-center">
          <div className="grid -translate-y-12 transform place-items-center gap-2">
            <p>すでにログインしています</p>
            <LinkButton url="/">ホームに戻る</LinkButton>
            <Button
              onClick={() =>
                auth.signoutRedirect({
                  extraQueryParams: {
                    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
                    logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
                  },
                })
              }
            >
              ログアウト
            </Button>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}
