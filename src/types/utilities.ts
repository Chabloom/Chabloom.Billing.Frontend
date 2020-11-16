export const appIsStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches;
