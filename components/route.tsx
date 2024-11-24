import { RouteType } from "../contexts/router-context";

// @ts-expect-error unused props
// eslint-disable-next-line
const Route = ({ element, path, meta, guard, loader, children }: RouteType) => {
  return null;
}

export { Route };