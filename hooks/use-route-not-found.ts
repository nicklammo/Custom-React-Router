import { cloneElement, isValidElement, useMemo } from "react";
import { RouteType } from "../contexts/router-context";
import { useCurrentRoute } from "./use-current-route"

export const useRouteNotFound = (
  children: React.ReactNode | React.ReactNode[], 
  routeNotFoundComponent?: React.ReactNode, 
  rootRoute?: RouteType | null,
) => {
  const currentRoute = useCurrentRoute(children);
  return useMemo(() => {
    if (!currentRoute && routeNotFoundComponent) {
      if (rootRoute && isValidElement<RouteType>(rootRoute.element)) {
        return cloneElement(rootRoute.element, { children: routeNotFoundComponent });
      } else {
        return routeNotFoundComponent;
      }
    }
    return null;
  }, [currentRoute, rootRoute, routeNotFoundComponent]);
}