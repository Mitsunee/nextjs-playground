import { useState, useEffect } from "react";

export function useFormattedDate(timestamp) {
  const [time, setTime] = useState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const date = new Date(timestamp);
    setTime(date.toLocaleString());
  }, [timestamp]);

  return time;
}
