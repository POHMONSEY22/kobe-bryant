// Stats Page Specific JavaScript

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

      // Update charts if they exist
      if (window.careerChart) {
        updateChartTheme(window.careerChart);
      }
      if (window.comparisonChart) {
        updateChartTheme(window.comparisonChart);
      }
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

  // Season filter functionality
  const filterButtons = document.querySelectorAll(".filter-button");
  const seasonRows = document.querySelectorAll(".season-row");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Show/hide rows based on filter
      seasonRows.forEach((row) => {
        if (filter === "all") {
          row.classList.remove("hidden");
        } else {
          if (row.classList.contains(filter)) {
            row.classList.remove("hidden");
          } else {
            row.classList.add("hidden");
          }
        }
      });
    });
  });

  // Career Chart
  const careerChartCanvas = document.getElementById("careerChart");

  if (careerChartCanvas) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#ffffff" : "#121212";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";

    const careerChart = new Chart(careerChartCanvas, {
      type: "line",
      data: {
        labels: [
          "1996-97",
          "1997-98",
          "1998-99",
          "1999-00",
          "2000-01",
          "2001-02",
          "2002-03",
          "2003-04",
          "2004-05",
          "2005-06",
          "2006-07",
          "2007-08",
          "2008-09",
          "2009-10",
          "2010-11",
          "2011-12",
          "2012-13",
          "2013-14",
          "2014-15",
          "2015-16",
        ],
        datasets: [
          {
            label: "Points Per Game",
            data: [
              7.6, 15.4, 19.9, 22.5, 28.5, 25.2, 30.0, 24.0, 27.6, 35.4, 31.6,
              28.3, 26.8, 27.0, 25.3, 27.9, 27.3, 13.8, 22.3, 17.6,
            ],
            borderColor: "#FDB927",
            backgroundColor: "rgba(253, 185, 39, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "#FDB927",
            pointBorderColor: "#552583",
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "#552583",
            titleColor: "#FDB927",
            bodyColor: "#ffffff",
            titleFont: {
              size: 16,
              weight: "bold",
            },
            bodyFont: {
              size: 14,
            },
            padding: 12,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
            },
          },
          y: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
            },
          },
        },
      },
    });

    // Store chart in window object for theme updates
    window.careerChart = careerChart;
  }

  // Comparison Chart
  const comparisonChartCanvas = document.getElementById("comparisonChart");

  if (comparisonChartCanvas) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#ffffff" : "#121212";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";

    const comparisonChart = new Chart(comparisonChartCanvas, {
      type: "radar",
      data: {
        labels: [
          "Scoring",
          "Playmaking",
          "Defense",
          "Leadership",
          "Clutch",
          "Longevity",
        ],
        datasets: [
          {
            label: "Kobe Bryant",
            data: [95, 85, 90, 90, 95, 90],
            backgroundColor: "rgba(85, 37, 131, 0.2)",
            borderColor: "rgba(85, 37, 131, 0.7)",
            pointBackgroundColor: "rgba(85, 37, 131, 1)",
            pointBorderColor: "#ffffff",
            pointHoverBackgroundColor: "#ffffff",
            pointHoverBorderColor: "rgba(85, 37, 131, 1)",
          },
          {
            label: "Michael Jordan",
            data: [98, 80, 95, 95, 98, 85],
            backgroundColor: "rgba(206, 17, 65, 0.2)",
            borderColor: "rgba(206, 17, 65, 0.7)",
            pointBackgroundColor: "rgba(206, 17, 65, 1)",
            pointBorderColor: "#ffffff",
            pointHoverBackgroundColor: "#ffffff",
            pointHoverBorderColor: "rgba(206, 17, 65, 1)",
          },
          {
            label: "LeBron James",
            data: [90, 98, 88, 95, 90, 95],
            backgroundColor: "rgba(0, 107, 182, 0.2)",
            borderColor: "rgba(0, 107, 182, 0.7)",
            pointBackgroundColor: "rgba(0, 107, 182, 1)",
            pointBorderColor: "#ffffff",
            pointHoverBackgroundColor: "#ffffff",
            pointHoverBorderColor: "rgba(0, 107, 182, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: gridColor,
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 14,
                weight: "bold",
              },
            },
            ticks: {
              color: textColor,
              backdropColor: "transparent",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "#552583",
            titleColor: "#FDB927",
            bodyColor: "#ffffff",
            titleFont: {
              size: 16,
              weight: "bold",
            },
            bodyFont: {
              size: 14,
            },
            padding: 12,
          },
        },
      },
    });

    // Store chart in window object for theme updates
    window.comparisonChart = comparisonChart;
  }

  // Function to update chart theme
  function updateChartTheme(chart) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#ffffff" : "#121212";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";

    // Update legend text color
    if (chart.options.plugins.legend) {
      chart.options.plugins.legend.labels.color = textColor;
    }

    // Update scales based on chart type
    if (chart.config.type === "line") {
      chart.options.scales.x.grid.color = gridColor;
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      chart.options.scales.y.ticks.color = textColor;
    } else if (chart.config.type === "radar") {
      chart.options.scales.r.angleLines.color = gridColor;
      chart.options.scales.r.grid.color = gridColor;
      chart.options.scales.r.pointLabels.color = textColor;
      chart.options.scales.r.ticks.color = textColor;
    }

    chart.update();
  }

  // Animate numbers in stat cards
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateNumbers = () => {
    statNumbers.forEach((number) => {
      const finalValue = parseInt(number.textContent);
      let startValue = 0;
      const duration = 2000;
      const increment = finalValue / (duration / 16);

      number.textContent = "0";

      const counter = setInterval(() => {
        startValue += increment;

        if (startValue >= finalValue) {
          number.textContent = finalValue.toLocaleString();
          clearInterval(counter);
        } else {
          number.textContent = Math.floor(startValue).toLocaleString();
        }
      }, 16);
    });
  };

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stats-highlights")) {
          animateNumbers();
        } else {
          entry.target.classList.add("animate-in");
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const elementsToAnimate = document.querySelectorAll(
    ".stats-highlights, .career-stats-container, .record-card"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Add animation classes
  const style = document.createElement("style");
  style.textContent = `
      .career-stats-container, .record-card {
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
