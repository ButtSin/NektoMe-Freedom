const applyTheme = (theme, themeClass) => {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove(themeClass.dark, themeClass.light);

  switch (theme) {
    case 'light': {
      htmlElement.classList.add(themeClass.light);

      break;
    }
    case 'dark': {
      htmlElement.classList.add(themeClass.dark);

      break;
    }
    case 'system': {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemDark ? themeClass.dark : themeClass.light);

      break;
    }
  }
};

export { applyTheme };
