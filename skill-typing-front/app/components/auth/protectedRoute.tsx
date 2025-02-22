import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import type { ProtectedRouteProps } from "~/types/types";

export default function ProtectedRoute({
  children,
  redirectPath = "/login",
  redirectDelay = 2000,
}: ProtectedRouteProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      setShowError(true);
      const timer = setTimeout(() => {
        navigate(redirectPath);
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [auth.isLoading, auth.user, navigate, redirectPath, redirectDelay]);

  if (auth.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform">読み込み中...</p>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="grid min-h-screen place-items-center text-red-500">
        <p className="-translate-y-12 transform">
          ユーザー情報が取得できませんでした。
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
