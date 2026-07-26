import IconCircleDashed from '../icons/IconCircleDashed.jsx';

import styles from './TabButton.module.scss';

const ButtonTabs = ({
  id,
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
      id={id}
      className={`${styles.button} ${selected ? styles['is-active'] : ''} reset-button `}
      onClick={onClick}
      data-selected={selected}
      tabIndex={tabIndex}
    >
      <span className={`${styles.button__icon}`} aria-hidden='true'>
        {icon}
      </span>
      <p className={`${styles.button__description}`}>{description}</p>
    </button>
  );
};

export { ButtonTabs };
