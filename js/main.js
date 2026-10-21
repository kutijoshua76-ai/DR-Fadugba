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

  // Contact Form Handling with Interactive Feedback
  const contactForm = document.getElementById("academic-contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="alert success">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Thank you! Your academic inquiry has been received. Dr. Fadugba or the department research office will respond promptly.</span>
            </div>
          `;
          setTimeout(() => {
            formStatus.innerHTML = "";
          }, 7000);
        }
      }, 1200);
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
