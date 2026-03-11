export const toUnit = ({ value, unit = 'px', defaultValue = 0, isFloat = true } = {}) => {
  if (unit === 'rem') {
    const currentRem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    return value / currentRem + unit;
  }

  return isFloat
    ? (parseFloat(value) || defaultValue) + unit
    : (parseInt(value) || defaultValue) + unit;
};
