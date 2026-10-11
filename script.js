/* Wavelength Salon (Kankurgachi) — interactions */
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Enquiry form → opens WhatsApp with a composed message (nothing is sent silently)
  var form = document.getElementById("enquiryForm");
  var status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("q-name");
      var name = (nameEl.value || "").trim();
      var service = document.getElementById("q-service").value;
      var when = (document.getElementById("q-when").value || "").trim();
      var note = (document.getElementById("q-note").value || "").trim();

      if (!name) {
        nameEl.focus();
        if (status) status.textContent = "Please add your name so the salon knows who to greet.";
        return;
      }
      if (!service) {
        document.getElementById("q-service").focus();
        if (status) status.textContent = "Please choose what you are booking for.";
        return;
      }

      var lines = [
        "Hello Wavelength Salon,",
        "I'd like to ask about an appointment at the Kankurgachi branch.",
        "",
        "Name: " + name,
        "Interested in: " + service
      ];
      if (when) lines.push("Preferred day: " + when);
      if (note) lines.push("Note: " + note);

      var url = "https://wa.me/916290192038?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      if (status) {
        status.textContent =
          "WhatsApp should now be open with your message ready — press send there to reach the salon. Not working? Call +91 62901 92038.";
      }
    });
  }
})();
