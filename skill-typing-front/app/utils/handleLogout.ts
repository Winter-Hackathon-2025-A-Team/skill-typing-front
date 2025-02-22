import { type AuthContextProps } from "react-oidc-context";

export default async function handleLogout(auth: AuthContextProps) {
  await auth.signoutRedirect({
    extraQueryParams: {
      client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
      logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
    },
  });
}
