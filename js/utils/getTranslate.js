function getTranslate(element, axis) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;

  if (!transform || transform === 'none') {
      return 0;
  }

  // Разбираем матрицу трансформации (2D и 3D)
  const matrix = transform.match(/matrix(3d)?\((.+)\)/);
  let tx = 0, ty = 0;

  if (matrix) {
      const is3D = matrix[1]; // Проверяем, 3D ли матрица
      const values = matrix[2].split(', ').map(Number);

      if (is3D) {
          // Для matrix3d: tx = 12-й элемент, ty = 13-й
          tx = values[12];
          ty = values[13];
      } else {
          // Для matrix: tx = 4-й элемент, ty = 5-й
          tx = values[4];
          ty = values[5];
      }
  }

  return axis.toLowerCase() === 'x' ? tx : ty;
}

export default getTranslate;