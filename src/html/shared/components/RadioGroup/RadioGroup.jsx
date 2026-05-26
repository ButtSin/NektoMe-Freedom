import { useId } from "react";
import BaseRadio from "@/html/shared/components/BaseRadio/BaseRadio.jsx";
import styles from "./RadioGroup.module.scss";

function RadioGroup({
  mainDescription,
  radios,
  name,
  selected,
  secondaryDescription,
  onChange,
}) {
  const ariaDescriptionId = useId();

  return (
    <fieldset
      className={`${styles["radio-group"]}`}
      aria-describedby={secondaryDescription ? ariaDescriptionId : ""}
    >
      <legend className={`${styles["radio-group__main-description"]}`}>
        {mainDescription}
      </legend>
      {secondaryDescription ? (
        <p
          id={ariaDescriptionId}
          className={`${styles["radio-group__secondary-description"]}`}
        >
          {secondaryDescription}
        </p>
      ) : (
        ""
      )}
      <div
        className={`${styles["radio-group__radios"]}`}
        style={{ "--gridColumns": radios.length }}
      >
        {radios.map((radio) => (
          <BaseRadio
            key={radio.value}
            value={radio.value}
            checked={radio.value === selected}
            name={name}
            mainDescription={radio.mainDescription}
            secondaryDescription={radio.secondaryDescription}
            onChange={() => onChange(radio.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default RadioGroup;
