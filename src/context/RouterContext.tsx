import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    if (!to) return;
    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const [pathOnly, hash] = to.split('#');
    const normalized = pathOnly === '' ? '/' : pathOnly;

    if (normalized !== pathname) {
      window.history.pushState({}, '', to);
      setPathname(normalized);
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, onClick, children, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (to.startsWith('http')) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
