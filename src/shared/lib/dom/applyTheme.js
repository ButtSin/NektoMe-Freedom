const applyTheme = (theme, themeClasses) => {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove(themeClasses.dark, themeClasses.light);

  switch (theme) {
    case 'light': {
      htmlElement.classList.add(themeClasses.light);

      break;
    }
    case 'dark': {
      htmlElement.classList.add(themeClasses.dark);

      break;
    }
    case 'system': {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemDark ? themeClasses.dark : themeClasses.light);

      break;
    }
  }
};

export { applyTheme };
