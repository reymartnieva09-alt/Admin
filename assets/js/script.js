const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const projectGrid = document.querySelector("#project-grid");
const clientMarqueeTrack = document.querySelector("#client-marquee-track");
const videoModal = document.querySelector("#video-modal");
const videoModalTitle = document.querySelector("#video-modal-title");
const projectDemoVideo = document.querySelector("#project-demo-video");
const videoCloseButtons = document.querySelectorAll("[data-video-close]");
const year = document.querySelector("#year");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const projects = [
  {
    title: "Driving System",
    description: "feature: Spawner, nitro, ui, sounds, effects, and secured.",
    image: "./assets/ProjectImages/drivingsystem.png",
    alt: "Driving System Image",
    tags: ["Lua", "Roblox Studio"],
    githubUrl: "#",
    videoUrl: "./assets/ProjectVideos/Roblox-2026-05-08T04_17_35.731Z.mp4",
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

const openVideoModal = (project) => {
  if (!videoModal || !videoModalTitle || !projectDemoVideo || !project.videoUrl) {
    return;
  }

  videoModalTitle.textContent = `${project.title} Demo`;
  projectDemoVideo.src = project.videoUrl;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectDemoVideo.play().catch(() => {});
};

const closeVideoModal = () => {
  if (!videoModal || !projectDemoVideo) {
    return;
  }

  projectDemoVideo.pause();
  projectDemoVideo.removeAttribute("src");
  projectDemoVideo.load();
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

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

  const demoButton = document.createElement("button");
  demoButton.className = "project-demo-button";
  demoButton.type = "button";
  demoButton.textContent = "Live Demo";
  demoButton.setAttribute("aria-label", `Play ${project.title} demo video`);
  demoButton.addEventListener("click", () => openVideoModal(project));

  links.append(githubLink, demoButton);
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

videoCloseButtons.forEach((button) => {
  button.addEventListener("click", closeVideoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideoModal();
  }
});

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
