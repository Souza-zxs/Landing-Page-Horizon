import { useCallback, useState } from "react";

const STORAGE_KEY = "axion_dashboard_password";

export function useDashboardPassword() {
  const [password, setPasswordState] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) ?? "",
  );

  const setPassword = useCallback((value: string) => {
    sessionStorage.setItem(STORAGE_KEY, value);
    setPasswordState(value);
  }, []);

  const clearPassword = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPasswordState("");
  }, []);

  return { password, setPassword, clearPassword };
}
