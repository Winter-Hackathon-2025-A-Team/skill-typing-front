import React, { useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function TestComponent() {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, setOpen);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        コンテナ内
      </div>
      {open && <div data-testid="open-content">メニューが開いています</div>}
    </div>
  );
}

describe("useClickOutside Hook", () => {
  test("コンテナ内をクリックしてもopen状態のまま", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);
    const insideElement = screen.getByTestId("inside");
    await user.click(insideElement);
    expect(insideElement).toBeInTheDocument();
  });

  test("コンテナ外をクリックするとcloseする", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);
    const outsideElement = screen.getByTestId("open-content");
    await user.click(outsideElement);
    expect(outsideElement).not.toBeInTheDocument();
  });
});
