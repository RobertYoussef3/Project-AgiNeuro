document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById("primary-nav");
  const navToggle = document.querySelector(".nav-toggle");

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      closeNav();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

const contactForm = document.querySelector("#contact form");
const note = document.getElementById("form-note");
const recipient = "robert.youssefeng@gmail.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      if (note) {
        note.textContent = "Please add your name, email, and message before sending.";
      }
      return;
    }

    const subject = `AgiNeuro website inquiry${topic ? ` — ${topic}` : ""}`;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      topic ? `Area of interest: ${topic}` : "",
      "",
      "Message:",
      message
    ].filter(Boolean).join("\n");

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    if (note) {
      note.textContent = "Opening your email app with the message ready to send.";
    }
  });
}

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const floatLayers = document.querySelectorAll("[data-float-speed]");
  const hoverSurfaces = document.querySelectorAll(".card, .feature-panel, .contact-card, .timeline article");

  hoverSurfaces.forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      surface.style.setProperty("--mouse-x", `${x}%`);
      surface.style.setProperty("--mouse-y", `${y}%`);
    });
  });

  if (!motionQuery.matches && floatLayers.length) {
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      floatLayers.forEach((layer) => {
        const speed = Number(layer.dataset.floatSpeed || 1);
        layer.style.translate = `${x * speed * 10}px ${y * speed * 10}px`;
      });
    }, { passive: true });
  }
});
