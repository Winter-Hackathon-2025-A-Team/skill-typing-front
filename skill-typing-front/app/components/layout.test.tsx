import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import Layout from "./layout";
import { setMockAuthState } from "../../setupTests";

function DummyPage() {
  return <div>Outlet Dummy Content</div>;
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <DummyPage /> }],
  },
];

describe("Layout コンポーネント", () => {
  test("認証済みの場合、Header と Outlet の子コンテンツが正しくレンダリングされる", async () => {
    setMockAuthState({
      isLoading: false,
      user: {
        access_token: "dummy_access_token",
        token_type: "Bearer",
        profile: {
          aud: "dummy_audience",
          exp: Math.floor(Date.now() / 1000) + 3600,
          iat: Math.floor(Date.now() / 1000),
          iss: "dummy_issuer",
          sub: "dummy_sub",
          name: "Test User",
        },
        session_state: null,
        state: "",
        expires_in: 3600,
        expired: false,
        scopes: ["dummy_scope"],
        toStorageString: () => "dummy_storage_string",
      },
    });
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Skill Typing")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Outlet Dummy Content")).toBeInTheDocument();
    });
  });

  test("認証失敗の場合、エラーメッセージが表示される", () => {
    setMockAuthState({
      isLoading: false,
      user: null,
    });
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByText("ユーザー情報が取得できませんでした。"),
    ).toBeInTheDocument();
  });
});
