// Portfolio Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hover effects for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .venture-card, .book-card, .gallery-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'var(--lakers-gold)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'var(--lakers-gold)';
      });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const portfolioNav = document.querySelector('.portfolio-nav');
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        portfolioNav.classList.toggle('active');
      });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        if (portfolioNav.classList.contains('active')) {
          portfolioNav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
        
        // Scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Scroll spy for navigation
    const sections = document.querySelectorAll('.portfolio-section');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    // Animate numbers in impact section
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const animateNumbers = () => {
      impactNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const count = parseInt(number.innerText);
        const increment = target / 30; // Divide by the number of frames
        
        if (count < target) {
          number.innerText = Math.ceil(count + increment);
          setTimeout(animateNumbers, 50);
        } else {
          number.innerText = target;
        }
      });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('impact-numbers')) {
            animateNumbers();
          } else {
            entry.target.classList.add('animate-in');
          }
        }
      });
    }, observerOptions);
    
    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.venture-card, .book-card, .film-card, .philanthropy-card, .gallery-item, .impact-numbers');
    
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
    
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
      .venture-card, .book-card, .film-card, .philanthropy-card, .gallery-item {
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
    
    // Social media button hover effects
    const socialButtons = document.querySelectorAll('.social-container .parent');
    
    socialButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const child = button.querySelector('.child');
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        child.style.transform = `perspective(180px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(2px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        const child = button.querySelector('.child');
        child.style.transform = 'perspective(180px) rotateX(0deg) rotateY(0deg) translateZ(2px)';
      });
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.input-container input, .input-container textarea');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
    
    // Gallery item click for lightbox (placeholder)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Placeholder for lightbox functionality
        console.log('Gallery item clicked - lightbox would open here');
      });
    });
  });