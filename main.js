/* ============================================
   AFFILORE.COM — Main JavaScript
   Fully static — no backend, no API keys
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger to X
      navToggle.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }


  // ===== SCROLL-TRIGGERED ANIMATIONS =====
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }


  // ===== STAGGERED CARD ANIMATIONS =====
  const cards = document.querySelectorAll('.card, .best-list-item');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 80}ms`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.animationDelay || '0ms';
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, parseInt(delay));
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));


  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.92)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      } else {
        header.style.background = 'rgba(10, 10, 15, 0.75)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }


  // ===== SIDEBAR TOC ACTIVE STATE =====
  const tocLinks = document.querySelectorAll('.sidebar-toc a');

  if (tocLinks.length > 0) {
    const sections = [];
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = document.getElementById(href.substring(1));
        if (section) {
          sections.push({ link, section });
        }
      }
    });

    if (sections.length > 0) {
      window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 120;

        let currentSection = sections[0];
        sections.forEach(item => {
          if (item.section.offsetTop <= scrollPos) {
            currentSection = item;
          }
        });

        tocLinks.forEach(link => link.classList.remove('active'));
        if (currentSection) {
          currentSection.link.classList.add('active');
        }
      }, { passive: true });
    }
  }


  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')?.offsetHeight || 72;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ===== SCORE BAR ANIMATION =====
  const scoreBars = document.querySelectorAll('.score-bar-fill, .rating-bar-fill');

  if (scoreBars.length > 0) {
    // Store the target widths and set to 0 initially
    scoreBars.forEach(bar => {
      bar.dataset.targetWidth = bar.style.width;
      bar.style.width = '0%';
    });

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.score-bar-fill, .rating-bar-fill');
          bars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
              bar.style.width = bar.dataset.targetWidth;
            }, index * 100);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Observe the parent containers
    document.querySelectorAll('.score-bar-group, .rating-breakdown').forEach(group => {
      barObserver.observe(group);
    });
  }


  // ===== VIDEO PLACEHOLDER INTERACTION =====
  const videoPlaceholder = document.getElementById('video-placeholder');

  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
      // Replace with actual video embed
      // For demo, show a message — in production, insert your YouTube iframe here
      const container = videoPlaceholder.parentElement;
      const videoId = 'dQw4w9WgXcQ'; // Replace with your actual YouTube ID

      container.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;">
        </iframe>
      `;
    });
  }


  // ===== NEWSLETTER FORM (STATIC DEMO) =====
  const newsletterForm = document.querySelector('.cta-banner__form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const submitBtn = document.getElementById('newsletter-submit');

      if (emailInput && emailInput.value) {
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.style.background = 'var(--color-success)';
        submitBtn.style.color = '#fff';
        emailInput.value = '';
        emailInput.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = 'Subscribe';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          emailInput.disabled = false;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

});
