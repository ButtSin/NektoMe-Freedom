import IconCircleDashed from '../icons/IconCircleDashed.jsx';

import styles from './TabButton.module.scss';

const TabButton = ({
  buttonId,
  tabId,
  selected,
  icon = <IconCircleDashed />,
  description = 'Кнопка табов',
  tabIndex,
  onClick,
  ref,
}) => {
  return (
    <button
      ref={ref}
      id={buttonId}
      className={`${styles.button} ${selected ? styles['is-active'] : ''} reset-button `}
      onClick={onClick}
      aria-selected={selected}
      aria-controls={tabId}
      tabIndex={tabIndex}
      role='tab'
    >
      <span className={`${styles.button__icon}`} aria-hidden='true'>
        {icon}
      </span>
      <p className={`${styles.button__description}`}>{description}</p>
    </button>
  );
};

export { TabButton };
