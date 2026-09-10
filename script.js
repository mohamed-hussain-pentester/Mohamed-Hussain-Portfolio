document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "block";
    mobileMenu.style.display = isOpen ? "none" : "block";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  // Print / Save as PDF
  document.getElementById("print-button")?.addEventListener("click", () => window.print());

  // Skills filter
  const filterSkills = (selected) => {
    document.querySelectorAll("[data-skill-group]").forEach(item => {
      item.style.display = selected === "all" || item.dataset.skillGroup === selected ? "" : "none";
    });
  };
  document.querySelectorAll("#skill-filters .filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#skill-filters .filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      filterSkills(button.dataset.skill);
    });
  });

  // Project filter
  const filterProjects = (selected) => {
    document.querySelectorAll("[data-project-group]").forEach(item => {
      const groups = item.dataset.projectGroup.split(" ");
      item.style.display = selected === "all" || groups.includes(selected) ? "" : "none";
    });
  };
  document.querySelectorAll("#project-filters .filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#project-filters .filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      filterProjects(button.dataset.project);
    });
  });

  // Certificate viewer / download
  document.querySelectorAll(".certificate-link[data-pdf]").forEach(link => {
    link.addEventListener("click", (event) => {
      const pdf = link.dataset.pdf;
      if (!pdf) return;
      event.preventDefault();

      // Allow normal download links once the file exists.
      if (link.hasAttribute("download")) {
        const a = document.createElement("a");
        a.href = pdf;
        a.download = pdf.split("/").pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }

      const modal = document.getElementById("pdf-modal");
      const frame = document.getElementById("pdf-frame");
      frame.src = pdf;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", () => {
      const modal = document.getElementById("pdf-modal");
      const frame = document.getElementById("pdf-frame");
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      frame.src = "";
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Prevent placeholder links from jumping
  document.querySelectorAll(".disabled-link").forEach(link => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
});
