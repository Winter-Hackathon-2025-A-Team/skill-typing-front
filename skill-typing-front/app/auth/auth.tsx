// App.js
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
  // const location = useLocation();

  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  console.log(auth.user);

  if (auth.user?.profile && isCustomProfile(auth.user.profile)) {
    const username = auth.user.profile["cognito:username"];
    const email = auth.user.profile.email;

    return (
      <div>
        <pre> UserName: {username} </pre>
        <pre> Hello: {email} </pre>
        <pre> ID Token: {auth.user.id_token} </pre>
        <pre> Access Token: {auth.user.access_token} </pre>
        <pre> Refresh Token: {auth.user.refresh_token} </pre>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <p className="flex h-screen w-full items-center justify-center">
      ログイン・サインアップは
      <span
        onClick={() => auth.signinRedirect()}
        className="cursor-pointer text-blue-500 hover:underline"
      >
        こちら
      </span>
    </p>
  );
}

export default Auth;
