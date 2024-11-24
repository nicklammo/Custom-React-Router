export const Link = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={to.replace(/^\/+/, "")} onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      window.history.pushState({}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }}>
      {children}
    </a>
  );
}