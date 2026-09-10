document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("menu-button");
  const emailText = "mohamed.hussain.pentester@gmail.com";
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.add("hidden"), 2600);
  };

  document.getElementById("copy-email").addEventListener("click", function () {
    navigator.clipboard
      .writeText(emailText)
      .then(() => {
        const toast = document.getElementById("toast");

        toast.classList.remove("hidden");

        setTimeout(() => {
          toast.classList.add("hidden");
        }, 3000);
      })
      .catch((err) => {
        console.error("فشل في نسخ الإيميل: ", err);
      });
  });

  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = menu.style.display === "block";
      menu.style.display = isOpen ? "none" : "block";
      btn.setAttribute("aria-expanded", String(!isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("#print-button").forEach((pBtn) => {
    pBtn.addEventListener("click", () => window.print());
  });

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailText);
        showToast("Email copied to clipboard!");
      } else {
        showToast("Clipboard access unavailable");
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showToast("Failed to copy email");
    }
  };

  document
    .getElementById("copyBtn")
    ?.addEventListener("click", handleCopyEmail);
  document
    .getElementById("copy-email")
    ?.addEventListener("click", handleCopyEmail);

  document.querySelectorAll("#skill-filters .filter").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSkill = button.dataset.skill;
      document
        .querySelectorAll("#skill-filters .filter")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll("[data-skill-group]").forEach((item) => {
        item.style.display =
          selectedSkill === "all" || item.dataset.skillGroup === selectedSkill
            ? ""
            : "none";
      });
    });
  });

  document.querySelectorAll("#project-filters .filter").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedProject = button.dataset.project;
      document
        .querySelectorAll("#project-filters .filter")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll("[data-project-group]").forEach((item) => {
        const groupData = item.dataset.projectGroup || "";
        const groups = groupData.split(" ");
        item.style.display =
          selectedProject === "all" || groups.includes(selectedProject)
            ? ""
            : "none";
      });
    });
  });

  const modal = document.getElementById("pdf-modal");
  const frame = document.getElementById("pdf-frame");

  document.querySelectorAll("[data-pdf]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const pdf = link.dataset.pdf;
      if (!pdf || link.classList.contains("disabled-link")) return;
      event.preventDefault();

      if (link.dataset.action === "download") {
        const anchor = document.createElement("a");
        anchor.href = pdf;
        anchor.download = pdf.split("/").pop();
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        return;
      }

      if (modal && frame) {
        frame.src = pdf;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", () => {
      modal?.classList.remove("open");
      modal?.setAttribute("aria-hidden", "true");
      if (frame) frame.src = "";
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));

  document.querySelectorAll(".disabled-link").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
});
