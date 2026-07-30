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
  heroTitle: "Building digital products.<br><em>Keeping systems reliable.</em>",
  heroLead:
    "I’m Zulfi—a Full-stack Developer and IT practitioner who connects software, hardware, and networks into solutions that are simple, measurable, and maintainable.",
  exploreWork: "Explore my work",
  discuss: "Let’s talk",
  proofYears: "years growing<br>with technology",
  proofPublic: "public projects<br>ready to explore",
  proofEnd: "code, devices<br>and networks",
  profileIndex: "01 / Profile",
  profileTitle: "Technology that works<br><em>for people.</em>",
  profileIntro:
    "Curiosity about how video games work led me into IT at the age of 10. Today, I keep technology operations running while building web products from interface to system.",
  currentRole: "Professional role",
  polytaDescription:
    "Responsible for installation, evaluation, maintenance, and improvement across company computers, software, and network systems.",
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
    "An end-to-end approach to understanding problems, building solutions, and keeping products and systems stable in real use.",
  fullstackDesc:
    "Building web products with Golang and React, from business logic to responsive user interfaces.",
  systemDesign: "System design",
  networkDesc:
    "Keeping devices, servers, and connections stable through configuration, monitoring, and routine maintenance.",
  installation: "Installation & configuration",
  monitoring: "Network monitoring",
  maintenance: "Device maintenance",
  securityDesc: "Reducing risk, protecting data, and restoring services when disruptions occur.",
  workIndex: "03 / Work",
  workTitle: "More than an interface.<br><em>A real problem gets solved.</em>",
  workIntro:
    "A selection of public products and operational work. Open each card to see the context, contribution, and deliverable.",
  filterAll: "All",
  filterInfrastructure: "Infrastructure",
  nibbliumProjectDesc:
    "A digital product supporting a snack business through product discovery, brand storytelling, and more adaptive operations.",
  readCase: "Read case study",
  liveSite: "Live site",
  inditDesc:
    "An e-commerce web application connecting the shopping experience and administration area into one operational flow.",
  privateProject: "Private project",
  kerupukDesc:
    "A lightweight culinary catalog website that introduces local products through an accessible experience.",
  storyDesc:
    "A web storytelling experiment combining visuals, interaction, and audio into a personal experience.",
  networkProjectDesc:
    "Network configuration, monitoring, and maintenance supporting reliable operational connectivity.",
  continuityDesc:
    "A layered approach to maintaining devices, protecting data, and restoring systems after disruptions.",
  journeyIndex: "04 / Journey",
  journeyTitle: "A strong technical foundation.<br><em>A product direction that keeps growing.</em>",
  journeyIntro:
    "My path moves from curiosity and computer-network fundamentals to company operations and full-stack product development.",
  foundation: "Foundation",
  foundationTitle: "Computer & Network Engineering",
  foundationDesc:
    "Learning how devices, servers, cabling, and infrastructure work together as one connected system.",
  operations: "Operations",
  operationsDesc:
    "Applying technical knowledge to real user and company needs every day.",
  productGrowth: "Product growth",
  productGrowthDesc:
    "Expanding from systems support into end-to-end digital product development.",
  journeyCta: "Want the details of my experience and skills in one concise document?",
  downloadCv: "Download latest CV",
  contactIndex: "05 / Contact",
  contactTitle: "Have an idea or system<br><em>that needs attention?</em>",
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
      eyebrow: "Product • Technology & Systems",
      title: "Nibblium Digital Experience",
      summary:
        "Membawa cerita, produk, dan operasional bisnis camilan ke dalam pengalaman digital yang terhubung.",
      challenge:
        "Bisnis membutuhkan titik temu digital untuk memperkenalkan produk, membangun kepercayaan, dan mendukung cara kerja yang lebih adaptif.",
      contribution:
        "Berperan pada sisi Technology & Systems: menerjemahkan kebutuhan bisnis ke pengalaman web dan arah sistem operasional.",
      output:
        "Website publik dengan katalog produk, cerita perjalanan bisnis, profil tim, dan kanal kontak.",
      tools: "Product thinking, web development, systems operations",
      links: [{ label: "Buka situs live", url: "https://nibblium.com" }]
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
    },
    network: {
      eyebrow: "Infrastructure • Network",
      title: "Network Operations",
      summary:
        "Menjaga konektivitas operasional melalui konfigurasi, pemantauan, dan penanganan gangguan.",
      challenge:
        "Koneksi yang tidak stabil dapat menghambat akses sistem dan aktivitas pengguna sehari-hari.",
      contribution:
        "Menjalankan konfigurasi, memantau kondisi jaringan, memperbarui perangkat, dan melakukan troubleshooting.",
      output:
        "Jaringan yang terawat dengan dokumentasi pekerjaan dan tindakan korektif sesuai kondisi lapangan.",
      tools: "Network configuration, monitoring, cabling, troubleshooting",
      links: []
    },
    continuity: {
      eyebrow: "IT Operations • Continuity",
      title: "Backup, Maintenance & Recovery",
      summary:
        "Menjaga perangkat dan data tetap siap digunakan melalui pemeliharaan serta langkah pemulihan.",
      challenge:
        "Gangguan hardware, software, malware, atau kesalahan pengguna dapat menghambat operasional dan menghilangkan data.",
      contribution:
        "Melakukan pemeliharaan, pencadangan, diagnosis, dan pemulihan sistem maupun data sesuai kebutuhan.",
      output:
        "Perangkat kembali siap pakai, risiko kehilangan data berkurang, dan proses pemulihan lebih terarah.",
      tools: "Hardware, operating systems, backup, recovery, IT support",
      links: []
    }
  },
  en: {
    nibblium: {
      eyebrow: "Product • Technology & Systems",
      title: "Nibblium Digital Experience",
      summary:
        "Bringing a snack business story, products, and operations into one connected digital experience.",
      challenge:
        "The business needed a digital touchpoint to introduce products, build trust, and support more adaptive operations.",
      contribution:
        "Contributing across Technology & Systems by translating business needs into a web experience and operational direction.",
      output:
        "A public website featuring product discovery, the business journey, team profiles, and contact channels.",
      tools: "Product thinking, web development, systems operations",
      links: [{ label: "Open live site", url: "https://nibblium.com" }]
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
    },
    network: {
      eyebrow: "Infrastructure • Network",
      title: "Network Operations",
      summary:
        "Maintaining operational connectivity through configuration, monitoring, and incident response.",
      challenge:
        "Unstable connectivity can interrupt system access and everyday user activities.",
      contribution:
        "Configuring and monitoring the network, updating devices, and troubleshooting issues.",
      output:
        "A maintained network with work documentation and corrective actions based on field conditions.",
      tools: "Network configuration, monitoring, cabling, troubleshooting",
      links: []
    },
    continuity: {
      eyebrow: "IT Operations • Continuity",
      title: "Backup, Maintenance & Recovery",
      summary:
        "Keeping devices and data ready through maintenance, backup, and recovery procedures.",
      challenge:
        "Hardware, software, malware, or user errors can interrupt operations and cause data loss.",
      contribution:
        "Performing maintenance, backups, diagnosis, and system or data recovery as needed.",
      output:
        "Devices returned to service, reduced data-loss risk, and a more structured recovery process.",
      tools: "Hardware, operating systems, backup, recovery, IT support",
      links: []
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
