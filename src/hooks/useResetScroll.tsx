import { useEffect } from 'react';

export const useResetScroll = (
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
