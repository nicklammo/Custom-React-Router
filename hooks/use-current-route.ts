import { cloneElement, useMemo, useState } from "react";
import { Children, isValidElement } from "react";
import { useLocation } from "./use-location";
import { useRoutes } from "./use-routes";
import { RouteType } from "../contexts/router-context";
import { Route } from "../components/route";

export const useCurrentRoute = (children: React.ReactNode | React.ReactNode[]) => {
  const { pathname } = useLocation();
  const routes = useRoutes(children);
  const [loaderData, setLoaderData] = useState<Record<string, unknown[]>>({});

  const matchedRoutes: React.ReactElement[] = useMemo(() => ([]), []);

  const matchRoute = useMemo(() => (
    route: RouteType,
    pathSegments: string[],
    parentParams: Record<string, string> = {}
  ): void => {
    if (!route.path) {
      return;
    }

    const cleanedPath = route.path.replace(/^\/+/, "");
    const routePathSegments = cleanedPath.split("/").filter(Boolean);

    if (routePathSegments.length > pathSegments.length) {
      return;
    }

    const params: Record<string, string> = { ...parentParams };
    let isMatch = true;

    for (let i = 0; i < routePathSegments.length; i++) {
      const routeSegment = routePathSegments[i];
      const currentSegment = pathSegments[i];

      if (routeSegment.startsWith(":")) {
        const paramName = routeSegment.substring(1);
        params[paramName] = currentSegment;
      } else if (routeSegment !== currentSegment) {
        isMatch = false;
        break;
      }
    }

    if (!isMatch) {
      return;
    }


      if (route.guard && !route.guard()) {
        return;
      }

      const remainingPathSegments = pathSegments.slice(routePathSegments.length);

      if (route.loader) {
        setLoaderData((prev) => ({ ...prev, [route.path]: route.loader ? route.loader() as unknown[] : [] }));
      }

      if (remainingPathSegments.length === 0) {

        matchedRoutes.push(
          cloneElement(route.element, {
            params,
            meta: route.meta,
            guard: route.guard,
            data: loaderData[route.path],
            key: route.path,
          })
        );
        return;
      }

      if (route.children) {
        const childrenArray = Array.isArray(route.children) ? route.children : [route.children];

        Children.forEach(childrenArray, (child) => {
          if (isValidElement<RouteType>(child) && child.type === Route) {
            const childPath = child.props.path.replace(/^\/+/, ""); 

            if (
              childPath === remainingPathSegments[0] ||
              childPath.startsWith(":")
            ) {

              if (childPath.startsWith(":")) {
                const paramName = childPath.substring(1);
                const paramValue = remainingPathSegments[0];
                const updatedParams = { ...params, [paramName]: paramValue };


                matchedRoutes.push(
                  cloneElement(route.element, {
                    params: updatedParams,
                    meta: child.props.meta ? child.props.meta : route.meta,
                    guard: child.props.guard,
                    data: loaderData[child.props.path],
                    key: `${route.path}-${childPath}`,
                  })
                );
              } else {
                matchedRoutes.push(
                  cloneElement(route.element, {
                    params,
                    meta: child.props.meta ? child.props.meta : route.meta,
                    guard: child.props.guard,
                    data: loaderData[child.props.path],
                    key: `${route.path}-${childPath}`,
                  })
                );
              }
            }

            matchRoute(child.props, remainingPathSegments, params);
          }
        });
      }
    
  }, [loaderData, matchedRoutes]);

  return useMemo(() => {
    if (pathname && routes) {
      const pathSegments = pathname.split("/").filter(Boolean);

      matchedRoutes.length = 0;

      for (const route of routes) {
        matchRoute(route, pathSegments);
      }

      if (matchedRoutes.length === 0) {
        return null;
      }

      const nestedRoutes = matchedRoutes.reduceRight<React.ReactElement | null>(
        (acc, currentRoute) => {
          return cloneElement(currentRoute, { children: acc }) 
        },
        null
      );

      return nestedRoutes;
    }
    return null;
  }, [matchRoute, matchedRoutes, pathname, routes]);
};