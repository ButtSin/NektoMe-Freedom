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

    const parent = shadow.parentElement;
    if (!parent) return;

    const shadowStyles = shadow.style;

    afterVisualUpdate(() => {
      shadow.classList.remove('disable-animation');
    });

    const initShadowStyles = () => {
      const parentStyles = getComputedStyle(parent);

      shadowStyles.setProperty('--heightCompensation', parent.clientHeight + 'px');
      shadowStyles.setProperty('--topOffset', parentStyles.paddingTop);
      shadowStyles.setProperty('--bottomOffset', parentStyles.paddingBottom);
      shadowStyles.setProperty('--leftOffset', parentStyles.paddingLeft);
      shadowStyles.setProperty('--rightOffset', parentStyles.paddingRight);
      shadowStyles.setProperty('--shadowHeight', pxToRem(height) + 'rem');
      shadowStyles.setProperty(
        '--shadowBackground',
        parentBackground || parentStyles.backgroundColor,
      );
      shadowStyles.setProperty(
        '--sizeFactor',
        parentStyles.position === 'static' || parentStyles.position === 'relative' ? '-1' : '-2',
      );
    };
    initShadowStyles();

    const metrics = { scrollTop: null, scrollHeight: null, clientHeight: null };
    const cacheMetrics = () => {
      metrics.scrollTop = parent.scrollTop;
      metrics.scrollHeight = parent.scrollHeight;
      metrics.clientHeight = parent.clientHeight;
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
      for (const child of parent.children) {
        ro.observe(child);
      }
    };
    observeChildren();

    const mo = new MutationObserver(observeChildren);
    mo.observe(parent, { childList: true, subtree: true });

    parent.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      parent.removeEventListener('scroll', onScroll);
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
