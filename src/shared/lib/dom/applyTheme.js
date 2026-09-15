const applyTheme = (theme, THEME_CLASSES) => {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove(THEME_CLASSES.dark, THEME_CLASSES.light);

  switch (theme) {
    case 'light': {
      htmlElement.classList.add(THEME_CLASSES.light);

      break;
    }
    case 'dark': {
      htmlElement.classList.add(THEME_CLASSES.dark);

      break;
    }
    case 'system': {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemDark ? THEME_CLASSES.dark : THEME_CLASSES.light);

      break;
    }
  }
};

export { applyTheme };
