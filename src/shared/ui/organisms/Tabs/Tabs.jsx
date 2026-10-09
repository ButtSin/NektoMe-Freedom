import { useEffect, useRef } from 'react';

import { afterVisualUpdate } from '@/shared/lib/dom/afterVisualUpdate';

import { ShadowScroll } from '../../atoms/ShadowScroll/ShadowScroll';
import { TabButton } from '../../atoms/TabButton';

import styles from './Tabs.module.scss';

const Tabs = ({ heading, headingId, selected, tabs, onSelect, onFirstRender }) => {
  const statusRef = useRef(null);
  const buttonsRef = useRef([]);
  const cachedStatusPaddingLeftRef = useRef(null);
  const isFirstUpdateRef = useRef(false);

  const addToButtonsRef = (el, index) => {
    if (el) {
      buttonsRef.current[index] = el;
    }
  };

  useEffect(() => {
    if (!selected) return;

    if (!isFirstUpdateRef.current) {
      isFirstUpdateRef.current = true;

      afterVisualUpdate(() => onFirstRender?.());
    }

    const getActiveButtonRef = () =>
      buttonsRef.current?.find((button) => button.ariaSelected === 'true');

    const updateStatus = async () => {
      const activeButtonRef = getActiveButtonRef();

      if (!activeButtonRef) return;

      const activeButtonRect = activeButtonRef.getBoundingClientRect();

      if (cachedStatusPaddingLeftRef.current === null) {
        const statusStyles = getComputedStyle(statusRef.current);
        cachedStatusPaddingLeftRef.current = parseFloat(statusStyles.paddingLeft);
      }

      statusRef.current.style.width = `${activeButtonRect.width}px`;
      statusRef.current.style.height = `${activeButtonRect.height}px`;
      statusRef.current.style.transform = `translateX(${
        activeButtonRef.offsetLeft - cachedStatusPaddingLeftRef.current
      }px)`;
    };

    updateStatus();
    //TODO: применить потом latest-ref паттерн
    // eslint-disable-next-line @eslint-react/exhaustive-deps, react-hooks/exhaustive-deps
  }, [selected]);

  const handleKeyDown = (event) => {
    const { key } = event;

    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;

    event.preventDefault();

    const activeButtonIndex = buttonsRef.current.findIndex(
      (button) => button.ariaSelected === 'true',
    );

    const lastButtonIndex = buttonsRef.current.length - 1;
    let newButtonIndex = activeButtonIndex;

    switch (key) {
      case 'ArrowLeft': {
        newButtonIndex = activeButtonIndex === 0 ? lastButtonIndex : activeButtonIndex - 1;
        break;
      }
      case 'ArrowRight': {
        newButtonIndex = activeButtonIndex === lastButtonIndex ? 0 : activeButtonIndex + 1;
        break;
      }
      case 'Home': {
        newButtonIndex = 0;
        break;
      }
      case 'End': {
        newButtonIndex = lastButtonIndex;
        break;
      }
    }

    if (newButtonIndex !== activeButtonIndex) {
      const newButton = buttonsRef.current[newButtonIndex];

      const newTabId = newButton.getAttribute('aria-controls');

      onSelect(newTabId);

      newButton.focus();
    }
  };

  return (
    <section>
      <h2 className='visually-hidden' id={headingId}>
        {heading}
      </h2>
      <header className={`${styles.tabs__header}`} onKeyDown={handleKeyDown}>
        <div
          className={`${styles.tabs__buttons}`}
          role='tablist'
          aria-orientation='horizontal'
          aria-labelledby={headingId}
        >
          {tabs.map((tab, index) => (
            <TabButton
              icon={tab.icon}
              description={tab.description}
              panel={tab.panel}
              buttonId={tab.buttonId}
              tabId={tab.tabId}
              selected={selected === tab.tabId}
              tabIndex={selected === tab.tabId ? 0 : -1}
              key={tab.tabId}
              onClick={() => onSelect(tab.tabId)}
              ref={(el) => addToButtonsRef(el, index)}
            />
          ))}

          <div className={`${styles['tabs__buttons-status']}`} ref={statusRef}></div>
        </div>
      </header>
      <div className={`${styles.tabs__body}`}>
        {tabs.map((tab) => {
          return (
            selected === tab.tabId && (
              <div
                id={tab.tabId}
                className={`${styles.tabs__content} surface disable-scrollbar`}
                role='tabpanel'
                aria-labelledby={tab.buttonId}
                key={tab.tabId}
                tabIndex='0'
              >
                {tab.panel}
                <ShadowScroll />
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export { Tabs };
