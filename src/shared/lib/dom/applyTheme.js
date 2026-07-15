export async function applyTheme(theme) {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove("is-light", "is-dark");

  switch (theme) {
    case "light": {
      htmlElement.classList.add("is-light");

      break;
    }
    case "dark": {
      htmlElement.classList.add("is-dark");

      break;
    }
    case "system": {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      htmlElement.classList.add(systemDark ? "is-dark" : "is-light");

      break;
    }
  }
}
