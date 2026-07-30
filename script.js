"use strict";

// Handles mobile navigation toggle and closes menu after selection.
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("open");
    });
  });
}

// Sets a dynamic copyright year.
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Publications: exclusive accordion (one research area expanded at a time).
const pubAccordion = document.getElementById("pub-accordion");
if (pubAccordion) {
  pubAccordion.addEventListener("click", (event) => {
    const trigger = event.target.closest(".pub-accordion-trigger");
    if (!trigger || !pubAccordion.contains(trigger)) {
      return;
    }

    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    const wasExpanded = trigger.getAttribute("aria-expanded") === "true";

    pubAccordion.querySelectorAll(".pub-accordion-trigger").forEach((t) => {
      t.setAttribute("aria-expanded", "false");
      const id = t.getAttribute("aria-controls");
      const p = id ? document.getElementById(id) : null;
      if (p) {
        p.hidden = true;
      }
    });

    if (!wasExpanded && panel) {
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
}

// Join Us: role detail modals (native <dialog>).
(() => {
  const dialogs = document.querySelectorAll(".join-modal");
  if (!dialogs.length) {
    return;
  }

  let lastFocused = null;

  function openDialog(dialog, opener) {
    if (typeof dialog.showModal !== "function") {
      return;
    }
    lastFocused = opener || document.activeElement;
    dialog.showModal();
    document.body.classList.add("modal-open");
    const closeBtn = dialog.querySelector(".join-modal__close");
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeDialog(dialog) {
    if (dialog.open) {
      dialog.close();
    }
  }

  document.querySelectorAll("[data-modal-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-target");
      const dialog = id ? document.getElementById(id) : null;
      if (dialog && dialog.classList.contains("join-modal")) {
        openDialog(dialog, btn);
      }
    });
  });

  dialogs.forEach((dialog) => {
    const closeBtn = dialog.querySelector(".join-modal__close");

    closeBtn?.addEventListener("click", () => {
      closeDialog(dialog);
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
      lastFocused = null;
    });
  });

})();
