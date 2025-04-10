// Gallery Page Specific JavaScript

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

  // Initialize lightGallery
  const galleryElement = document.getElementById("lightgallery");

  if (galleryElement && typeof lightGallery === "function") {
    // Declare lightGallery plugins
    let lgZoom, lgThumbnail;

    try {
      lgZoom = window.lgZoom;
    } catch (error) {
      console.error(
        "lgZoom is not defined. Ensure it's properly imported or included."
      );
    }

    try {
      lgThumbnail = window.lgThumbnail;
    } catch (error) {
      console.error(
        "lgThumbnail is not defined. Ensure it's properly imported or included."
      );
    }

    lightGallery(galleryElement, {
      selector: ".gallery-item",
      plugins: [lgZoom, lgThumbnail],
      speed: 500,
      download: false,
      counter: true,
      thumbnail: true,
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: false,
      toggleThumb: true,
    });
  }

  // Gallery filter functionality
  const filterButtons = document.querySelectorAll(".filter-button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Show/hide gallery items based on filter
      galleryItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });

  // Gallery search functionality
  const searchInput = document.getElementById("gallerySearch");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();

      galleryItems.forEach((item) => {
        const itemTitle =
          item.querySelector(".item-info h3")?.textContent.toLowerCase() || "";
        const itemYear =
          item.querySelector(".item-info p")?.textContent.toLowerCase() || "";
        const itemSubHtml =
          item.getAttribute("data-sub-html")?.toLowerCase() || "";

        if (
          itemTitle.includes(searchTerm) ||
          itemYear.includes(searchTerm) ||
          itemSubHtml.includes(searchTerm)
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Reset filter buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Set 'All Photos' button as active
      const allButton = document.querySelector(
        '.filter-button[data-filter="all"]'
      );
      if (allButton) {
        allButton.classList.add("active");
      }
    });
  }

  // File upload functionality
  const fileInput = document.getElementById("photoUpload");
  const fileName = document.querySelector(".file-name");
  const uploadButton = document.querySelector(".upload-button");

  if (fileInput && fileName && uploadButton) {
    uploadButton.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
      } else {
        fileName.textContent = "No file chosen";
      }
    });
  }

  // Form submission (placeholder)
  const submissionForm = document.querySelector(".submission-form");

  if (submissionForm) {
    submissionForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // This is a placeholder for actual form submission
      // In a real implementation, this would send the form data to a server
      alert(
        "Thank you for your submission! It will be reviewed and added to the gallery soon."
      );
      submissionForm.reset();

      if (fileName) {
        fileName.textContent = "No file chosen";
      }
    });
  }

  // Load more button (placeholder)
  const loadMoreButton = document.querySelector(".load-more-button");

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      // This is a placeholder for actual load more functionality
      // In a real implementation, this would load more gallery items from a server
      alert("This would load more images in a real implementation.");
    });
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
    ".gallery-item, .fan-item"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Add animation classes
  const style = document.createElement("style");
  style.textContent = `
      .gallery-item, .fan-item {
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
