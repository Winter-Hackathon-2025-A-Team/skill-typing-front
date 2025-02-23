import React from "react";
import { render, screen, act } from "@testing-library/react";
import ProtectedRoute from "./protectedRoute";
import { useNavigate } from "react-router";
import { setMockAuthState } from "../../../setupTests";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("ProtectedRoute コンポーネントのテスト", () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    mockNavigate.mockReset();
    const mockedUseNavigate = vi.mocked(useNavigate);
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("読み込み中の状態では読み込み中コンポーネントが表示される", () => {
    setMockAuthState({
      isLoading: true,
      user: null,
    });
    render(
      <ProtectedRoute>
        <div>認証済みの子コンポーネント</div>
      </ProtectedRoute>,
    );
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("エラー状態の場合、エラーコンポーネントが表示され、リダイレクト処理が行われる", () => {
    vi.useFakeTimers();
    setMockAuthState({
      isLoading: false,
      user: null,
    });
    render(
      <ProtectedRoute redirectDelay={2000} redirectPath="/login">
        <div>認証済みの子コンポーネント</div>
      </ProtectedRoute>,
    );
    expect(
      screen.getByText("ユーザー情報が取得できませんでした。"),
    ).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("認証済みの場合、子コンポーネントが表示される", () => {
    setMockAuthState({
      isLoading: false,
      user: {
        access_token: "dummy_access_token",
        token_type: "Bearer",
        profile: {
          aud: "dummy_audience",
          exp: Math.floor(Date.now() / 1000) + 3600, // 有効期限1時間後
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
    render(
      <ProtectedRoute>
        <div>認証済みの子コンポーネント</div>
      </ProtectedRoute>,
    );
    expect(screen.getByText("認証済みの子コンポーネント")).toBeInTheDocument();
  });
});
