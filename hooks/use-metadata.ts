import React, { isValidElement, useEffect } from "react";
import { RouteType } from "../contexts/router-context";

export const useMetadata = (currentRoute: React.ReactNode | null, rootRoute?: RouteType | null) => {
  useEffect(() => {
    if (!currentRoute) {
      return;
    }

    let meta = null;

    if (isValidElement(currentRoute)) {
      meta = (currentRoute.props as RouteType).meta;
    }

    if (!meta && rootRoute?.meta) {
      meta = rootRoute.meta;
    }

    if (meta) {
      const { title, description } = meta;

      if (title) {
        document.title = title;
      }

      if (description) {
        let descriptionMetaTag = document.querySelector('meta[name="description"]');
        if (!descriptionMetaTag) {
          descriptionMetaTag = document.createElement('meta');
          descriptionMetaTag.setAttribute('name', 'description');
          document.head.appendChild(descriptionMetaTag);
        }
        descriptionMetaTag.setAttribute('content', description);
      }
    }
  }, [currentRoute, rootRoute]);
};