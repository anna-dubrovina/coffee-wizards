import { useState, useEffect } from 'react';

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const useCurrentWidth = (conditions) => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      if (conditions) {
        return;
      } else {
        setWidth(getWidth());
      }
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [conditions]);

  return width;
};

export default useCurrentWidth;
