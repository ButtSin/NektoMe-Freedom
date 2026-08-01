import { useEffect, useRef } from 'react';

import { utilClasses } from '@/shared/config/constants';
import { afterVisualUpdate } from '@/shared/lib/dom/afterVisualUpdate';
import { pxToRem } from '@/shared/lib/dom/rootRem';

import styles from './ShadowScroll.module.scss';

const ShadowScroll = ({ height = 50, parentBackground }) => {
  const shadowScrollRef = useRef(null);

  useEffect(() => {
    const shadow = shadowScrollRef.current;
    if (!shadow) return;

    const container = shadow.parentElement;
    if (!container) return;

    const shadowStyles = shadow.style;

    afterVisualUpdate(() => {
      shadow.classList.remove('disable-animation');
    });

    const initShadowStyles = () => {
      const parentStyles = getComputedStyle(container);
      shadowStyles.setProperty('--topOffset', parseFloat(parentStyles.paddingTop) + 'px');
      shadowStyles.setProperty('--bottomOffset', parseFloat(parentStyles.paddingBottom) + 'px');
      shadowStyles.setProperty('--leftOffset', parseFloat(parentStyles.paddingLeft) + 'px');
      shadowStyles.setProperty('--rightOffset', parseFloat(parentStyles.paddingRight) + 'px');
      shadowStyles.setProperty('--shadowHeight', pxToRem(height) + 'rem');
      shadowStyles.setProperty(
        '--shadowBackground',
        parentBackground || parentStyles.backgroundColor,
      );
    };
    initShadowStyles();

    const metrics = { scrollTop: null, scrollHeight: null, clientHeight: null };
    const cacheMetrics = () => {
      metrics.scrollTop = container.scrollTop;
      metrics.scrollHeight = container.scrollHeight;
      metrics.clientHeight = container.clientHeight;
    };
    const writeOpacity = () => {
      shadowStyles.setProperty('--shadowTopOpacity', Math.min(metrics.scrollTop / height, 1));
      shadowStyles.setProperty(
        '--shadowBottomOpacity',
        Math.min((metrics.scrollHeight - metrics.clientHeight - metrics.scrollTop) / height, 1),
      );
    };
    const update = () => {
      cacheMetrics();
      writeOpacity();
    };
    update();

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const ro = new ResizeObserver(update);
    const observeChildren = () => {
      for (const child of container.children) {
        ro.observe(child);
      }
    };
    observeChildren();

    const mo = new MutationObserver(observeChildren);
    mo.observe(container, { childList: true, subtree: true });

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      ro.disconnect();
      mo.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [height, parentBackground]);

  return (
    <div className={`${styles.shadow} ${utilClasses.disableAnimation}`} ref={shadowScrollRef} />
  );
};

export { ShadowScroll };
