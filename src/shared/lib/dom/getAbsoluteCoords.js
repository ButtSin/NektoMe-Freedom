function getAbsoluteCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
  };
}

export { getAbsoluteCoords };
