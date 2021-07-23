import { useEffect } from 'react';

export const useScrollUp = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
};
