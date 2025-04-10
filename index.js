// Index Page Specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("fade-out");
      }, 2000);
    });
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      e.preventDefault();

      const targetSection = document.querySelector(href);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector(".mobile-menu");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");

        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
        }
      }
    });
  });

  // Video thumbnails click handler
  const videoThumbnails = document.querySelectorAll(".video-thumbnail");

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // This is a placeholder for actual video functionality
      // In a real implementation, this would open a video player or modal
      console.log("Video thumbnail clicked - would play video here");

      // Example of how you might implement this:
      // const videoId = thumbnail.dataset.videoId;
      // openVideoModal(videoId);
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const elementsToAnimate = document.querySelectorAll(
    ".about-content, .timeline-item, .principle-item, .video-item"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Add animation classes
  const style = document.createElement("style");
  style.textContent = `
      .about-content, .timeline-item, .principle-item, .video-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
  document.head.appendChild(style);

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("light");
      document.documentElement.classList.toggle("dark");

      // Save theme preference to localStorage
      const currentTheme = document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
      localStorage.setItem("theme", currentTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(savedTheme);
    }
  }

  // Social media button hover effects
  const socialButtons = document.querySelectorAll(".social-container .parent");

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
});
