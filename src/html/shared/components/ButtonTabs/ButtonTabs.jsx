import IconCircleDashed from "@/icons/IconCircleDashed.jsx";
import styles from "./ButtonTabs.module.scss";

const ButtonTabs = ({
  id,
  selected,
  icon = <IconCircleDashed />,
  description = "Кнопка табов",
}) => {
  console.log(id, selected);
  return (
    <button
      id={id}
      className={`${styles.button} ${selected ? styles["is-active"] : null} reset-button `}
    >
      <span className={`${styles.button__icon}`} aria-hidden="true">
        {icon}
      </span>
      <p className={`${styles.button__description}`}>{description}</p>
    </button>
  );
};

export default ButtonTabs;
