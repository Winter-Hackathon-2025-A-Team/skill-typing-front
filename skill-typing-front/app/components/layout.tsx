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
    <div className="grid min-h-screen place-items-center">
      <p className="-translate-y-12 transform">リダイレクト中...</p>
    </div>
  ),
});
