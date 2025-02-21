import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import MenuButton from "./menuButton";

describe("MenuButton コンポーネント", () => {
  test("クリックイベントの追加", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<MenuButton onClick={handleClick} />);
    const menuButtonElement = screen.getByRole("button");
    await user.click(menuButtonElement);
    expect(handleClick).toBeCalledTimes(1);
  });
});
