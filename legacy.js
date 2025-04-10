// Legacy Page Specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

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

  // Tributes Slider
  const tributeSlides = document.querySelectorAll(".tribute-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    tributeSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Show the current slide and activate indicator
    tributeSlides[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  // Initialize slider
  if (tributeSlides.length > 0) {
    showSlide(currentSlide);

    // Previous slide button
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = tributeSlides.length - 1;
        }
        showSlide(currentSlide);
      });
    }

    // Next slide button
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= tributeSlides.length) {
          currentSlide = 0;
        }
        showSlide(currentSlide);
      });
    }

    // Indicator buttons
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto slide (optional)
    // setInterval(() => {
    //   currentSlide++;
    //   if (currentSlide >= tributeSlides.length) {
    //     currentSlide = 0;
    //   }
    //   showSlide(currentSlide);
    // }, 5000);
  }

  // Tabs functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Show the corresponding tab content
      const tabId = button.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);

      if (tabContent) {
        tabContent.classList.add("active");
      }
    });
  });

  // Initialize first tab
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

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
    ".impact-card, .quote-card, .foundation-content"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Add animation classes
  const style = document.createElement("style");
  style.textContent = `
      .impact-card, .quote-card, .foundation-content {
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
});
