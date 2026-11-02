/**
 * Main Application Logic
 * Dr. Fadugba Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("site-header");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
      }
    });
  }

  // Header blur and style change on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Multi-page navigation active link highlight
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Intersection Observer for in-page section links (if any hash anchors exist)
  const hashNavLinks = Array.from(navLinks).filter(l => l.getAttribute("href") && l.getAttribute("href").startsWith("#"));
  if (hashNavLinks.length > 0) {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          hashNavLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }

  // Animated Impact Numbers / Stats Counter
  const statNumbers = document.querySelectorAll(".stat-number, .impact-big-stat");
  let animated = false;

  const statsSection = document.querySelector(".hero-floating-impact-card") || document.getElementById("metrics");
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute("data-target"), 10);
          if (isNaN(target)) return;
          const suffix = stat.getAttribute("data-suffix") || "";
          let current = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current).toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // Contact Form Handling with Live Delivery to sunday.fadugba@eksu.edu.ng
  const contactForm = document.getElementById("academic-contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalBtnHtml = submitBtn.innerHTML;

      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const subjectSelect = document.getElementById("contact-subject");
      const messageInput = document.getElementById("contact-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const domain = subjectSelect && subjectSelect.selectedIndex >= 0 ? subjectSelect.options[subjectSelect.selectedIndex].text : "General Inquiry";
      const message = messageInput ? messageInput.value.trim() : "";

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Transmitting to Dr. Fadugba's Desk...</span>
      `;

      try {
        const payload = {
          name: name,
          email: email,
          inquiry_domain: domain,
          message: message,
          _subject: `Academic Inquiry: ${domain} (from ${name})`,
          _template: "table",
          _captcha: "false"
        };

        const response = await fetch("https://formsubmit.co/ajax/sunday.fadugba@eksu.edu.ng", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          contactForm.reset();
          if (formStatus) {
            formStatus.innerHTML = `
              <div class="alert success">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <div>
                  <strong>Inquiry Dispatched Successfully!</strong><br>
                  Your message has been delivered directly to Dr. Sunday Emmanuel Fadugba's official institutional address (<code>sunday.fadugba@eksu.edu.ng</code>). A notification has been sent to his desk.
                </div>
              </div>
            `;
            setTimeout(() => {
              if (formStatus) formStatus.innerHTML = "";
            }, 10000);
          }
        } else {
          throw new Error("HTTP error " + response.status);
        }
      } catch (err) {
        // Fallback: If network is offline or service encounters an issue, provide 1-click mailto
        const mailtoSubject = encodeURIComponent(`Academic Inquiry: ${domain} - ${name}`);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Domain: ${domain}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:sunday.fadugba@eksu.edu.ng?subject=${mailtoSubject}&body=${mailtoBody}`;

        if (formStatus) {
          formStatus.innerHTML = `
            <div class="alert error">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <div>
                <strong>Alternative Direct Dispatch:</strong><br>
                Direct transmission encountered a connection timeout. You can send this message directly via your email client to <strong>sunday.fadugba@eksu.edu.ng</strong>:<br>
                <a href="${mailtoUrl}" class="b-btn-sm b-btn-sm--blue" style="display:inline-block; margin-top:0.6rem; padding:0.45rem 1.1rem; color:#fff; text-decoration:none;">Open in Mail Client &rarr;</a>
              </div>
            </div>
          `;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // CV Download / Print Trigger
  const cvDownloadBtn = document.getElementById("download-cv-btn");
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  }
});
