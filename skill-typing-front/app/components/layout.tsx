import React from "react";
import Header from "./header/header";
import { Outlet } from "react-router";
import ProtectedRoute from "./auth/protectedRoute";
import Credit from "./credit";

export default function Layout() {
  return (
    <ProtectedRoute>
      <div className="rows-[auto_1fr_auto] relative grid min-h-screen">
        <Header />
        <main className="grid place-items-center pt-16 pb-16">
          <Outlet />
        </main>
        <footer className="fixed bottom-0 left-0 w-full py-4 text-center">
          <Credit />
        </footer>
      </div>
    </ProtectedRoute>
  );
}
