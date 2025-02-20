import { useEffect } from "react";

export default function useCountDownTimer(
  countTime: number | null,
  setCountTime: (arg: number) => void,
) {
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countTime === 0) {
        clearInterval(countDownInterval);
      }
      if (countTime && countTime > 0) {
        setCountTime(countTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countTime]);
}
