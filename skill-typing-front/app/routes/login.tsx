import React, { useCallback } from "react";
import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";
import Button from "../components/button";
import LinkButton from "../components/linkButton";
import handleLogout from "~/utils/handleLogout";
import isCustomProfile from "~/utils/isCustomProfile";

export default function Login() {
  const auth = useAuth();

  const renderLoading = useCallback(
    () => (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform">リダイレクト中...</p>
      </div>
    ),
    [],
  );

  const renderError = useCallback(
    () => (
      <div className="grid min-h-screen place-items-center">
        <div className="grid -translate-y-12 transform place-items-center gap-2">
          <p>エラーが発生しました</p>
          <p>エラー内容 : {auth.error?.message}</p>
          <Button onClick={() => auth.signinRedirect()}>ログイン</Button>
        </div>
      </div>
    ),
    [auth],
  );

  const renderUnauthenticated = useCallback(
    () => (
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
    ),
    [auth],
  );

  const renderAuthenticated = useCallback(() => {
    if (auth.user && isCustomProfile(auth.user.profile)) {
      return (
        <div className="grid min-h-screen place-items-center">
          <div className="grid -translate-y-12 transform place-items-center gap-2">
            <p>すでにログインしています</p>
            <LinkButton url="/">ホームに戻る</LinkButton>
            <Button onClick={() => handleLogout(auth)}>ログアウト</Button>
          </div>
        </div>
      );
    }
    return null;
  }, [auth]);

  const renderContent = useCallback(() => {
    if (auth.isLoading) {
      return renderLoading();
    }
    if (auth.error) {
      return renderError();
    }
    if (!auth.isAuthenticated) {
      return renderUnauthenticated();
    }
    return (
      <>
        {renderAuthenticated()}
        <Outlet />
      </>
    );
  }, [
    auth,
    renderLoading,
    renderError,
    renderUnauthenticated,
    renderAuthenticated,
  ]);

  return renderContent();
}
