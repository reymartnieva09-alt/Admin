const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const year = document.querySelector("#year");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const getStoredTheme = () => localStorage.getItem("portfolio-theme");
const getPreferredTheme = () => getStoredTheme() || (prefersDark.matches ? "dark" : "light");

const setTheme = (theme) => {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeToggleText) {
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggleText.textContent = isDark ? "Light" : "Dark";
  }
};

setTheme(getPreferredTheme());

if (year) {
  year.textContent = new Date().getFullYear();
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  });
}

prefersDark.addEventListener("change", (event) => {
  if (!getStoredTheme()) {
    setTheme(event.matches ? "dark" : "light");
  }
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}
