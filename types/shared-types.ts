
export type FCWithParams<P = object> = React.FC<P & { params?: Record<string, string> }>;
export type FCWithQueryParams<P = object> = React.FC<P & { queryParams?: Record<string, string> }>;