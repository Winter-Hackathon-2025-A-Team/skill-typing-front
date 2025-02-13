import React from "react";
import Auth from "../auth/auth";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
  scope: import.meta.env.VITE_COGNITO_SCOPE,
};

export default function Home() {
  return (
    <>
      <AuthProvider {...cognitoAuthConfig}>
        <Auth />
      </AuthProvider>
    </>
  );
}
