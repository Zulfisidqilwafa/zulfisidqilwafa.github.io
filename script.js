const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-nav");
const navLinks = [...navigation.querySelectorAll("a")];
const sections = [...document.querySelectorAll("main section[id]")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const languageToggle = document.getElementById("language-toggle");
const languageLabels = [...languageToggle.querySelectorAll("span")];
const caseDialog = document.getElementById("case-dialog");
const dialogClose = document.getElementById("dialog-close");

let currentLanguage = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "id";
let toastTimer;

const english = {
  skip: "Skip to content",
  navProfile: "Profile",
  navExpertise: "Expertise",
  navWork: "Work",
  navJourney: "Journey",
  navContact: "Contact",
  viewCv: "View CV",
  available: "Open to collaborate",
  location: "Indonesia • UTC+7",
  heroTitle: "Building web applications.<br><em>From database to interface.</em>",
  heroLead:
    "I’m Zulfi—a Full-stack Developer who translates business needs into structured, responsive, and maintainable web applications.",
  exploreWork: "Explore my work",
  discuss: "Let’s talk",
  proofYears: "years growing<br>with technology",
  proofPublic: "selected projects<br>and applications",
  proofEnd: "backend, frontend<br>and database",
  profileIndex: "01 / Profile",
  profileTitle: "Technology that works<br><em>for people.</em>",
  profileIntro:
    "I build web applications end to end: understanding requirements, designing databases and system flows, writing backend logic, and delivering clear responsive interfaces.",
  currentRole: "Professional role",
  polytaDescription:
    "Developing an internal application and database foundation with PHP, SQL, and Laragon to support company needs.",
  visitCompany: "Visit company",
  ventureRole: "Product in development",
  nibbliumDescription:
    "Supporting a snack business transformation through digital products and operational systems that are more adaptive, flexible, and connected.",
  openProduct: "Open product",
  education: "Education",
  informationSystems: "Information Systems (B.Sc.)",
  faculty: "Faculty of Science and Technology, Jakarta",
  isDetails: "Requirements analysis, system design, project management, and business communication.",
  technicalFoundation: "Technical foundation",
  computerNetwork: "Computer & Network Engineering",
  networkDetails: "Computer components, infrastructure, cabling, network configuration, and servers.",
  expertiseIndex: "02 / Expertise",
  expertiseTitle: "From idea to operations,<br><em>I connect the dots.</em>",
  expertiseIntro:
    "A full-stack approach to turning requirements into architecture, code, and user experiences that can keep evolving.",
  fullstackDesc:
    "Building organized application logic, data structures, and backend services with PHP, Golang, and SQL.",
  businessLogic: "Business logic",
  networkDesc:
    "Developing responsive interfaces and clear web interactions with React, JavaScript, HTML, and CSS.",
  responsiveUi: "Responsive UI",
  webInteraction: "Web interaction",
  securityDesc:
    "Translating business requirements into consistent, maintainable data models, modules, and application flows.",
  requirementAnalysis: "Requirement analysis",
  dataModeling: "Data modeling",
  modularArchitecture: "Modular architecture",
  deliveryTitle: "Delivery & Reliability",
  deliveryDesc:
    "Maintaining implementation quality through version control, debugging, testing, and structured deployment.",
  testing: "Testing",
  deployment: "Deployment",
  workIndex: "03 / Work",
  workTitle: "More than an interface.<br><em>A real problem gets solved.</em>",
  workIntro:
    "A selection of internal applications, business products, and web experiments. Open each card to see the problem, technical contribution, and implementation.",
  filterAll: "All",
  filterApplication: "Application",
  nibbliumProjectDesc:
    "A digital product supporting a snack business through product discovery, brand storytelling, and more adaptive operations.",
  polytaAppsDesc:
    "An internal web application in development with PHP, SQL, and Laragon, focused on structured data and maintainable workflows.",
  internalProject: "Internal project",
  readCase: "Read case study",
  liveSite: "Live site",
  inditDesc:
    "An e-commerce web application connecting the shopping experience and administration area into one operational flow.",
  privateProject: "Private project",
  kerupukDesc:
    "A lightweight culinary catalog website that introduces local products through an accessible experience.",
  storyDesc:
    "A web storytelling experiment combining visuals, interaction, and audio into a personal experience.",
  journeyIndex: "04 / Journey",
  journeyTitle: "From technical foundations.<br><em>To Full-stack Developer.</em>",
  journeyIntro:
    "My path has grown from computer and web fundamentals to backend, databases, frontend, and end-to-end product development.",
  foundation: "Foundation",
  foundationTitle: "Computer & Web Foundations",
  foundationDesc:
    "Building an understanding of computers, servers, networks, and web technologies as a software-development foundation.",
  operations: "Backend",
  operationsDesc:
    "Learning and applying backend logic, data relationships, and local development with Laragon.",
  internalSystems: "Full-stack",
  internalSystemsDesc:
    "Expanding from backend and databases into modern interfaces and end-to-end application development.",
  productGrowth: "Product delivery",
  productGrowthDesc:
    "Translating business needs into structured internal applications and web products that can keep evolving.",
  journeyCta: "Want the details of my experience and skills in one concise document?",
  downloadCv: "Download latest CV",
  contactIndex: "05 / Contact",
  contactTitle: "Have an application idea<br><em>worth building?</em>",
  contactIntro:
    "Tell me what you need. Your message can go directly to WhatsApp without storing personal data on this website.",
  sendMessage: "Send a direct message",
  nameLabel: "Name",
  namePlaceholder: "Full name",
  emailPlaceholder: "name@email.com",
  subjectLabel: "Subject",
  subjectPlaceholder: "What would you like to discuss?",
  messageLabel: "Message",
  messagePlaceholder: "Tell me what you need...",
  nameError: "Please enter your name.",
  emailError: "Enter a valid email address.",
  subjectError: "Please enter a subject.",
  messageError: "Please write your message.",
  sendWhatsapp: "Send to WhatsApp",
  privacyNote:
    "You will review the message in WhatsApp before sending it. This website does not store your message.",
  footerCopy: "Built to keep evolving.",
  backTop: "Back to top ↑",
  caseChallenge: "Challenge",
  caseContribution: "Contribution",
  caseOutput: "Deliverable"
};

const caseStudies = {
  id: {
    nibblium: {
      eyebrow: "Product • Full-stack Web",
      title: "Nibblium Digital Experience",
      summary:
        "Membawa cerita, produk, dan operasional bisnis camilan ke dalam pengalaman digital yang terhubung.",
      challenge:
        "Bisnis membutuhkan titik temu digital untuk memperkenalkan produk, membangun kepercayaan, dan mendukung cara kerja yang lebih adaptif.",
      contribution:
        "Menerjemahkan kebutuhan bisnis, struktur konten, dan alur pengguna menjadi pengalaman web yang responsif dan terhubung.",
      output:
        "Website publik dengan katalog produk, cerita perjalanan bisnis, profil tim, dan kanal kontak.",
      tools: "Product thinking, web development, responsive UI, content architecture",
      links: [{ label: "Buka situs live", url: "https://nibblium.com" }]
    },
    polyta: {
      eyebrow: "Web Application • PHP / SQL",
      title: "Polyta Internal Apps",
      summary:
        "Fondasi aplikasi internal dengan struktur database dan alur web yang dapat dikembangkan bertahap.",
      challenge:
        "Aplikasi internal membutuhkan struktur data yang jelas, modul yang terpisah, dan lingkungan pengembangan lokal yang mudah dirawat.",
      contribution:
        "Menyusun basis data polyta_internal_apps dan mengembangkan arah aplikasi web menggunakan PHP, SQL, serta Laragon sebagai lingkungan pengembangan lokal.",
      output:
        "Fondasi aplikasi dan basis data internal dalam tahap pengembangan. Detail data perusahaan tidak dipublikasikan.",
      tools: "PHP, SQL, Laragon, database design, system analysis",
      links: []
    },
    indit: {
      eyebrow: "Web Development • E-commerce",
      title: "INDIT Commerce",
      summary:
        "Konsep aplikasi e-commerce yang menyatukan pengalaman pengguna dan kebutuhan administrasi.",
      challenge:
        "Menyusun alur belanja yang mudah dipahami sekaligus menyediakan area pengelolaan bagi administrator.",
      contribution:
        "Merancang struktur pengalaman, halaman e-commerce, dan antarmuka admin sebagai satu sistem.",
      output:
        "Prototipe web pengguna dan dashboard admin. Detail kode tidak dipublikasikan karena proyek bersifat privat.",
      tools: "Web application, UI flow, admin dashboard",
      links: []
    },
    kerupuk: {
      eyebrow: "Website • Public Repository",
      title: "Kerupuk Nusantara",
      summary:
        "Katalog web ringan untuk memperkenalkan produk kuliner lokal secara jelas dan mudah diakses.",
      challenge:
        "Produk lokal membutuhkan presentasi digital sederhana yang tetap menarik di perangkat desktop maupun mobile.",
      contribution:
        "Membangun struktur konten, tampilan responsif, dan interaksi dasar menggunakan teknologi web fundamental.",
      output: "Website demo yang dapat dibuka serta repository publik untuk meninjau implementasinya.",
      tools: "HTML, CSS, JavaScript, GitHub Pages",
      links: [
        { label: "Buka demo", url: "https://zulfisidqilwafa.github.io/kerupuk_nusantara/" },
        { label: "Lihat GitHub", url: "https://github.com/Zulfisidqilwafa/kerupuk_nusantara" }
      ]
    },
    story: {
      eyebrow: "Creative Web • Public Repository",
      title: "Interactive Story",
      summary:
        "Eksperimen storytelling personal melalui perpaduan visual, gerak, dan audio di browser.",
      challenge:
        "Membawa sebuah cerita ke format web yang terasa lebih hidup daripada halaman teks biasa.",
      contribution:
        "Mengembangkan struktur halaman, gaya visual, interaksi JavaScript, dan integrasi audio.",
      output: "Pengalaman interaktif yang dapat dibuka langsung serta repository publik dengan riwayat pengembangan.",
      tools: "HTML, CSS, JavaScript, Web Audio",
      links: [
        { label: "Buka demo", url: "https://zulfisidqilwafa.github.io/story/" },
        { label: "Lihat GitHub", url: "https://github.com/Zulfisidqilwafa/story" }
      ]
    }
  },
  en: {
    nibblium: {
      eyebrow: "Product • Full-stack Web",
      title: "Nibblium Digital Experience",
      summary:
        "Bringing a snack business story, products, and operations into one connected digital experience.",
      challenge:
        "The business needed a digital touchpoint to introduce products, build trust, and support more adaptive operations.",
      contribution:
        "Translating business needs, content structure, and user flows into a connected responsive web experience.",
      output:
        "A public website featuring product discovery, the business journey, team profiles, and contact channels.",
      tools: "Product thinking, web development, responsive UI, content architecture",
      links: [{ label: "Open live site", url: "https://nibblium.com" }]
    },
    polyta: {
      eyebrow: "Web Application • PHP / SQL",
      title: "Polyta Internal Apps",
      summary:
        "An internal application foundation with a database structure and web flow that can evolve incrementally.",
      challenge:
        "An internal application needs a clear data structure, separated modules, and a maintainable local development environment.",
      contribution:
        "Designing the polyta_internal_apps database and shaping the web application with PHP, SQL, and Laragon as the local development environment.",
      output:
        "An internal application and database foundation currently in development. Company data details are not published.",
      tools: "PHP, SQL, Laragon, database design, system analysis",
      links: []
    },
    indit: {
      eyebrow: "Web Development • E-commerce",
      title: "INDIT Commerce",
      summary:
        "An e-commerce application concept connecting the customer experience and administrative needs.",
      challenge:
        "Designing an understandable shopping flow while providing a practical management area for administrators.",
      contribution:
        "Designing the experience structure, e-commerce pages, and admin interface as one system.",
      output:
        "A customer-facing web prototype and admin dashboard. Code details are not published because the project is private.",
      tools: "Web application, UI flow, admin dashboard",
      links: []
    },
    kerupuk: {
      eyebrow: "Website • Public Repository",
      title: "Kerupuk Nusantara",
      summary:
        "A lightweight web catalog introducing local culinary products through an accessible experience.",
      challenge:
        "Local products needed a simple digital presentation that still worked well on desktop and mobile.",
      contribution:
        "Building the content structure, responsive presentation, and core interactions with fundamental web technologies.",
      output: "A working demo and public repository where the implementation can be reviewed.",
      tools: "HTML, CSS, JavaScript, GitHub Pages",
      links: [
        { label: "Open demo", url: "https://zulfisidqilwafa.github.io/kerupuk_nusantara/" },
        { label: "View GitHub", url: "https://github.com/Zulfisidqilwafa/kerupuk_nusantara" }
      ]
    },
    story: {
      eyebrow: "Creative Web • Public Repository",
      title: "Interactive Story",
      summary:
        "A personal storytelling experiment combining visuals, motion, and audio in the browser.",
      challenge:
        "Translating a story into a web format that feels more alive than a conventional text page.",
      contribution:
        "Developing the page structure, visual system, JavaScript interactions, and audio integration.",
      output: "A working interactive experience and public repository with a visible development history.",
      tools: "HTML, CSS, JavaScript, Web Audio",
      links: [
        { label: "Open demo", url: "https://zulfisidqilwafa.github.io/story/" },
        { label: "View GitHub", url: "https://github.com/Zulfisidqilwafa/story" }
      ]
    }
  }
};

const captureOriginalLanguage = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.dataset.originalText = element.textContent.trim();
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.dataset.originalHtml = element.innerHTML;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.dataset.originalPlaceholder = element.getAttribute("placeholder") ?? "";
  });
};

const track = (eventName, details = {}) => {
  const payload = {
    event: eventName,
    path: window.location.pathname,
    language: currentLanguage,
    details,
    timestamp: new Date().toISOString()
  };

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {});
};

const closeMenu = () => {
  menuToggle.classList.remove("active");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    currentLanguage === "en" ? "Open navigation menu" : "Buka menu navigasi"
  );
};

const applyLanguage = (language, updateUrl = true) => {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent =
      language === "en" && english[key] ? english[key] : element.dataset.originalText;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    element.innerHTML =
      language === "en" && english[key] ? english[key] : element.dataset.originalHtml;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute(
      "placeholder",
      language === "en" && english[key] ? english[key] : element.dataset.originalPlaceholder
    );
  });

  languageLabels.forEach((label) => {
    label.classList.toggle("active", label.textContent.toLowerCase() === language);
  });

  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"
  );

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }

  closeMenu();
};

const showToast = (message) => {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
};

const openCaseStudy = (caseId) => {
  const caseStudy = caseStudies[currentLanguage][caseId];
  if (!caseStudy) return;

  document.getElementById("case-eyebrow").textContent = caseStudy.eyebrow;
  document.getElementById("case-title").textContent = caseStudy.title;
  document.getElementById("case-summary").textContent = caseStudy.summary;
  document.getElementById("case-challenge").textContent = caseStudy.challenge;
  document.getElementById("case-contribution").textContent = caseStudy.contribution;
  document.getElementById("case-output").textContent = caseStudy.output;
  document.getElementById("case-tools").textContent = caseStudy.tools;

  const linksContainer = document.getElementById("case-links");
  linksContainer.replaceChildren();
  caseStudy.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = `${link.label} ↗`;
    linksContainer.appendChild(anchor);
  });

  caseDialog.showModal();
  track("case_study_open", { caseId });
};

captureOriginalLanguage();
applyLanguage(currentLanguage, false);

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
    return;
  }

  menuToggle.classList.add("active");
  navigation.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute(
    "aria-label",
    currentLanguage === "en" ? "Close navigation menu" : "Tutup menu navigasi"
  );
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

languageToggle.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "id" ? "en" : "id";
  applyLanguage(nextLanguage);
  track("language_change", { selected: nextLanguage });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (caseDialog.open) caseDialog.close();
  }
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 3) * 70, 140)}ms`;
  revealObserver.observe(element);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });

    track("project_filter", { selectedFilter });
  });
});

document.querySelectorAll("[data-case-study]").forEach((button) => {
  button.addEventListener("click", () => openCaseStudy(button.dataset.caseStudy));
});

dialogClose.addEventListener("click", () => caseDialog.close());
caseDialog.addEventListener("click", (event) => {
  if (event.target === caseDialog) caseDialog.close();
});

contactForm.addEventListener("input", (event) => {
  const field = event.target.closest(".form-field");
  if (field) field.classList.remove("invalid");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (contactForm.elements.website.value) {
    showToast(currentLanguage === "en" ? "Message ready." : "Pesan siap dikirim.");
    contactForm.reset();
    return;
  }

  const fields = [...contactForm.querySelectorAll(".form-field input, .form-field textarea")];
  let firstInvalidField = null;

  fields.forEach((field) => {
    const wrapper = field.closest(".form-field");
    const isInvalid = !field.checkValidity();
    wrapper.classList.toggle("invalid", isInvalid);
    if (isInvalid && !firstInvalidField) firstInvalidField = field;
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    showToast(
      currentLanguage === "en"
        ? "Please check the fields that are not complete."
        : "Periksa kembali data yang belum lengkap."
    );
    return;
  }

  const formData = new FormData(contactForm);
  const senderName = formData.get("name").trim();
  const senderEmail = formData.get("email").trim();
  const subject = formData.get("subject").trim();
  const message = formData.get("message").trim();
  const whatsappMessage =
    currentLanguage === "en"
      ? `Hello Zulfi,\n\n${message}\n\nSubject: ${subject}\nFrom: ${senderName}\nEmail: ${senderEmail}`
      : `Halo Zulfi,\n\n${message}\n\nSubjek: ${subject}\nDari: ${senderName}\nEmail: ${senderEmail}`;

  const whatsappUrl = `https://wa.me/6282115834047?text=${encodeURIComponent(whatsappMessage)}`;
  showToast(currentLanguage === "en" ? "Opening WhatsApp…" : "Membuka WhatsApp…");
  track("contact_intent", { channel: "whatsapp", subjectLength: subject.length });
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[target='_blank']");
  if (!link) return;
  track("outbound_click", { host: new URL(link.href).hostname, label: link.textContent.trim().slice(0, 60) });
});

document.getElementById("current-year").textContent = new Date().getFullYear();
track("page_view", {
  referrerHost: document.referrer ? new URL(document.referrer).hostname : "direct"
});
