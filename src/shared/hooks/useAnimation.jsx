import { useLayoutEffect, useState } from 'react';

import { afterVisualUpdate } from '../lib/dom/afterVisualUpdate';

const useAnimation = (shouldRender, duration) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    let timerId;
    let afterId;

    if (shouldRender) {
      // eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
      setIsMounted(true);

      afterId = afterVisualUpdate(() => {
        setIsVisible(true);
      });
    } else {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setIsVisible(false);

      timerId = setTimeout(() => {
        setIsMounted(false);
      }, duration);
    }

    return () => {
      clearTimeout(timerId);

      if (afterId) afterId.cancel?.();
    };
  }, [shouldRender, duration]);

  return { isVisible, isMounted };
};

export { useAnimation };
