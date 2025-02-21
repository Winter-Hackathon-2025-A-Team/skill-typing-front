import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DropdownMenu from "./dropdownMenu";
import { MemoryRouter } from "react-router";

describe("DropdownMenu コンポーネント", () => {
  test("リンク先とクリックイベントの追加", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <DropdownMenu handleLogout={handleClick} url="/test" />
      </MemoryRouter>,
    );
    const linkElement = screen.getByRole("link", { name: "問題管理" });
    const buttonElement = screen.getByRole("button", { name: "ログアウト" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
    await user.click(buttonElement);
    expect(handleClick).toBeCalledTimes(1);
  });
});
