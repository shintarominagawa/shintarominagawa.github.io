/* Shared interactions for the existing site. No layout or content changes. */
(function () {
  "use strict";

  function initializeSite() {
    var topButton = document.querySelector(".to-top");

    if (topButton) {
      function updateTopButton() {
        var visible = window.scrollY > 350;
        topButton.classList.toggle("is-visible", visible);
        topButton.tabIndex = visible ? 0 : -1;
        topButton.setAttribute("aria-hidden", visible ? "false" : "true");
      }

      topButton.addEventListener("click", function () {
        var reduceMotion = window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });

      window.addEventListener("scroll", updateTopButton, { passive: true });
      updateTopButton();
    }

    var menuButton = document.querySelector(".nav-toggle");
    var menu = document.getElementById("primary-menu");

    if (menuButton && menu) {
      function closeMenu() {
        document.body.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
      }

      menuButton.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", String(open));
      });

      menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          closeMenu();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
          closeMenu();
          menuButton.focus();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 860) {
          closeMenu();
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSite);
  } else {
    initializeSite();
  }
})();
