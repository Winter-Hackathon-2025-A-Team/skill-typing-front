import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button コンポーネント", () => {
  test("子要素のレンダリング", () => {
    render(<Button>Test</Button>);
    const buttonElement = screen.getByRole("button", { name: "Test" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("クラス名の追加", () => {
    render(<Button className="test-class">Test</Button>);
    const buttonElement = screen.getByRole("button", { name: "Test" });
    expect(buttonElement).toHaveClass("test-class");
    expect(buttonElement).toHaveClass("w-40");
  });

  test("クリックイベントの追加", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    const buttonElement = screen.getByRole("button", { name: "Test" });
    await user.click(buttonElement);
    expect(handleClick).toBeCalledTimes(1);
  });
});
