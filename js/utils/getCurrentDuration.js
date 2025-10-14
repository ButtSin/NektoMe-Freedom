function getCurrentDuration(customPropertyDuration) {
  const documentStyles = getComputedStyle(document.documentElement);
  const durationVar = 
    documentStyles.getPropertyValue(customPropertyDuration);
  const unit = durationVar.split('').at(-2) === 'm' ? 'ms' : 's';
  
  let numberDecimalPlaces = 
    durationVar.split('.')[1]?.length - unit.length 
    || durationVar.length - unit.length;
  
  let duration = durationVar.slice(0, -unit.length);

  if (unit === 's') {
    duration = +duration * 1000;
  } else if (duration[0] === '0' && unit === 'ms') {
    duration = +duration * 10 ** numberDecimalPlaces;
  } else duration = +duration;

  return duration;
}

  export default getCurrentDuration;