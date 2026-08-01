import styles from './Switch.module.scss';

const Switch = ({
  mainDescription,
  isActive,
  secondaryDescription,
  icons = null,
  requiredContent,
  conditionalContent,
  onChange,
}) => {
  return (
    <div className={`${styles.switch}`}>
      <label className={`${styles.switch__controller}`}>
        <div className={`${styles['switch__controller-inner']}`}>
          {icons && <span> {isActive ? icons[0] : icons[1]}</span>}
          <input
            className={`${styles.switch__input}`}
            type='checkbox'
            role='switch'
            checked={isActive}
            aria-checked={isActive}
            onChange={onChange}
          />
          <span className={`${styles['switch__main-description']}`}>{mainDescription}</span>
          {secondaryDescription && (
            <span className={`${styles['switch__secondary-description']}`}>
              {secondaryDescription}
            </span>
          )}
        </div>
      </label>
      {(requiredContent || conditionalContent) && (
        <div className={`${styles.switch__content}`}>
          {requiredContent && (
            <div className={styles['switch__required-content']}>{requiredContent}</div>
          )}
          {conditionalContent && (
            <div className={styles['switch__conditional-content']}>{conditionalContent}</div>
          )}
        </div>
      )}
    </div>
  );
};

export { Switch };
