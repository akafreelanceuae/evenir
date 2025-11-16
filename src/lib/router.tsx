import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const BrowserRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const getInitialPath = () => (typeof window !== 'undefined' ? window.location.pathname : '/');
  const [path, setPath] = useState(getInitialPath);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
  }, [path]);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const Routes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  let element: React.ReactNode = null;

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return;
    if (element) return;
    const { path } = child.props as { path?: string };
    if (path === router.path) {
      element = child.props.element ?? child;
    }
  });

  return <>{element}</>;
};

export const Route: React.FC<{ path: string; element: React.ReactNode }> = ({ element }) => <>{element}</>;

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, onClick, ...rest }) => {
  const router = useRouter();
  return (
    <a
      {...rest}
      href={href}
      onClick={event => {
        if (!href) return;
        event.preventDefault();
        router.navigate(href);
        onClick?.(event);
      }}
    />
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('Router context unavailable');
  }
  return ctx;
};

export const useNavigate = () => useRouter().navigate;
