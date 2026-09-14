// ============================================
// KINYUKI COUNTRY HOTEL — MAIN JAVASCRIPT
// Refurbished: Page transitions, no emojis
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initStickyDate();
  initStickyCTA();
  applyPageEntrance();
});

// ── Page Entrance (on every load) ──────────
function applyPageEntrance() {
  document.body.classList.add('page-body');
}

// ── Page Transition System ─────────────────
function initPageTransitions() {
  // Create progress bar + veil elements
  const bar = document.createElement('div');
  bar.className = 'page-transition-bar';
  bar.id = 'pt-bar';
  document.body.appendChild(bar);

  const veil = document.createElement('div');
  veil.className = 'page-veil';
  veil.id = 'pt-veil';
  document.body.appendChild(veil);

  // Intercept all internal page navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip: anchors, external, modals, tel, mailto
    if (
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank' ||
      link.getAttribute('onclick')
    ) return;

    // Internal page link — animate transition
    e.preventDefault();
    navigateTo(href);
  });
}

function navigateTo(href) {
  const bar  = document.getElementById('pt-bar');
  const veil = document.getElementById('pt-veil');

  // Animate bar to 70%
  if (bar) {
    bar.style.width = '70%';
    bar.style.opacity = '1';
    bar.style.transition = 'width 0.4s ease, opacity 0.3s ease';
  }

  // Fade veil in
  if (veil) {
    veil.style.opacity = '1';
    veil.style.pointerEvents = 'all';
    veil.style.transition = 'opacity 0.32s ease';
  }

  // Navigate after short delay
  setTimeout(() => {
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      window.location.href = href;
    }, 120);
  }, 340);
}

// ── Navbar Scroll Effect ──────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 70) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Mobile Nav ────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn  = document.getElementById('mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
}

// ── Scroll Reveal ─────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.11 }
  );
  reveals.forEach(el => observer.observe(el));
}

// ── Default dates ─────────────────────────
function initStickyDate() {
  const today    = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const next3    = new Date(today); next3.setDate(today.getDate() + 3);
  const fmt = (d) => d.toISOString().split('T')[0];

  const setVal = (id, val, min) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (min) el.min = min;
    if (!el.value) el.value = val;
  };
  setVal('checkin',   fmt(tomorrow), fmt(today));
  setVal('checkout',  fmt(next3),    fmt(tomorrow));
  setVal('b-checkin', fmt(tomorrow), fmt(today));
  setVal('b-checkout',fmt(next3),    fmt(tomorrow));
  setVal('r-date',    '',            fmt(today));
}

// ── Sticky CTA ────────────────────────────
function initStickyCTA() {
  const el = document.getElementById('sticky-cta');
  if (!el) return;
  window.addEventListener('scroll', () => {
    el.style.display = window.scrollY > 550 ? 'block' : 'none';
  }, { passive: true });
}

// ── Room Tabs ─────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId)?.classList.add('active');
  document.querySelectorAll('.room-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + tabId);
  if (panel) {
    panel.classList.add('active');
    panel.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }
}

// ── Gallery Filters ───────────────────────
function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const cat = item.dataset.category;
    if (category === 'all' || cat === category) {
      item.style.display = '';
      requestAnimationFrame(() => { item.style.opacity = '1'; });
    } else {
      item.style.opacity = '0';
      setTimeout(() => {
        if (item.style.opacity === '0') item.style.display = 'none';
      }, 300);
    }
  });
}

// ── Modals ────────────────────────────────
function openBookingModal() {
  const m = document.getElementById('booking-modal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeBookingModal() {
  const m = document.getElementById('booking-modal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function openRFQModal() {
  const m = document.getElementById('rfq-modal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeRFQModal() {
  const m = document.getElementById('rfq-modal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-overlay.open').forEach(m => {
    m.classList.remove('open');
    document.body.style.overflow = '';
  });
  const mn = document.getElementById('mobile-nav');
  if (mn?.classList.contains('open')) {
    mn.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Form Submissions ──────────────────────
function submitBooking(event) {
  event.preventDefault();
  const btn = document.getElementById('booking-submit-btn');
  if (!btn) return;
  btn.textContent = 'Sending your enquiry...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enquiry sent. We will respond within 24 hours.';
    btn.style.background = 'linear-gradient(135deg, #2d7a2d, #3a9a3a)';
    btn.style.color = '#fff';
    setTimeout(() => {
      closeBookingModal();
      btn.textContent = 'Send Reservation Enquiry';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      document.getElementById('booking-form')?.reset();
      showToast('Reservation enquiry received. Our team will contact you within 24 hours.');
    }, 2600);
  }, 1500);
}

function submitRFQ(event) {
  event.preventDefault();
  const btn = document.getElementById('rfq-submit-btn');
  if (!btn) return;
  btn.textContent = 'Submitting your request...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Request submitted. Our events team will respond within 24 hours.';
    btn.style.background = 'linear-gradient(135deg, #2d7a2d, #3a9a3a)';
    btn.style.color = '#fff';
    setTimeout(() => {
      closeRFQModal();
      btn.textContent = 'Submit Request for Quote';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      document.getElementById('rfq-form')?.reset();
      showToast('RFQ received. Our events team will be in touch shortly.');
    }, 2600);
  }, 1500);
}

function submitContactForm(event) {
  event.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  if (!btn) return;
  btn.textContent = 'Sending your message...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message sent. We will respond soon.';
    btn.style.background = 'linear-gradient(135deg, #2d7a2d, #3a9a3a)';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      document.getElementById('contact-form')?.reset();
      showToast('Message received. We will get back to you shortly.');
    }, 2600);
  }, 1500);
}

// ── Toast Notification ────────────────────
function showToast(message) {
  const existing = document.getElementById('kch-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'kch-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #380B11, #4A121A)',
    color: '#FBF9F5',
    padding: '15px 30px',
    borderRadius: '100px',
    fontSize: '13.5px',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: '0 12px 40px rgba(56,11,17,0.38)',
    zIndex: '9999',
    border: '1px solid rgba(212,175,55,0.28)',
    whiteSpace: 'nowrap',
    animation: 'fadeUp 0.4s ease both',
    maxWidth: '90vw',
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}
