import React from "react";
import Header from "./header";
import { Outlet } from "react-router";
import { withAuthenticationRequired } from "react-oidc-context";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default withAuthenticationRequired(Layout, {
  OnRedirecting: () => (
    <div className="flex h-screen w-full items-center justify-center">
      ログインページにリダイレクト中...
    </div>
  ),
});
