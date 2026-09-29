// Arencheruvu Dinesh - Interactive Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('nav a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Smooth Scrolling with Sticky Header Offset
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        event.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const headerOffset = 85;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active Link Highlighting on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`nav a[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });

    if (window.pageYOffset < 150) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('nav a[href="#home"]');
      if (homeLink) homeLink.classList.add('active');
    }
  };

  window.addEventListener('scroll', handleScrollSpy);
  handleScrollSpy();



  // Project Filtering Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Resume Modal Handling
  const resumeModal = document.getElementById('resume-modal');
  const openModalBtns = document.querySelectorAll('.open-resume-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (resumeModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('show');
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        resumeModal.classList.remove('show');
      });
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('show');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('show')) {
        resumeModal.classList.remove('show');
      }
    });
  }

  // Contact Form Submission & Toast Feedback
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('description').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill out all required fields.', '#ef4444');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', '#ef4444');
        return;
      }

      showToast(`Thank you, ${name}! Your message has been sent successfully.`, '#10b981');
      contactForm.reset();
    });
  }

  function showToast(message, bgColor) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = bgColor || '#10b981';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Footer Year
  const footerYear = document.querySelector('.footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});