import React from "react";
import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";

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

function Auth() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform">リダイレクト中...</p>
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="-translate-y-12 transform">
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
        <div className="border-b p-4">
          <span>UserName: {auth.user.profile["cognito:username"]}</span>
          <span className="ml-4">Email: {auth.user.profile.email}</span>
          <button
            onClick={() =>
              auth.signoutRedirect({
                extraQueryParams: {
                  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
                  logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
                },
              })
            }
            className="ml-4 text-red-500 hover:underline"
          >
            Sign out
          </button>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Auth;
