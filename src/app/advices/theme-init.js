(function () {
  const theme = localStorage.getItem('theme');

  document.documentElement.classList.add(theme);
})();
