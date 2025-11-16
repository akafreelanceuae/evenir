import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

const getInitialPath = () => (typeof window !== 'undefined' ? window.location.pathname : '/');

const matchPath = (routePath: string | undefined, currentPath: string) => {
  if (!routePath) {
    return currentPath === '/';
  }
  if (routePath === '*') {
    return true;
  }
  if (routePath.endsWith('/*')) {
    const base = routePath.slice(0, -2);
    return currentPath === base || currentPath.startsWith(`${base}/`);
  }
  return routePath === currentPath;
};

export const BrowserRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [path, setPath] = useState(getInitialPath);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      if (typeof window === 'undefined') return;
      if (to === path) return;
      window.history.pushState({}, '', to);
      setPath(to);
    },
    [path]
  );

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const Routes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const childArray = React.Children.toArray(children).filter(React.isValidElement) as Array<
    React.ReactElement<{ path?: string; element?: React.ReactNode }>
  >;

  const match =
    childArray.find(child => matchPath(child.props.path, router.path)) ??
    childArray.find(child => child.props.path === '*');

  const element = match?.props.element ?? null;

  if (!match) {
    console.warn(`No route matched path "${router.path}".`);
  }

  return <>{element}</>;
};

export const Route: React.FC<{ path: string; element: React.ReactNode }> = () => null;

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, onClick, ...rest }) => {
  const router = useRouter();
  return (
    <a
      {...rest}
      href={href}
      onClick={event => {
        if (!href) return;
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          onClick?.(event);
          return;
        }
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
