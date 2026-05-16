const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const projectGrid = document.querySelector("#project-grid");
const gameGrid = document.querySelector("#game-grid");
const clientMarqueeTrack = document.querySelector("#client-marquee-track");
const clientGrid = document.querySelector("#client-grid");
const videoModal = document.querySelector("#video-modal");
const videoModalTitle = document.querySelector("#video-modal-title");
const projectDemoVideo = document.querySelector("#project-demo-video");
const videoCloseButtons = document.querySelectorAll("[data-video-close]");
const clientGalleryModal = document.querySelector("#client-gallery-modal");
const clientGalleryTitle = document.querySelector("#client-gallery-title");
const clientGalleryCount = document.querySelector("#client-gallery-count");
const clientGalleryImage = document.querySelector("#client-gallery-image");
const clientGalleryPrev = document.querySelector("#client-gallery-prev");
const clientGalleryNext = document.querySelector("#client-gallery-next");
const galleryCloseButtons = document.querySelectorAll("[data-gallery-close]");
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

const games = [
  {
    title: "Magnet Tower",
    description: "An obby game with a lot of system including repel and attract system, Pet system, and more.",
    developersDiscord: ["mack9513", "tenderjaxyz", "energetic_piglet_84313"],
    gameUrl: "https://www.roblox.com/games/128918153356027/Magnet-Tower",
    image: "./assets/ThumbnailImages/MagnetTowerTN.png",
    alt: "Game thumbnail placeholder",
  },
];

const pastClients = [
  {
    title: "Clothing System",
    description: "May 8, 2026. <br>  Price: $20",
    image: "./assets/ReceiptImages/first.png",
    alt: "Clothing System receipt",
    images: [
      "./assets/ProofImages/first-1.png",
      "./assets/ProofImages/first-2.png",
      "./assets/ProofImages/first-3.png",
    ],
  },
  {
    title: "Donation, Add to Cart, Designing 40 Avatar Outfit",
    description: "May 11, 2026. <br>  Price: $25",
    image: "./assets/ReceiptImages/second.png",
    alt: "Donation, cart, and avatar outfit receipt",
    images: [
      "./assets/ProofImages/second-1.png",
      "./assets/ProofImages/second-2.png",
    ],
  },
  {
    title: "Trading, Inspecting, and Inventory System",
    description: "Date Started: May 15, 2026. <br>  Price: $25",
    image: "./assets/ReceiptImages/third.png",
    alt: "Trading, inspecting, and inventory system receipt",
    images: [
      "./assets/ProofImages/Third-2.png",
      "./assets/ProofImages/Third-1.png",
      "./assets/ProofImages/Third-3.png",
    ],
  },
];

let activeClient = null;
let activeClientImages = [];
let activeClientImageIndex = 0;

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

const getClientImages = (client) => {
  if (Array.isArray(client.images) && client.images.length > 0) {
    return client.images;
  }

  return client.image ? [client.image] : [];
};

const updateClientGallery = () => {
  if (
    !activeClient ||
    !clientGalleryTitle ||
    !clientGalleryCount ||
    !clientGalleryImage ||
    !clientGalleryPrev ||
    !clientGalleryNext ||
    activeClientImages.length === 0
  ) {
    return;
  }

  const imageSrc = activeClientImages[activeClientImageIndex];

  clientGalleryTitle.textContent = activeClient.title;
  clientGalleryCount.textContent = `Image ${activeClientImageIndex + 1} of ${activeClientImages.length}`;
  clientGalleryImage.src = imageSrc;
  clientGalleryImage.alt = `${activeClient.title} image ${activeClientImageIndex + 1}`;

  const hasMultipleImages = activeClientImages.length > 1;
  clientGalleryPrev.disabled = !hasMultipleImages;
  clientGalleryNext.disabled = !hasMultipleImages;
};

const openClientGallery = (client) => {
  if (!clientGalleryModal || !clientGalleryImage) {
    return;
  }

  activeClientImages = getClientImages(client);

  if (activeClientImages.length === 0) {
    return;
  }

  activeClient = client;
  activeClientImageIndex = 0;
  updateClientGallery();
  clientGalleryModal.classList.add("is-open");
  clientGalleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeClientGallery = () => {
  if (!clientGalleryModal || !clientGalleryImage) {
    return;
  }

  clientGalleryModal.classList.remove("is-open");
  clientGalleryModal.setAttribute("aria-hidden", "true");
  clientGalleryImage.removeAttribute("src");
  clientGalleryImage.alt = "";
  activeClient = null;
  activeClientImages = [];
  activeClientImageIndex = 0;
  document.body.classList.remove("modal-open");
};

const showNextClientImage = () => {
  if (activeClientImages.length <= 1) {
    return;
  }

  activeClientImageIndex = (activeClientImageIndex + 1) % activeClientImages.length;
  updateClientGallery();
};

const showPreviousClientImage = () => {
  if (activeClientImages.length <= 1) {
    return;
  }

  activeClientImageIndex = (activeClientImageIndex - 1 + activeClientImages.length) % activeClientImages.length;
  updateClientGallery();
};

const getDevelopersDiscordText = (game) => {
  const developersDiscord = game.developersDiscord || game.developers;

  if (Array.isArray(developersDiscord)) {
    return developersDiscord.join(", ");
  }

  return developersDiscord || "Mackenzie";
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

const createGameCard = (game) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const image = document.createElement("img");
  image.className = "h-48 w-full object-cover";
  image.src = game.image || "./assets/profile-placeholder.png";
  image.alt = game.alt;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.src = "./assets/profile-placeholder.png";
  }, { once: true });

  const body = document.createElement("div");
  body.className = "p-6";

  const title = document.createElement("h3");
  title.className = "text-xl font-black";
  title.textContent = game.title;

  const description = document.createElement("p");
  description.className = "mt-3 text-[var(--muted)]";
  description.textContent = game.description;

  const developerBlock = document.createElement("div");
  developerBlock.className = "game-developers";

  const developerLabel = document.createElement("p");
  developerLabel.className = "game-developers-label";
  developerLabel.textContent = "Developers Discord";

  const developerNames = document.createElement("p");
  developerNames.className = "game-developers-list";
  developerNames.textContent = getDevelopersDiscordText(game);

  const links = document.createElement("div");
  links.className = "mt-6 flex gap-4";

  const playLink = document.createElement("a");
  playLink.className = "text-sm font-black text-[var(--accent)] hover:underline";
  playLink.href = game.gameUrl;
  playLink.target = "_blank";
  playLink.rel = "noopener noreferrer";
  playLink.textContent = "Play Game";
  playLink.setAttribute("aria-label", `Play ${game.title} on Roblox`);

  developerBlock.append(developerLabel, developerNames);
  links.append(playLink);
  body.append(title, description, developerBlock, links);
  card.append(image, body);

  return card;
};

if (gameGrid) {
  gameGrid.replaceChildren(...games.map((game) => createGameCard(game)));
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
  description.innerHTML = client.description;

  const galleryButton = document.createElement("button");
  galleryButton.className = "client-gallery-button";
  galleryButton.type = "button";
  galleryButton.textContent = "View Images";
  galleryButton.setAttribute("aria-label", `View images for ${client.title}`);
  galleryButton.addEventListener("click", () => openClientGallery(client));

  if (isDuplicate) {
    galleryButton.tabIndex = -1;
  }

  content.append(title, description, galleryButton);
  card.append(image, content);

  return card;
};

const createClientGridCard = (client) => {
  const card = document.createElement("article");
  card.className = "client-grid-card";

  const image = document.createElement("img");
  image.src = client.image;
  image.alt = client.alt;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "client-grid-card-content";

  const title = document.createElement("h2");
  title.textContent = client.title;

  const description = document.createElement("p");
  description.innerHTML = client.description;

  const galleryButton = document.createElement("button");
  galleryButton.className = "client-grid-gallery-button";
  galleryButton.type = "button";
  galleryButton.textContent = "View Images";
  galleryButton.setAttribute("aria-label", `View images for ${client.title}`);
  galleryButton.addEventListener("click", () => openClientGallery(client));

  content.append(title, description, galleryButton);
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

if (clientGrid) {
  clientGrid.replaceChildren(...pastClients.map((client) => createClientGridCard(client)));
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

galleryCloseButtons.forEach((button) => {
  button.addEventListener("click", closeClientGallery);
});

clientGalleryPrev?.addEventListener("click", showPreviousClientImage);
clientGalleryNext?.addEventListener("click", showNextClientImage);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideoModal();
  }

  if (!clientGalleryModal?.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeClientGallery();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showNextClientImage();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPreviousClientImage();
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
