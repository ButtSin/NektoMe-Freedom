import { useEffect, useRef } from "react";
import styles from "./BaseTabs.module.scss";
import ButtonTabs from "@/html/shared/components/ButtonTabs/ButtonTabs.jsx";

const BaseTabs = ({ heading, headingId, selected, tabs, onSelect }) => {
  const statusRef = useRef(null);
  const buttonsRef = useRef([]);
  const cachedStatusPaddingLeftRef = useRef(null);

  const addToButtonsRef = (el, index) => {
    if (el) {
      buttonsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const getActiveButtonRef = () =>
      buttonsRef.current?.find((button) => button.dataset.selected === "true");

    const updateStatus = async () => {
      await document.fonts.ready;

      const activeButtonRef = getActiveButtonRef();

      const activeButtonRect = activeButtonRef.getBoundingClientRect();

      if (cachedStatusPaddingLeftRef.current === null) {
        const statusStyles = getComputedStyle(statusRef.current);
        cachedStatusPaddingLeftRef.current = parseFloat(
          statusStyles.paddingLeft,
        );
      }

      statusRef.current.style.width = `${activeButtonRect.width}px`;
      statusRef.current.style.height = `${activeButtonRect.height}px`;
      statusRef.current.style.transform = `translateX(${
        activeButtonRef.offsetLeft - cachedStatusPaddingLeftRef.current
      }px)`;
    };

    updateStatus();
  }, [selected]);

  const handleKeyDown = (event) => {
    const { key } = event;

    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

    event.preventDefault();

    const activeButtonIndex = buttonsRef.current.findIndex(
      (button) => button.dataset.selected === "true",
    );

    const lastButtonIndex = buttonsRef.current.length - 1;
    let newButtonIndex = activeButtonIndex;

    switch (key) {
      case "ArrowLeft": {
        newButtonIndex =
          activeButtonIndex === 0 ? lastButtonIndex : activeButtonIndex - 1;
        break;
      }
      case "ArrowRight": {
        newButtonIndex =
          activeButtonIndex === lastButtonIndex ? 0 : activeButtonIndex + 1;
        break;
      }
      case "Home": {
        newButtonIndex = 0;
        break;
      }
      case "End": {
        newButtonIndex = lastButtonIndex;
        break;
      }
    }

    if (newButtonIndex !== activeButtonIndex) {
      const newActiveButtonId = buttonsRef.current[newButtonIndex].id;

      onSelect(newActiveButtonId);

      buttonsRef.current[newButtonIndex].focus();
    }
  };

  return (
    <section>
      <h2 className="visually-hidden" id={headingId}>
        {heading}
      </h2>
      <header className={`${styles.tabs__header}`} onKeyDown={handleKeyDown}>
        <div
          className={`${styles.tabs__buttons}`}
          role="tablist"
          aria-orientation="horizontal"
          aria-labelledby={headingId}
        >
          {tabs.map((tab, index) => (
            <ButtonTabs
              icon={tab.icon}
              description={tab.description}
              panel={tab.panel}
              id={tab.id}
              selected={selected === tab.id}
              key={tab.id}
              onSelect={() => onSelect(tab.id)}
              ref={(el) => addToButtonsRef(el, index)}
            />
          ))}

          <div
            className={`${styles["tabs__buttons-status"]}`}
            ref={statusRef}
          ></div>
        </div>
      </header>
      <div className={`${styles.tabs__body}`}>
        {tabs.map((tab) => {
          return (
            selected === tab.id && (
              <div
                className={`${styles.tabs__content} surface disable-scrollbar`}
                role="tabpanel"
                aria-labelledby={tab.id}
                key={tab.id}
                tabindex="0"
              >
                {tab.panel}
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default BaseTabs;
