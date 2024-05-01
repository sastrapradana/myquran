import { useEffect, useState } from "react";

export default function useRealTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(
      () => {
        setTime(new Date());
      },
      60000 // 1 detik
    );

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  return [time];
}
