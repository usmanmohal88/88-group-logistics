const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

if (menuToggle && navigation) {
  const closeMenu = (restoreFocus = false) => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu(true);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

const equipmentChoices = document.querySelectorAll('input[name="equipment-type"]');
const carrierForm = document.querySelector('form[name="carrier-onboarding"]');

if (carrierForm && equipmentChoices.length) {
  carrierForm.addEventListener("submit", (event) => {
    const hasSelection = Array.from(equipmentChoices).some((choice) => choice.checked);
    if (!hasSelection) {
      event.preventDefault();
      equipmentChoices[0].setCustomValidity("Select at least one equipment type.");
      equipmentChoices[0].reportValidity();
    }
  });

  equipmentChoices.forEach((choice) => {
    choice.addEventListener("change", () => equipmentChoices[0].setCustomValidity(""));
  });
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.documentElement.classList.add("reveal-ready");
  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
}