import React from "react";
import Header from "./header/header";
import { Outlet } from "react-router";
import ProtectedRoute from "./protectedRoute";

export default function Layout() {
  return (
    <ProtectedRoute>
      <Header />
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
