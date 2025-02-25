import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LinkButton from "./linkButton";

describe("LinkButton コンポーネント", () => {
  test("子要素をレンダリングし、正しいリンク先を設定する", () => {
    render(
      <MemoryRouter>
        <LinkButton url="/test">Test Link</LinkButton>
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole("link", { name: "Test Link" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });
});
