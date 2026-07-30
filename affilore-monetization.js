/**
 * ============================================================
 *  AFFILORE.COM — B2B Monetization Layer
 *  Self-contained injection module (no dependencies)
 * ============================================================
 *
 *  Injects:
 *    1. Global Announcement Bar  — above <header>, all pages
 *    2. Sticky Conversion Footer — tool pages only
 *
 *  Include via: <script src="/affilore-monetization.js"></script>
 * ============================================================
 */
(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────
  var STORAGE_KEY_BAR   = 'aff_announce_dismissed';
  var STORAGE_KEY_CTA   = 'aff_cta_dismissed';
  var BAR_HEIGHT_DESKTOP = 48;   // px – used for CLS reservation
  var BAR_HEIGHT_MOBILE  = 68;   // px – wraps to two lines on small screens

  var SERVICES_URL     = '/services';
  var CUSTOM_BUILD_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com&su=Custom+Build+Request+%28%24499%2B%29&body=Hi+Affilore+team%2C%0A%0AI%27m+interested+in+a+custom+build.+Here%27s+what+I+need%3A%0A%0A';
  var STRATEGY_CALL_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com&su=15-Min+Strategy+Call+Request&body=Hi+Affilore+team%2C%0A%0AI%27d+like+to+book+a+15-minute+strategy+call.+Here%27s+a+brief+overview+of+my+project%3A%0A%0A';

  // ── Tool page detection ────────────────────────────────────
  var TOOL_DIRS = ['/developer/', '/productivity/', '/calculator/', '/data/', '/seo/', '/utility/'];
  var path = window.location.pathname;
  var isToolPage = TOOL_DIRS.some(function (dir) {
    return path.indexOf(dir) !== -1 && !path.endsWith('/index.html') && path !== dir;
  });

  // ── Check dismissal state ──────────────────────────────────
  var barDismissed = sessionStorage.getItem(STORAGE_KEY_BAR) === '1';
  var ctaDismissed = sessionStorage.getItem(STORAGE_KEY_CTA) === '1';

  // ── Inject global styles ──────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.id = 'aff-monetization-css';
  styleEl.textContent = [
    '/* ─── CLS RESERVATION ─── */',
    'html.aff-bar-reserving {',
    '  padding-top: ' + BAR_HEIGHT_DESKTOP + 'px !important;',
    '}',
    '@media (max-width: 640px) {',
    '  html.aff-bar-reserving {',
    '    padding-top: ' + BAR_HEIGHT_MOBILE + 'px !important;',
    '  }',
    '}',
    '',
    '/* ─── ANNOUNCEMENT BAR ─── */',
    '.aff-announce {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  right: 0;',
    '  z-index: 9999;',
    '  height: ' + BAR_HEIGHT_DESKTOP + 'px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 10px;',
    '  padding: 0 48px 0 16px;',
    '  background: #000000;',
    '  border-bottom: 2px solid;',
    '  border-image: linear-gradient(90deg, #7C3AED, #6366F1, #818CF8, #6366F1, #7C3AED) 1;',
    '  font-family: "Sora", "Inter", system-ui, sans-serif;',
    '  opacity: 0;',
    '  transform: translateY(-100%);',
    '  animation: affSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;',
    '}',
    '@keyframes affSlideIn {',
    '  to { opacity: 1; transform: translateY(0); }',
    '}',
    '@media (max-width: 640px) {',
    '  .aff-announce {',
    '    height: ' + BAR_HEIGHT_MOBILE + 'px;',
    '    flex-wrap: wrap;',
    '    padding: 8px 36px 8px 12px;',
    '    gap: 6px;',
    '    text-align: center;',
    '    justify-content: center;',
    '  }',
    '}',
    '',
    '.aff-announce-badge {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  padding: 3px 10px;',
    '  border-radius: 9999px;',
    '  font-size: 10px;',
    '  font-weight: 800;',
    '  letter-spacing: 0.1em;',
    '  text-transform: uppercase;',
    '  color: #ffffff;',
    '  background: linear-gradient(135deg, #7C3AED, #6366F1);',
    '  box-shadow: 0 0 12px rgba(124, 58, 237, 0.5), 0 0 4px rgba(99, 102, 241, 0.3);',
    '  animation: affBadgePulse 2.5s ease-in-out infinite;',
    '  flex-shrink: 0;',
    '}',
    '@keyframes affBadgePulse {',
    '  0%, 100% { box-shadow: 0 0 12px rgba(124, 58, 237, 0.5), 0 0 4px rgba(99, 102, 241, 0.3); }',
    '  50% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.7), 0 0 8px rgba(99, 102, 241, 0.5); }',
    '}',
    '',
    '.aff-announce-text {',
    '  font-size: 13px;',
    '  font-weight: 500;',
    '  color: rgba(255, 255, 255, 0.82);',
    '  line-height: 1.3;',
    '}',
    '@media (max-width: 640px) {',
    '  .aff-announce-text {',
    '    font-size: 11.5px;',
    '  }',
    '}',
    '',
    '.aff-announce-link {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 4px;',
    '  font-size: 13px;',
    '  font-weight: 700;',
    '  color: #A78BFA;',
    '  text-decoration: none;',
    '  white-space: nowrap;',
    '  transition: color 0.2s ease, text-shadow 0.2s ease;',
    '}',
    '.aff-announce-link:hover {',
    '  color: #C4B5FD;',
    '  text-shadow: 0 0 12px rgba(167, 139, 250, 0.5);',
    '}',
    '@media (max-width: 640px) {',
    '  .aff-announce-link {',
    '    font-size: 12px;',
    '  }',
    '}',
    '',
    '.aff-announce-close {',
    '  position: absolute;',
    '  right: 12px;',
    '  top: 50%;',
    '  transform: translateY(-50%);',
    '  background: rgba(255, 255, 255, 0.06);',
    '  border: 1px solid rgba(255, 255, 255, 0.1);',
    '  border-radius: 6px;',
    '  color: rgba(255, 255, 255, 0.45);',
    '  width: 26px;',
    '  height: 26px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  cursor: pointer;',
    '  font-size: 14px;',
    '  line-height: 1;',
    '  transition: all 0.2s ease;',
    '  padding: 0;',
    '  font-family: system-ui, sans-serif;',
    '}',
    '.aff-announce-close:hover {',
    '  background: rgba(255, 255, 255, 0.12);',
    '  color: rgba(255, 255, 255, 0.8);',
    '  border-color: rgba(255, 255, 255, 0.2);',
    '}',
    '@media (max-width: 640px) {',
    '  .aff-announce-close {',
    '    right: 6px;',
    '    top: 6px;',
    '    transform: none;',
    '    width: 24px;',
    '    height: 24px;',
    '    font-size: 12px;',
    '  }',
    '}',
    '',
    '/* Push sticky header down when bar is visible */',
    'html.aff-bar-active .site-header,',
    'html.aff-bar-active header[class*="sticky"][class*="top-0"] {',
    '  top: ' + BAR_HEIGHT_DESKTOP + 'px !important;',
    '}',
    '@media (max-width: 640px) {',
    '  html.aff-bar-active .site-header,',
    '  html.aff-bar-active header[class*="sticky"][class*="top-0"] {',
    '    top: ' + BAR_HEIGHT_MOBILE + 'px !important;',
    '  }',
    '}',
    '',
    '/* ─── STICKY CONVERSION FOOTER ─── */',
    '.aff-cta-footer {',
    '  position: fixed;',
    '  bottom: 0;',
    '  left: 0;',
    '  right: 0;',
    '  z-index: 9998;',
    '  padding: 0;',
    '  pointer-events: none;',
    '  display: flex;',
    '  justify-content: center;',
    '  opacity: 0;',
    '  transform: translateY(100%);',
    '  animation: affCtaSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards;',
    '}',
    '@keyframes affCtaSlideUp {',
    '  to { opacity: 1; transform: translateY(0); pointer-events: auto; }',
    '}',
    '.aff-cta-footer.aff-cta-hidden {',
    '  opacity: 0 !important;',
    '  transform: translateY(100%) !important;',
    '  pointer-events: none !important;',
    '  transition: opacity 0.4s ease, transform 0.4s ease;',
    '}',
    '.aff-cta-footer.aff-cta-visible {',
    '  pointer-events: auto;',
    '}',
    '',
    '.aff-cta-card {',
    '  width: 100%;',
    '  max-width: 880px;',
    '  margin: 0 16px 10px;',
    '  padding: 10px 18px;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 16px;',
    '  background: #000000;',
    '  border: 1px solid rgba(124, 58, 237, 0.35);',
    '  border-radius: 12px;',
    '  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.7), 0 0 16px rgba(124, 58, 237, 0.15);',
    '  font-family: "Sora", "Inter", system-ui, sans-serif;',
    '  position: relative;',
    '  overflow: hidden;',
    '}',
    '/* Purple accent glow on left */',
    '.aff-cta-card::before {',
    '  content: "";',
    '  position: absolute;',
    '  top: 0;',
    '  left: 0;',
    '  width: 4px;',
    '  height: 100%;',
    '  background: linear-gradient(180deg, #7C3AED, #6366F1, #818CF8);',
    '  border-radius: 12px 0 0 12px;',
    '}',
    '/* Ambient glow */',
    '.aff-cta-card::after {',
    '  content: "";',
    '  position: absolute;',
    '  top: -50%;',
    '  left: -10%;',
    '  width: 50%;',
    '  height: 200%;',
    '  background: radial-gradient(ellipse, rgba(124, 58, 237, 0.08), transparent 70%);',
    '  pointer-events: none;',
    '}',
    '',
    '@media (max-width: 768px) {',
    '  .aff-cta-card {',
    '    flex-direction: column;',
    '    align-items: stretch;',
    '    gap: 10px;',
    '    padding: 12px 14px;',
    '    margin: 0 8px 8px;',
    '    text-align: center;',
    '  }',
    '}',
    '',
    '.aff-cta-text {',
    '  flex: 1;',
    '  font-size: 13px;',
    '  font-weight: 500;',
    '  color: rgba(255, 255, 255, 0.9);',
    '  line-height: 1.35;',
    '  position: relative;',
    '  z-index: 1;',
    '}',
    '@media (max-width: 768px) {',
    '  .aff-cta-text {',
    '    font-size: 12px;',
    '  }',
    '}',
    '',
    '.aff-cta-actions {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 8px;',
    '  flex-shrink: 0;',
    '  position: relative;',
    '  z-index: 1;',
    '}',
    '@media (max-width: 768px) {',
    '  .aff-cta-actions {',
    '    flex-direction: column;',
    '    gap: 6px;',
    '  }',
    '}',
    '',
    '.aff-cta-btn-primary {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 5px;',
    '  padding: 8px 18px;',
    '  border-radius: 9999px;',
    '  font-size: 12.5px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.01em;',
    '  color: #ffffff;',
    '  background: linear-gradient(135deg, #7C3AED, #6366F1);',
    '  border: none;',
    '  cursor: pointer;',
    '  text-decoration: none;',
    '  white-space: nowrap;',
    '  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);',
    '  box-shadow: 0 2px 10px rgba(124, 58, 237, 0.35);',
    '}',
    '.aff-cta-btn-primary:hover {',
    '  transform: translateY(-1px) scale(1.02);',
    '  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.55), 0 0 10px rgba(99, 102, 241, 0.3);',
    '  background: linear-gradient(135deg, #8B5CF6, #818CF8);',
    '}',
    '@media (max-width: 768px) {',
    '  .aff-cta-btn-primary {',
    '    width: 100%;',
    '    padding: 10px 16px;',
    '  }',
    '}',
    '',
    '.aff-cta-btn-secondary {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 5px;',
    '  padding: 7px 16px;',
    '  border-radius: 9999px;',
    '  font-size: 12.5px;',
    '  font-weight: 600;',
    '  color: #A78BFA;',
    '  background: rgba(124, 58, 237, 0.1);',
    '  border: 1px solid rgba(124, 58, 237, 0.35);',
    '  cursor: pointer;',
    '  text-decoration: none;',
    '  white-space: nowrap;',
    '  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '.aff-cta-btn-secondary:hover {',
    '  background: rgba(124, 58, 237, 0.2);',
    '  border-color: rgba(124, 58, 237, 0.6);',
    '  color: #C4B5FD;',
    '  transform: translateY(-1px);',
    '  box-shadow: 0 2px 14px rgba(124, 58, 237, 0.25);',
    '}',
    '@media (max-width: 768px) {',
    '  .aff-cta-btn-secondary {',
    '    width: 100%;',
    '    padding: 9px 16px;',
    '  }',
    '}',
    '',
    '.aff-cta-close {',
    '  position: absolute;',
    '  top: 8px;',
    '  right: 10px;',
    '  background: rgba(255, 255, 255, 0.06);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  border-radius: 6px;',
    '  color: rgba(255, 255, 255, 0.35);',
    '  width: 22px;',
    '  height: 22px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  cursor: pointer;',
    '  font-size: 11px;',
    '  line-height: 1;',
    '  transition: all 0.2s ease;',
    '  padding: 0;',
    '  font-family: system-ui, sans-serif;',
    '  z-index: 2;',
    '}',
    '.aff-cta-close:hover {',
    '  background: rgba(255, 255, 255, 0.12);',
    '  color: rgba(255, 255, 255, 0.7);',
    '}'
  ].join('\n');

  // Inject styles synchronously into <head> before DOM renders
  (document.head || document.documentElement).appendChild(styleEl);

  // ── CLS Reservation ────────────────────────────────────────
  if (!barDismissed) {
    document.documentElement.classList.add('aff-bar-reserving');
  }

  // ── DOM Ready Helper ───────────────────────────────────────
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // ── Inject Announcement Bar ────────────────────────────────
  function injectAnnouncementBar() {
    if (barDismissed) return;

    var bar = document.createElement('div');
    bar.className = 'aff-announce';
    bar.id = 'aff-announcement-bar';
    bar.setAttribute('role', 'banner');
    bar.innerHTML =
      '<span class="aff-announce-badge">NEW</span>' +
      '<span class="aff-announce-text">Need a custom client-side web utility, internal dashboard, or MVP built in 48 hours?</span>' +
      '<a href="' + SERVICES_URL + '" class="aff-announce-link">See Sprint Packages <span style="display:inline-block;transition:transform 0.2s ease;">&#8594;</span></a>' +
      '<button class="aff-announce-close" aria-label="Dismiss announcement" type="button">&#10005;</button>';

    // Insert as first child of body
    document.body.insertBefore(bar, document.body.firstChild);

    // Activate header push-down
    document.documentElement.classList.add('aff-bar-active');
    // Remove CLS reservation now that the bar is rendered
    document.documentElement.classList.remove('aff-bar-reserving');

    // Dismiss handler
    var closeBtn = bar.querySelector('.aff-announce-close');
    closeBtn.addEventListener('click', function () {
      bar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      bar.style.opacity = '0';
      bar.style.transform = 'translateY(-100%)';
      setTimeout(function () {
        bar.remove();
        document.documentElement.classList.remove('aff-bar-active');
        sessionStorage.setItem(STORAGE_KEY_BAR, '1');
      }, 300);
    });

    // Hover effect on link arrow
    var link = bar.querySelector('.aff-announce-link');
    var arrow = link.querySelector('span');
    link.addEventListener('mouseenter', function () {
      arrow.style.transform = 'translateX(3px)';
    });
    link.addEventListener('mouseleave', function () {
      arrow.style.transform = 'translateX(0)';
    });
  }

  // ── Inject Conversion Footer ───────────────────────────────
  function injectConversionFooter() {
    if (!isToolPage || ctaDismissed) return;

    var footer = document.createElement('div');
    footer.className = 'aff-cta-footer';
    footer.id = 'aff-cta-footer';
    footer.setAttribute('role', 'complementary');
    footer.setAttribute('aria-label', 'Custom build offer');
    footer.innerHTML =
      '<div class="aff-cta-card">' +
        '<p class="aff-cta-text">Need this tool customized for your enterprise stack or internal team?</p>' +
        '<div class="aff-cta-actions">' +
          '<a href="' + CUSTOM_BUILD_URL + '" target="_blank" rel="noopener noreferrer" class="aff-cta-btn-primary">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' +
            'Get a Custom Build ($499+)' +
          '</a>' +
          '<a href="' + STRATEGY_CALL_URL + '" target="_blank" rel="noopener noreferrer" class="aff-cta-btn-secondary">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
            'Book 15-Min Strategy Call' +
          '</a>' +
        '</div>' +
        '<button class="aff-cta-close" aria-label="Dismiss offer" type="button">&#10005;</button>' +
      '</div>';

    document.body.appendChild(footer);

    // Close handler
    var closeBtn = footer.querySelector('.aff-cta-close');
    closeBtn.addEventListener('click', function () {
      footer.classList.add('aff-cta-hidden');
      sessionStorage.setItem(STORAGE_KEY_CTA, '1');
      setTimeout(function () { footer.remove(); }, 400);
    });

    // Auto-hide when page footer is visible (prevent overlap)
    var pageFooter = document.querySelector('footer');
    if (pageFooter && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            footer.classList.add('aff-cta-hidden');
          } else {
            if (sessionStorage.getItem(STORAGE_KEY_CTA) !== '1') {
              footer.classList.remove('aff-cta-hidden');
            }
          }
        });
      }, { threshold: 0.1 });
      observer.observe(pageFooter);
    }

    // Add class for animation after insert
    requestAnimationFrame(function () {
      footer.classList.add('aff-cta-visible');
    });
  }

  // ── Initialize ─────────────────────────────────────────────
  onReady(function () {
    injectAnnouncementBar();
    injectConversionFooter();
  });

})();
