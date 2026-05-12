const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const projectGrid = document.querySelector("#project-grid");
const clientMarqueeTrack = document.querySelector("#client-marquee-track");
const year = document.querySelector("#year");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const projects = [
  {
    title: "Project One",
    description: "A short description of the Roblox system, feature, or experience you built.",
    image: "./assets/project-placeholder-1.svg",
    alt: "Project One screenshot placeholder",
    tags: ["Lua", "Roblox Studio"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Project Two",
    description: "Explain the gameplay loop, data system, UI, or optimization challenge here.",
    image: "./assets/project-placeholder-2.svg",
    alt: "Project Two screenshot placeholder",
    tags: ["Datastore", "Systems"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Project Three",
    description: "Use this for a polished feature, commissioned system, or technical showcase.",
    image: "./assets/project-placeholder-3.svg",
    alt: "Project Three screenshot placeholder",
    tags: ["OOP", "Optimization"],
    githubUrl: "#",
    demoUrl: "#",
  },
];

const pastClients = [
  {
    title: "Clothing System",
    description: "May 9, 2026.",
    image: "./assets/ReceiptImages/first.png",
    alt: "Image",
  },
  {
    title: "Donation, Add to Cart, Designing 40 Avatar Outfit",
    description: "May 10, 2026.",
    image: "./assets/ReceiptImages/second.png",
    alt: "Image",
  }
];

const getStoredTheme = () => localStorage.getItem("portfolio-theme");
const getPreferredTheme = () => getStoredTheme() || (prefersDark.matches ? "dark" : "light");

const setTheme = (theme) => {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeToggleIcon) {
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggleIcon.textContent = isDark ? "☾" : "☀";
  }
};

setTheme(getPreferredTheme());

if (year) {
  year.textContent = new Date().getFullYear();
}

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const image = document.createElement("img");
  image.className = "h-48 w-full object-cover";
  image.src = project.image;
  image.alt = project.alt;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "p-6";

  const title = document.createElement("h3");
  title.className = "text-xl font-black";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "mt-3 text-[var(--muted)]";
  description.textContent = project.description;

  const tagList = document.createElement("div");
  tagList.className = "mt-4 flex flex-wrap gap-2";

  project.tags.forEach((tagName) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagName;
    tagList.append(tag);
  });

  const links = document.createElement("div");
  links.className = "mt-6 flex gap-4";

  const githubLink = document.createElement("a");
  githubLink.className = "text-sm font-black text-[var(--accent)] hover:underline";
  githubLink.href = project.githubUrl;
  githubLink.textContent = "GitHub";
  githubLink.setAttribute("aria-label", `${project.title} GitHub repository`);

  const demoLink = document.createElement("a");
  demoLink.className = "text-sm font-black text-[var(--accent)] hover:underline";
  demoLink.href = project.demoUrl;
  demoLink.textContent = "Live Demo";
  demoLink.setAttribute("aria-label", `${project.title} live demo`);

  links.append(githubLink, demoLink);
  body.append(title, description, tagList, links);
  card.append(image, body);

  return card;
};

if (projectGrid) {
  projectGrid.replaceChildren(...projects.map((project) => createProjectCard(project)));
}

const createClientCard = (client, isDuplicate = false) => {
  const card = document.createElement("article");
  card.className = "client-card";

  if (isDuplicate) {
    card.setAttribute("aria-hidden", "true");
  }

  const image = document.createElement("img");
  image.src = client.image;
  image.alt = isDuplicate ? "" : client.alt;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "client-card-content";

  const title = document.createElement("h3");
  title.textContent = client.title;

  const description = document.createElement("p");
  description.textContent = client.description;

  content.append(title, description);
  card.append(image, content);

  return card;
};

if (clientMarqueeTrack) {
  const cards = [
    ...pastClients.map((client) => createClientCard(client)),
    ...pastClients.map((client) => createClientCard(client, true)),
  ];

  clientMarqueeTrack.replaceChildren(...cards);
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
