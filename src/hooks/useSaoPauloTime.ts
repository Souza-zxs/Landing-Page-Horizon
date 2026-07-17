import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function getSaoPauloTime() {
  return formatter.format(new Date());
}

export function useSaoPauloTime() {
  const [time, setTime] = useState(getSaoPauloTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getSaoPauloTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
