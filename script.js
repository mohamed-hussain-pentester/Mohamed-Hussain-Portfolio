const pageLoader = document.querySelector(".page-loader");

if (pageLoader) {
  let dismissed = false;

  const dismissPageLoader = () => {
    if (dismissed) return;
    dismissed = true;

    const startedAt = Number(
      document.documentElement.dataset.pageLoaderStartedAt,
    );
    const elapsed = startedAt ? Date.now() - startedAt : 0;
    const delay = Math.max(0, 500 - elapsed);

    window.setTimeout(() => {
      pageLoader.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("page-loading");
      delete document.documentElement.dataset.pageLoaderStartedAt;
    }, delay);
  };

  if (document.readyState === "complete") {
    dismissPageLoader();
  } else {
    window.addEventListener("load", dismissPageLoader, { once: true });
  }

  window.setTimeout(dismissPageLoader, 8000);
}

document.addEventListener("DOMContentLoaded", () => {
  const nameText = document.getElementById("hero-name-text");

  if (nameText) {
    const name = "Mohamed Hussain";
    const delay = (ms) =>
      new Promise((resolve) => window.setTimeout(resolve, ms));

    async function animateName() {
      while (true) {
        nameText.textContent = "";
        let currentWord = null;

        for (const character of name) {
          if (character === " ") {
            nameText.append(document.createTextNode(" "));
            currentWord = null;
            await delay(280 + Math.random() * 180);
            continue;
          }

          if (!currentWord) {
            currentWord = document.createElement("span");
            currentWord.className = "hero-name-word";
            nameText.append(currentWord);
          }

          const letter = document.createElement("span");
          letter.className = "hero-name-letter";
          letter.textContent = character;
          currentWord.append(letter);
          const typingDelay = 100 + Math.random() * 120;
          const pause = Math.random() < 0.08 ? 180 + Math.random() * 220 : 0;
          await delay(typingDelay + pause);
        }

        await delay(10000);

        for (let length = name.length - 1; length >= 0; length--) {
          const lastWord = nameText.lastElementChild;
          if (lastWord?.lastElementChild) {
            lastWord.lastElementChild.remove();
            if (!lastWord.hasChildNodes()) {
              lastWord.remove();
            }
          } else {
            nameText.lastChild?.remove();
          }
          await delay(65);
        }
      }
    }

    animateName();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("menu-button");
  const navLinks = Array.from(
    document.querySelectorAll(
      ".nav-links a[href^='#'], .mobile-menu a[href^='#']",
    ),
  );
  const sections = Array.from(
    new Set(
      navLinks
        .map((link) => document.getElementById(link.hash.slice(1)))
        .filter(Boolean),
    ),
  );
  const emailText = "mohamed.hussain.pentester@gmail.com";
  let toastTimeout;

  if (sections.length) {
    let navigationFrame = 0;

    const updateActiveNavigation = () => {
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect().bottom ??
        0;
      const activationLine = headerBottom + 24;
      let activeSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top > activationLine) break;
        activeSection = section;
      }

      navLinks.forEach((link) => {
        const isActive = link.hash === `#${activeSection.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const scheduleNavigationUpdate = () => {
      if (navigationFrame) return;
      navigationFrame = window.requestAnimationFrame(() => {
        navigationFrame = 0;
        updateActiveNavigation();
      });
    };

    updateActiveNavigation();
    window.addEventListener("scroll", scheduleNavigationUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleNavigationUpdate, {
      passive: true,
    });
    window.addEventListener("hashchange", scheduleNavigationUpdate);
  }

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
    .getElementById("copy-email")
    ?.addEventListener("click", handleCopyEmail);

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

  if (!terminal) return;

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
-rw-r--r--  supported_targets.txt
-rw-r--r--  recon.txt`,
      type: "normal",
      clearAfter: true,
    },
    {
      command: "cat focus_areas.txt",
      output: `[+] Web App Pentesting
[+] Network Security
[+] Vulnerability Assessment`,
      type: "success",
    },
    {
      command: "cat supported_targets.txt",
      output: `[+] SaaS Platforms
[+] E-commerce Applications
[+] Business Websites`,
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
    while (true) {
      terminal.replaceChildren();

      for (const current of commands) {
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

        if (current.clearAfter) {
          await delay(3000 + Math.random() * 2000);
          terminal.replaceChildren();
        }
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

      await delay(15000);
    }
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
const mouseGlowDot = document.querySelector(".mouse-glow-dot");

if (mouseGlow) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentDotX = 0;
  let currentDotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  if (mouseGlowDot) {
    document.addEventListener("pointerover", (event) => {
      if (event.target instanceof Element) {
        const button = event.target.closest(".btn");
        mouseGlowDot.classList.toggle("is-button-hover", Boolean(button));

        if (button) {
          const buttonColors = window.getComputedStyle(button);
          const hoverTextColor = buttonColors
            .getPropertyValue("--button-rest-background")
            .trim();
          mouseGlowDot.style.setProperty(
            "--hover-button-text-color",
            hoverTextColor,
          );
        }
      }
    });

    document.addEventListener("pointerout", (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".btn") &&
        (!(event.relatedTarget instanceof Element) ||
          !event.relatedTarget.closest(".btn"))
      ) {
        mouseGlowDot.classList.remove("is-button-hover");
        mouseGlowDot.style.removeProperty("--hover-button-text-color");
      }
    });
  }

  function animateMouseGlow() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    mouseGlow.style.left = `${currentX}px`;
    mouseGlow.style.top = `${currentY}px`;

    if (mouseGlowDot) {
      currentDotX += (mouseX - currentDotX) * 0.35;
      currentDotY += (mouseY - currentDotY) * 0.35;
      mouseGlowDot.style.left = `${currentDotX}px`;
      mouseGlowDot.style.top = `${currentDotY}px`;
    }

    requestAnimationFrame(animateMouseGlow);
  }

  animateMouseGlow();
}

/* =========================================
    Interactive Grid Effect
========================================= */
const gridMotion = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (gridMotion.matches && !reducedMotion.matches) {
  const gridCanvas = document.createElement("canvas");
  const gridContext = gridCanvas.getContext("2d");

  if (gridContext) {
    const gridSize = 42;
    const interactionRadius = 168;
    const lineColor = "rgba(109, 172, 194, 0.045)";
    const cursor = { x: 0, y: 0, currentX: 0, currentY: 0 };
    let interaction = 0;
    let targetInteraction = 0;
    let animationFrame = 0;
    let pointerEntered = false;

    gridCanvas.className = "interactive-grid";
    gridCanvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(gridCanvas);

    const resizeGrid = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      gridCanvas.width = Math.round(window.innerWidth * pixelRatio);
      gridCanvas.height = Math.round(window.innerHeight * pixelRatio);
      gridCanvas.style.width = `${window.innerWidth}px`;
      gridCanvas.style.height = `${window.innerHeight}px`;
      gridContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (interaction > 0) scheduleGridFrame();
    };

    const smoothFalloff = (distance) => {
      const progress = Math.min(distance / interactionRadius, 1);
      const eased = progress * progress * (3 - 2 * progress);
      return 1 - eased;
    };

    const drawGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const radiusSquared = interactionRadius * interactionRadius;
      const distortion = 0.42 * interaction;
      const drawRadius = interactionRadius * 1.15;
      const left = Math.max(0, cursor.currentX - drawRadius);
      const right = Math.min(width, cursor.currentX + drawRadius);
      const top = Math.max(0, cursor.currentY - drawRadius);
      const bottom = Math.min(height, cursor.currentY + drawRadius);

      gridContext.clearRect(0, 0, width, height);
      gridContext.save();
      gridContext.beginPath();
      gridContext.arc(
        cursor.currentX,
        cursor.currentY,
        drawRadius,
        0,
        Math.PI * 2,
      );
      gridContext.clip();

      const backgroundFade = gridContext.createRadialGradient(
        cursor.currentX,
        cursor.currentY,
        0,
        cursor.currentX,
        cursor.currentY,
        drawRadius,
      );
      backgroundFade.addColorStop(0, `rgba(8, 13, 16, ${0.92 * interaction})`);
      backgroundFade.addColorStop(0.78, `rgba(8, 13, 16, ${0.72 * interaction})`);
      backgroundFade.addColorStop(1, "rgba(8, 13, 16, 0)");
      gridContext.fillStyle = backgroundFade;
      gridContext.fillRect(left, top, right - left, bottom - top);

      gridContext.lineWidth = 1;
      gridContext.strokeStyle = lineColor;
      gridContext.globalAlpha = interaction;
      gridContext.shadowBlur = 0;
      gridContext.beginPath();

      const mapPoint = (x, y) => {
        const dx = x - cursor.currentX;
        const dy = y - cursor.currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = distance < interactionRadius
          ? smoothFalloff(distance) * distortion
          : 0;

        return {
          x: x - dx * influence,
          y: y - dy * influence,
          distance,
        };
      };

      const drawLine = (isVertical, position) => {
        const start = isVertical ? top : left;
        const end = isVertical ? bottom : right;
        let previous = null;

        for (let along = start; along <= end; along += 10) {
          const point = isVertical
            ? mapPoint(position, along)
            : mapPoint(along, position);
          const x = point.x;
          const y = point.y;

          if (previous) {
            gridContext.moveTo(previous.x, previous.y);
            gridContext.lineTo(x, y);
          }
          previous = { x, y };
        }

        if (previous) {
          const point = isVertical
            ? mapPoint(position, end)
            : mapPoint(end, position);
          gridContext.lineTo(point.x, point.y);
        }
      };

      const firstX = Math.floor(left / gridSize) * gridSize;
      for (let x = firstX; x <= right; x += gridSize) {
        drawLine(true, x);
      }
      const firstY = Math.floor((top + 8) / gridSize) * gridSize - 8;
      for (let y = firstY; y <= bottom; y += gridSize) {
        drawLine(false, y);
      }
      gridContext.stroke();

      if (interaction > 0.01) {
        gridContext.beginPath();
        gridContext.strokeStyle = "rgba(0, 191, 255, 0.12)";
        gridContext.shadowColor = "rgba(0, 191, 255, 0.16)";
        gridContext.shadowBlur = 5;

        const drawGlow = (isVertical, position) => {
          const start = isVertical ? top : left;
          const end = isVertical ? bottom : right;
          let previous = null;

          for (let along = start; along <= end; along += 10) {
            const point = isVertical
              ? mapPoint(position, along)
              : mapPoint(along, position);
            const mapped = { x: point.x, y: point.y };

            if (previous) {
              const midpointX = (previous.x + mapped.x) / 2;
              const midpointY = (previous.y + mapped.y) / 2;
              const dx = midpointX - cursor.currentX;
              const dy = midpointY - cursor.currentY;

              if (dx * dx + dy * dy < radiusSquared) {
                gridContext.moveTo(previous.x, previous.y);
                gridContext.lineTo(mapped.x, mapped.y);
              }
            }
            previous = mapped;
          }

          const point = isVertical
            ? mapPoint(position, end)
            : mapPoint(end, position);
          const dx = point.x - cursor.currentX;
          const dy = point.y - cursor.currentY;
          if (previous && dx * dx + dy * dy < radiusSquared) {
            gridContext.moveTo(previous.x, previous.y);
            gridContext.lineTo(point.x, point.y);
          }
        };

        for (let x = firstX; x <= right; x += gridSize) {
          drawGlow(true, x);
        }
        for (let y = firstY; y <= bottom; y += gridSize) {
          drawGlow(false, y);
        }
        gridContext.stroke();
        gridContext.shadowBlur = 0;
      }
      gridContext.restore();
    };

    const animateGrid = () => {
      animationFrame = 0;
      cursor.currentX += (cursor.x - cursor.currentX) * 0.18;
      cursor.currentY += (cursor.y - cursor.currentY) * 0.18;
      interaction += (targetInteraction - interaction) * 0.16;

      if (interaction > 0.001 || targetInteraction > 0) {
        drawGrid();
      } else {
        gridContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }

      const isSettled =
        Math.abs(cursor.x - cursor.currentX) < 0.1 &&
        Math.abs(cursor.y - cursor.currentY) < 0.1 &&
        Math.abs(targetInteraction - interaction) < 0.001;

      if (!isSettled) scheduleGridFrame();
    };

    function scheduleGridFrame() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateGrid);
      }
    }

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      if (!pointerEntered) {
        cursor.currentX = event.clientX;
        cursor.currentY = event.clientY;
        pointerEntered = true;
      }

      cursor.x = event.clientX;
      cursor.y = event.clientY;
      targetInteraction = 1;
      scheduleGridFrame();
    });

    const leaveGrid = () => {
      pointerEntered = false;
      targetInteraction = 0;
      scheduleGridFrame();
    };

    document.addEventListener("pointerleave", leaveGrid);
    window.addEventListener("blur", leaveGrid);
    window.addEventListener("resize", resizeGrid);
    resizeGrid();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("certificateModalImage");
  const closeButton = document.getElementById("certificateClose");
  const backdrop = document.querySelector(".certificate-backdrop");

  if (!modal || !modalImage || !closeButton || !backdrop) return;

  const certificateLinks = document.querySelectorAll(
    ".certificate-link:not([data-action='download'])",
  );
  let modalOpener = null;

  // Open certificate
  certificateLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const imagePath = link.href;

      modalOpener = link;
      modalImage.src = imagePath;

      modal.inert = false;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");

      document.body.classList.add("modal-open");

      requestAnimationFrame(() => closeButton.focus());
    });
  });

  // Close modal
  function closeCertificateModal() {
    modalOpener?.focus();
    modalOpener = null;
    modal.inert = true;
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
