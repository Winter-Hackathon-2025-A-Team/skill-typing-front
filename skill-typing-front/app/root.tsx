import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import React from "react";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { AuthProvider } from "react-oidc-context";
import LinkButton from "./components/linkButton";
import Loading from "./components/loading";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function meta() {
  return [
    { title: "Skill Typing" },
    {
      property: "og:title",
      content: "Skill Typing",
    },
    {
      name: "description",
      content: "Skill TypingはITの知識に特化したタイピングアプリです",
    },
  ];
}

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
  scope: import.meta.env.VITE_COGNITO_SCOPE,
  logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallBack() {
  return <Loading />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "おっと！";
  let details = "予期せぬエラーが発生しました。";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "エラー";
    details =
      error.status === 404
        ? "要求されたページが見つかりませんでした。"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="inline-grid -translate-y-12 transform place-items-center gap-2">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre>
            <code>{stack}</code>
          </pre>
        )}
        <LinkButton url="/">ホームに戻る</LinkButton>
      </div>
    </main>
  );
}
