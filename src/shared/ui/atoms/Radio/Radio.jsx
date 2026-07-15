import styles from "./BaseRadio.module.scss";

function BaseRadio({
  value,
  name,
  mainDescription,
  secondaryDescription,
  checked,
  onChange,
}) {
  return (
    <label className={`${styles.radio}`}>
      <input
        className={`${styles.radio__control}`}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <div className={`${styles.radio__descriptions}`}>
        <span className={`${styles["radio__main-description"]}`}>
          {mainDescription}
        </span>
        {secondaryDescription ? (
          <span className={`${styles["radio__secondary-description"]}`}>
            {secondaryDescription}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export default BaseRadio;
