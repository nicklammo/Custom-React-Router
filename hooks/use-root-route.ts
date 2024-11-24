import { useMemo } from "react";
import { RouteType } from "../contexts/router-context";

export const useRootRoute = (routes: RouteType[]) => {
  return useMemo(() => {
    return routes.find(({ path }) => path === "/") || null;
  }, [routes])
}