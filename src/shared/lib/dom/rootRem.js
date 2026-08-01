let cachedRootRem = null;

const calcCurrentRem = () => {
  cachedRootRem = parseFloat(getComputedStyle(document.documentElement).fontSize);

  return cachedRootRem;
};

const getRootRem = (forceUpdate = false) => {
  if (forceUpdate || cachedRootRem === null) {
    calcCurrentRem();
  }
  return cachedRootRem;
};

const pxToRem = (value, rem = getRootRem()) => {
  const num = parseFloat(value);

  return isNaN(num) ? 0 : num / rem;
};

const refreshRootRem = () => {
  calcCurrentRem();
};

export { getRootRem, pxToRem, refreshRootRem };
