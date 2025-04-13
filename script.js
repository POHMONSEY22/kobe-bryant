// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  // Check for saved theme preference or use default dark theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.className = savedTheme;

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuToggle.contains(event.target) &&
        mobileMenu.classList.contains("active")
      ) {
        mobileMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Social media button hover effects
  const socialButtons = document.querySelectorAll(".social-container .parent");

  if (socialButtons.length > 0) {
    socialButtons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const child = button.querySelector(".child");
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        child.style.transform = `perspective(180px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(2px)`;
      });

      button.addEventListener("mouseleave", () => {
        const child = button.querySelector(".child");
        child.style.transform =
          "perspective(180px) rotateX(0deg) rotateY(0deg) translateZ(2px)";
      });
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".featured-card, .portfolio-card, .timeline-item, .achievement-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animate-in");
      }
    });
  };

  // Run animation on load
  setTimeout(animateOnScroll, 100);

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Page transition effect
  const pageWrapper = document.querySelector(".page-wrapper");
  if (pageWrapper) {
    pageWrapper.style.opacity = "0";
    pageWrapper.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      pageWrapper.style.opacity = "1";
    }, 100);
  }
});
