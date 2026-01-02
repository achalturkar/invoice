import { useEffect, useRef } from "react";
import axios from "axios";

export const useSilentRefresh = () => {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let timer;

    const refresh = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("accessToken", res.data.accessToken);
      } catch {
        localStorage.clear();
        window.location.href = "/";
      }
    };

    timer = setInterval(refresh, 14 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);
};
