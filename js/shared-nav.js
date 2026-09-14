// shared-nav.js — Injects the global nav/top-bar/mobile-nav into every page
// Called from each HTML page via: <script src="js/shared-nav.js"></script>
// Usage: <div id="site-nav"></div> — place before <main>

(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',          label: 'Overview' },
    { href: 'accommodation.html',  label: 'Accommodation' },
    { href: 'dining.html',         label: 'Dining &amp; Lounges' },
    { href: 'events.html',         label: 'Meetings &amp; Events' },
    { href: 'experiences.html',    label: 'Experiences' },
    { href: 'contact.html',        label: 'Location &amp; Contact' },
  ];

  const navLinks = links.map(l => `
    <a href="${l.href}" class="nav-link${currentPage === l.href ? ' active' : ''}">${l.label}</a>
  `).join('');

  const mobileLinks = links.map(l => `
    <a href="${l.href}" class="mobile-link">${l.label}</a>
  `).join('');

  const html = `
    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-contact">
          <a href="tel:+254748988338">
            <i class="fa fa-phone" style="font-size:11px;color:var(--gold);"></i>
            +254 748 988338
          </a>
          <a href="mailto:info@kinyukicountryhotel.com">
            <i class="fa fa-envelope" style="font-size:11px;color:var(--gold);"></i>
            info@kinyukicountryhotel.com
          </a>
          <a href="contact.html">
            <i class="fa fa-map-marker-alt" style="font-size:11px;color:var(--gold);"></i>
            Nanyuki, Laikipia County, Kenya
          </a>
        </div>
        <div class="top-bar-social">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
          <a href="https://wa.me/254748988338" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="index.html" class="nav-logo" id="nav-logo">
          <img
            src="assets/images/logo.png"
            alt="Kinyuki Country Hotel"
            class="logo-img"
          />
        </a>
        <div class="nav-links" id="nav-links">
          ${navLinks}
          <a href="#" class="nav-link nav-cta" onclick="openBookingModal(); return false;">Reserve Your Stay</a>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- MOBILE NAV -->
    <div class="mobile-nav" id="mobile-nav">
      <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close navigation">&times;</button>
      <div class="mobile-nav-logo">
        <img src="assets/images/logo.png" alt="Kinyuki Country Hotel" />
      </div>
      ${mobileLinks}
      <a href="#" class="btn btn-gold mobile-cta" onclick="openBookingModal(); return false;">Reserve Your Stay</a>
    </div>
  `;

  const target = document.getElementById('site-nav');
  if (target) target.innerHTML = html;
})();
