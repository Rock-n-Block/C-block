import { useEffect } from 'react';

export const useScrollTop = (
  pathname = window.location.href,
  behavior: ScrollBehavior = 'smooth',
) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [behavior, pathname]);
};
