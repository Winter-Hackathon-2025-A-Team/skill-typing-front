import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import Header from "./header";
import userEvent from "@testing-library/user-event";

describe("Header コンポーネント", () => {
  test("初期レンダリング", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText("Skill Typing")).toBeInTheDocument();
    expect(screen.queryByText("問題管理")).not.toBeInTheDocument();
    expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
  });
  test("MenuButtonをクリックするとDropdownMenuが表示される", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole("button");
    await user.click(menuButton);
    expect(screen.getByText("問題管理")).toBeInTheDocument();
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
  });

  test("DropdownMenuが表示されている状態でMenuButtonを再度クリックすると非表示になる", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole("button");
    await user.click(menuButton);
    expect(screen.getByText("問題管理")).toBeInTheDocument();
    await user.click(menuButton);
    expect(screen.queryByText("問題管理")).not.toBeInTheDocument();
  });

  test("useClickOutside によりコンテナ外をクリックするとDropdownMenuが閉じる", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole("button");
    await user.click(menuButton);
    expect(screen.getByText("問題管理")).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByText("問題管理")).not.toBeInTheDocument();
  });
});
