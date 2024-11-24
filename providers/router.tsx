import { RouterContext } from "../contexts/router-context";
import { useRoutes } from "../hooks/use-routes";
import { useCurrentRoute } from "../hooks/use-current-route";
import { useRouteNotFound } from "../hooks/use-route-not-found";
import { Suspense } from "react";
import { navigateTo } from "../utils/navigate-to";
import { useScrollRestoration } from "../hooks/use-scroll-restoration";
import { useMetadata } from "../hooks/use-metadata";
import { useRootRoute } from "../hooks/use-root-route";

const Router = ({
  children,
  fallback,
  routeNotFoundComponent,
  enableScrollRestoration = false,
}: {
  children: React.ReactNode | React.ReactNode[];
  fallback: React.ReactNode;
  routeNotFoundComponent: React.ReactNode;
  enableScrollRestoration?: boolean;
}) => {
  const currentRoute = useCurrentRoute(children);
  const routes = useRoutes(children);
  const rootRoute = useRootRoute(routes);
  const routeNotFound = useRouteNotFound(children, routeNotFoundComponent, rootRoute);

  useMetadata(currentRoute, rootRoute);
  useScrollRestoration(enableScrollRestoration);

  return (
    <RouterContext.Provider value={{
      currentRoute,
      navigateTo,
      routes,
    }}>
      <Suspense fallback={fallback}>
        {currentRoute ? currentRoute : routeNotFound}
      </Suspense>
    </RouterContext.Provider>
  )
}

export { Router };