import IconCircleDashed from "@/icons/IconCircleDashed.jsx";
import styles from "./ButtonTabs.module.scss";

const ButtonTabs = ({
  id,
  selected,
  icon = <IconCircleDashed />,
  description = "Кнопка табов",
  onSelect,
  ref,
}) => {
  return (
    <button
      ref={ref}
      id={id}
      className={`${styles.button} ${selected ? styles["is-active"] : ""} reset-button `}
      onClick={onSelect}
      data-selected={selected}
    >
      <span className={`${styles.button__icon}`} aria-hidden="true">
        {icon}
      </span>
      <p className={`${styles.button__description}`}>{description}</p>
    </button>
  );
};

export default ButtonTabs;
