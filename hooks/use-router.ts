import { useContext } from "react";
import { RouterContext } from "../contexts/router-context";

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterContext.Provider");
  }
  return context;
}