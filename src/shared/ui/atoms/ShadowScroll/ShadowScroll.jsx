import { useEffect, useRef } from 'react';

import { THEME_TRANSITION_DURATION } from '@/shared/config/constants';
import { utilClasses } from '@/shared/config/constants';
import { Animation } from '@/shared/lib/animations/Animation';
import { TimingFunction } from '@/shared/lib/animations/TimingFunction';
import { afterVisualUpdate } from '@/shared/lib/dom/afterVisualUpdate';
import { pxToRem } from '@/shared/lib/dom/rootRem';

import styles from './ShadowScroll.module.scss';

const PARENT_EVENTS = ['scroll', 'click', 'dblclick', 'keydown', 'keyup'];

const ShadowScroll = ({ height = 50, parentBackground }) => {
  const shadowScrollRef = useRef(null);

  useEffect(() => {
    const element = shadowScrollRef.current;
    if (!element) return;

    const parentElement = element.parentElement;
    if (!parentElement) return;

    const style = element.style;
    const parentStyles = getComputedStyle(parentElement);

    afterVisualUpdate(() => {
      element.classList.remove(utilClasses.disableAnimation);
    });

    const initParentStyles = () => {
      style.setProperty('--topOffset', parseFloat(parentStyles.paddingTop) + 'px');
      style.setProperty('--bottomOffset', parseFloat(parentStyles.paddingBottom) + 'px');
      style.setProperty('--leftOffset', parseFloat(parentStyles.paddingLeft) + 'px');
      style.setProperty('--rightOffset', parseFloat(parentStyles.paddingRight) + 'px');
      style.setProperty('--shadowHeight', pxToRem(height) + 'rem');
      style.setProperty('--shadowBackground', parentBackground || parentStyles.backgroundColor);
      style.setProperty('--shadowTopOpacity', 1);
      style.setProperty('--shadowBottomOpacity', 1);
    };

    const updateShadowOpacity = () => {
      const {
        scrollTop: parentElementScrollTop,
        scrollHeight: parentElementScrollHeight,
        clientHeight: parentElementClientHeight,
      } = parentElement;

      const shadowTopOpacity = Math.min(parentElementScrollTop / height, 1);
      const shadowBottomOpacity = Math.min(
        (parentElementScrollHeight - parentElementClientHeight - parentElementScrollTop) / height,
        1,
      );

      style.setProperty('--shadowTopOpacity', shadowTopOpacity);
      style.setProperty('--shadowBottomOpacity', shadowBottomOpacity);
    };

    const timingFunctions = new TimingFunction();
    const shadowAnimation = new Animation({
      duration: THEME_TRANSITION_DURATION,
      timing: timingFunctions.linear,
      draw: updateShadowOpacity,
    });

    const handleParentEvent = (event) => {
      if (event.type === 'scroll') {
        updateShadowOpacity();
        return;
      } else {
        shadowAnimation.cancel();
        shadowAnimation.enable();
      }

      shadowAnimation.animate();
    };

    const bindEvents = () => {
      for (const event of PARENT_EVENTS) {
        parentElement.addEventListener(event, handleParentEvent, { passive: true });
      }
    };

    initParentStyles();
    updateShadowOpacity();
    bindEvents();

    return () => {
      for (const event of PARENT_EVENTS) {
        parentElement.removeEventListener(event, handleParentEvent);
      }

      shadowAnimation.cancel();
    };
  }, [height, parentBackground]);

  return (
    <div className={`${styles.shadow} ${utilClasses.disableAnimation}`} ref={shadowScrollRef} />
  );
};

export { ShadowScroll };
