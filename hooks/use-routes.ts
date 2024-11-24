import { Children, isValidElement, useMemo } from "react"
import { RouteType } from "../contexts/router-context";
import { Route } from "../components/route";

export const useRoutes = (children: React.ReactNode | React.ReactNode[]) => {
  return useMemo(() => {
    const routes: RouteType[] = [];
    Children.toArray(children).forEach((child) => {
      if (isValidElement(child) && child.type === Route) {
        const { element, path, meta, guard, children } = child.props;
        routes.push({ element, path, meta, guard, children } as RouteType);
      }
    });
    return routes;
  }, [children]);
};