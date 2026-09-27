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

  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      menu.classList.toggle("open", !isOpen);
      menu.hidden = isOpen;
      btn.setAttribute("aria-expanded", String(!isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menu.hidden = true;
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
        } else {
          entry.target.classList.remove("visible");
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

/* =========================================
   BACK TO TOP
========================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================================
   REALISTIC TERMINAL ANIMATION
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal-screen");
  const typingText = document.getElementById("typing-text");
  const cursor = document.getElementById("typing-cursor");

  if (!terminal || !typingText || !cursor) {
    return;
  }

  const commands = [
    {
      command: "whoami",
      output: "Junior Penetration Tester / Web & Network Security Specialist",
      type: "normal",
    },
    {
      command: "pwd",
      output: "/home/mohamed-hussain/security",
      type: "info",
    },
    {
      command: "ls -la",
      output: `-rw-r--r--  focus_areas.txt
-rw-r--r--  targets.txt
-rw-r--r--  recon.txt`,
      type: "normal",
    },
    {
      command: "cat focus_areas.txt",
      output: `[+] Web App Pentesting
[+] Network Security
[+] Vulnerability Assessment`,
      type: "success",
    },
    {
      command: "echo $CURRENT_STATUS",
      output: "Available for Opportunities",
      type: "success",
    },
  ];

  function getTypingSpeed() {
    return Math.floor(Math.random() * 45) + 45;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeCommand(command) {
    typingText.textContent = "";
    cursor.style.display = "inline-block";

    for (let i = 0; i < command.length; i++) {
      typingText.textContent += command[i];
      await delay(getTypingSpeed());
    }
  }

  function createOutput(text, type) {
    const output = document.createElement("div");
    output.className = "terminal-output";

    if (type === "success") {
      output.classList.add("output-success");
    }
    if (type === "info") {
      output.classList.add("output-info");
    }
    if (type === "warning") {
      output.classList.add("output-warning");
    }

    output.textContent = text;
    return output;
  }

  function createCommandLine() {
    const line = document.createElement("div");
    line.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "mohamed-hussain@security:~$";

    const command = document.createElement("span");
    command.className = "typing-text";

    line.appendChild(prompt);
    line.appendChild(command);

    return {
      line,
      command,
    };
  }

  async function runTerminal() {
    terminal.innerHTML = "";

    for (let i = 0; i < commands.length; i++) {
      const current = commands[i];

      const commandLine = createCommandLine();
      terminal.appendChild(commandLine.line);

      const currentCursor = document.createElement("span");
      currentCursor.className = "typing-cursor";
      currentCursor.textContent = "▋";
      commandLine.line.appendChild(currentCursor);

      await typeIntoElement(commandLine.command, current.command);

      currentCursor.remove();

      await delay(250);

      const output = createOutput(current.output, current.type);
      terminal.appendChild(output);

      await delay(500 + Math.random() * 500);
    }

    const separator = document.createElement("div");
    separator.className = "terminal-separator";
    terminal.appendChild(separator);

    const status = document.createElement("div");
    status.className = "terminal-status terminal-ready";

    status.innerHTML = `
      <span class="terminal-status-label">
        CURRENT_STATUS
      </span>
      <span class="terminal-status-value">
        Available for Opportunities
      </span>
    `;

    terminal.appendChild(status);

    await delay(600);

    const finalLine = createCommandLine();
    finalLine.line.classList.add("terminal-ready");

    const finalCursor = document.createElement("span");
    finalCursor.className = "typing-cursor";
    finalCursor.textContent = "▋";

    finalLine.line.appendChild(finalCursor);
    terminal.appendChild(finalLine.line);
  }

  async function typeIntoElement(element, text) {
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await delay(getTypingSpeed());
    }
  }

  runTerminal();
});

/* =========================================
   Mouse Glow Effect
========================================= */
const mouseGlow = document.querySelector(".mouse-glow");

if (mouseGlow) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateMouseGlow() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    mouseGlow.style.left = `${currentX}px`;
    mouseGlow.style.top = `${currentY}px`;

    requestAnimationFrame(animateMouseGlow);
  }

  animateMouseGlow();
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("certificateModalImage");
  const closeButton = document.getElementById("certificateClose");
  const backdrop = document.querySelector(".certificate-backdrop");

  const certificateLinks = document.querySelectorAll(
    ".certificate-link:not([data-action='download'])",
  );

  // Open certificate
  certificateLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const imagePath = link.dataset.pdf || link.getAttribute("href");

      if (!imagePath) return;

      modalImage.src = imagePath;

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");

      document.body.classList.add("modal-open");

      closeButton.focus();
    });
  });

  // Close modal
  function closeCertificateModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    // Clear image after animation
    setTimeout(() => {
      if (!modal.classList.contains("active")) {
        modalImage.src = "";
      }
    }, 250);
  }

  // Close button
  closeButton.addEventListener("click", closeCertificateModal);

  // Close by clicking outside
  backdrop.addEventListener("click", closeCertificateModal);

  // Close with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeCertificateModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.getElementById("skill-filters");
  const skillsGrid = document.getElementById("skills-grid");

  if (!filterContainer || !skillsGrid) return;

  const filters = filterContainer.querySelectorAll(".filter");
  const cards = Array.from(skillsGrid.querySelectorAll(".skill-card"));

  let isAnimating = false;

  // -----------------------------------------
  // Animate card out
  // -----------------------------------------
  function animateOut(card) {
    return new Promise((resolve) => {
      const animation = card.animate(
        [
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
          {
            opacity: 0,
            transform: "translateY(12px) scale(0.96)",
          },
        ],
        {
          duration: 220,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        },
      );

      animation.finished
        .then(() => {
          animation.cancel();

          card.style.display = "none";

          resolve();
        })
        .catch(() => {
          card.style.display = "none";
          resolve();
        });
    });
  }

  // -----------------------------------------
  // Animate card in
  // -----------------------------------------
  function animateIn(card, delay = 0) {
    return new Promise((resolve) => {
      card.style.display = "";

      const animation = card.animate(
        [
          {
            opacity: 0,
            transform: "translateY(20px) scale(0.97)",
          },
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        ],
        {
          duration: 320,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );

      animation.finished
        .then(() => {
          animation.cancel();
          resolve();
        })
        .catch(() => {
          resolve();
        });
    });
  }

  // -----------------------------------------
  // Filter click
  // -----------------------------------------
  filters.forEach((filter) => {
    filter.addEventListener("click", async () => {
      if (isAnimating) return;

      const selectedSkill = filter.dataset.skill;

      // Ignore clicking current filter
      if (filter.classList.contains("active")) return;

      isAnimating = true;

      // ---------------------------------------
      // Active button
      // ---------------------------------------
      filters.forEach((button) => {
        button.classList.remove("active");
      });

      filter.classList.add("active");

      // ---------------------------------------
      // Determine cards
      // ---------------------------------------
      const cardsToShow = [];
      const cardsToHide = [];

      cards.forEach((card) => {
        const group = card.dataset.skillGroup;
        const shouldShow = selectedSkill === "all" || group === selectedSkill;

        const isHidden = window.getComputedStyle(card).display === "none";

        if (shouldShow) {
          cardsToShow.push(card);
        } else if (!isHidden) {
          cardsToHide.push(card);
        }
      });

      // ---------------------------------------
      // 1. Hide old cards
      // ---------------------------------------
      await Promise.all(cardsToHide.map((card) => animateOut(card)));

      // ---------------------------------------
      // 2. Show new cards
      // ---------------------------------------
      await Promise.all(
        cardsToShow.map((card, index) => animateIn(card, index * 75)),
      );

      isAnimating = false;
    });
  });
});
