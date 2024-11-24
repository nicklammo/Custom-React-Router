import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname.replace(/\/+$/, "") || "/",
    search: window.location.search,
  }));

  useEffect(() => {
    const handlePopState = () => {
      setLocation({
        pathname: window.location.pathname.replace(/\/+$/, "") || "/",
        search: window.location.search,
      });
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    }
  }, []);

  return location;
}