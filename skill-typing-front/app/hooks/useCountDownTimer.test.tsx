// useCountDownTimer.test.tsx
import React from "react";
import useCountDownTimer from "./useCountDownTimer";
import { act, renderHook } from "@testing-library/react";

vi.useFakeTimers();

describe("useCountDownTimer", () => {
  test("countTime が 0 になるまで毎秒1ずつ減少する", () => {
    const initialCount = 5;
    const { result } = renderHook(
      ({ initialCount }) => {
        const [count, setCount] = React.useState(initialCount);
        useCountDownTimer(count, setCount);
        return count;
      },
      { initialProps: { initialCount } },
    );
    expect(result.current).toBe(5);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(4);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(3);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(2);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(0);
  });
});
