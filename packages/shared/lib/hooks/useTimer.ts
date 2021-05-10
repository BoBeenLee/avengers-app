import { useState, useEffect } from "react";

function useTimer({
  seconds,
  onTimeEnd
}: {
  seconds: number;
  onTimeEnd?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) {
      onTimeEnd && onTimeEnd();
      return;
    }
    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [onTimeEnd, timeLeft]);

  return { timeLeft };
}

export default useTimer;
