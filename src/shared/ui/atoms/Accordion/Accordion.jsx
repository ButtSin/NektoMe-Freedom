import IconCircleDashed from "@/shared/ui/icons/IconCircleDashed.jsx";
import styles from "./Accordion.module.scss";

const Accordion = ({
  title,
  name = "",
  open = false,
  icon = <IconCircleDashed />,
  children,
}) => {
  return (
    <details className={`${styles.accordion}`} open={open} name={name}>
      <summary className={`${styles.accordion__summary}`}>
        <span
          className={`${styles["accordion__summary-icon"]}`}
          aria-hidden="true"
        >
          {icon}
          <h3 className={`${styles["accordion__summary-title"]}`}>
            <span>{title}</span>
          </h3>
        </span>
      </summary>
      <div className={`${styles.accordion__content}`}>{children}</div>
    </details>
  );
};

export { Accordion };
