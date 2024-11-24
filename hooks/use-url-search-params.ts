import { useLocation } from "./use-location"

export const useUrlSearchParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}