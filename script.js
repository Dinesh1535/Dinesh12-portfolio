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
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('modal-close-btn');

  if (resumeModal) {
    openResumeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeResumeBtn) {
      closeResumeBtn.addEventListener('click', () => {
        resumeModal.classList.remove('show');
        document.body.style.overflow = '';
      });
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('show')) {
        resumeModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }

  // Certificate Lightbox Modal Handling & Dynamic Data Switching
  const certModal = document.getElementById('certificate-modal');
  const openCertBtns = document.querySelectorAll('.open-cert-modal');
  const closeCertBtn = document.getElementById('cert-modal-close-btn');
  const doneCertBtn = document.getElementById('cert-modal-done-btn');

  const certData = {
    seamless: {
      badge: '<i class="fa-solid fa-shield-halved"></i> Verified Experience Letter',
      title: 'Seamless Private Limited — Internship Experience Letter',
      subtitle: 'Issued on 13th October 2026 • Visvesvaraya Technological University Affiliate • Software Engineering Dept.',
      imgSrc: 'seamless-internship-certificate.jpg',
      imgAlt: 'Official Seamless Internship Experience Letter for Arencheruvu Dinesh',
      details: [
        { label: 'Issuing Organization', val: 'Seamless Private Limited' },
        { label: 'CIN & Registration', val: 'U72900MH2010FTC206234' },
        { label: 'Internship Tenure', val: '13th April 2026 – 12th October 2026' },
        { label: 'Signatory & Seal', val: 'Suparna Debnath, HR Executive (Kolkata Seal)' }
      ],
      pdfUrl: 'seamless-internship-certificate.pdf',
      pdfDownload: 'Arencheruvu_Dinesh_Seamless_Internship_Certificate.pdf',
      imgUrl: 'seamless-internship-certificate.jpg'
    },
    a1logics: {
      badge: '<i class="fa-solid fa-shield-halved"></i> Verified Experience Certificate',
      title: 'A1 Logics — Software Development Internship Certificate',
      subtitle: 'Issued on 26th September 2023 • Ref: TR-23/220 • Takshila, M.G Road, Mangaluru, Karnataka',
      imgSrc: 'a1logics-internship-certificate.jpg',
      imgAlt: 'Official A1 Logics Internship Certificate for Arencheruvu Dinesh',
      details: [
        { label: 'Issuing Organization', val: 'A1 Logics (Software & IT Solutions)' },
        { label: 'Reference & USN', val: 'Ref: TR-23/220 • USN: 4MT20CS030' },
        { label: 'Internship Tenure', val: 'August 2023 – September 2023' },
        { label: 'Signatory & Seal', val: 'Prashanth Kalladka, HR Manager (Mangaluru Seal)' }
      ],
      pdfUrl: 'a1logics-internship-certificate.pdf',
      pdfDownload: 'Arencheruvu_Dinesh_A1Logics_Internship_Certificate.pdf',
      imgUrl: 'a1logics-internship-certificate.jpg'
    }
  };

  const certBadgeElem = document.getElementById('cert-modal-badge');
  const certTitleElem = document.getElementById('cert-modal-title');
  const certSubtitleElem = document.getElementById('cert-modal-subtitle');
  const certImgElem = document.getElementById('cert-modal-img');
  const certDetailsBarElem = document.getElementById('cert-modal-details-bar');
  const certPdfBtn = document.getElementById('cert-modal-pdf-btn');
  const certImgBtn = document.getElementById('cert-modal-img-btn');

  function openCertificateModal(e) {
    if (e) e.preventDefault();
    const trigger = e.currentTarget || (e.target && e.target.closest('.open-cert-modal'));
    const certKey = (trigger && trigger.getAttribute('data-cert')) || 'seamless';
    const data = certData[certKey] || certData['seamless'];

    if (certBadgeElem) certBadgeElem.innerHTML = data.badge;
    if (certTitleElem) certTitleElem.textContent = data.title;
    if (certSubtitleElem) certSubtitleElem.textContent = data.subtitle;
    if (certImgElem) {
      certImgElem.src = data.imgSrc;
      certImgElem.alt = data.imgAlt;
    }
    if (certDetailsBarElem) {
      certDetailsBarElem.innerHTML = data.details.map(d => `
        <div class="cert-detail-box">
          <span class="detail-label">${d.label}</span>
          <span class="detail-value">${d.val}</span>
        </div>
      `).join('');
    }
    if (certPdfBtn) {
      certPdfBtn.href = data.pdfUrl;
      certPdfBtn.setAttribute('download', data.pdfDownload);
    }
    if (certImgBtn) {
      certImgBtn.href = data.imgUrl;
    }

    if (certModal) {
      certModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertificateModal() {
    if (certModal) {
      certModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (certModal) {
    openCertBtns.forEach(btn => {
      btn.addEventListener('click', openCertificateModal);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCertificateModal(e);
        }
      });
    });

    if (closeCertBtn) {
      closeCertBtn.addEventListener('click', closeCertificateModal);
    }

    if (doneCertBtn) {
      doneCertBtn.addEventListener('click', closeCertificateModal);
    }

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertificateModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('show')) {
        closeCertificateModal();
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