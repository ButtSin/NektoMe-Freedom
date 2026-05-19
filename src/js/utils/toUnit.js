export const toUnit = ({
  value,
  unit = "px",
  currentRem,
  defaultValue = 0,
  isFloat = true,
} = {}) => {
  if (unit === "rem") {
    if (!currentRem)
      currentRem = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );

    return value / currentRem + unit;
  }

  return isFloat
    ? (parseFloat(value) || defaultValue) + unit
    : (parseInt(value) || defaultValue) + unit;
};
