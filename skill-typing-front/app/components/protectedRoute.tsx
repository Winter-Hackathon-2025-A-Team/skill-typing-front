import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      setShowError(true);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.isLoading, auth.user, navigate]);

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
