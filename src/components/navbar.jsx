import { useState } from "react";
import "../styles/navbar.css";

const navLinks = [
  {
    label: "Home",
    href: "/",
    children: ["Overview", "Travel Booking", "Popular Tours"],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: ["Africa", "Asia", "Europe", "Middle East", "North America", "Oceania"],
  },
  {
    label: "Travel Package",
    href: "/packages",
    children: ["Adventure Tours", "Honeymoon", "Holiday Packages", "Desert Safari"],
  },
  {
    label: "Visa",
    href: "/visa",
    children: ["Visa Processing", "Health & Safety", "Travel Documents"],
  },
  {
    label: "Pages",
    href: "/pages",
    children: ["About GoFly", "Inspirations", "Reviews", "Sitemap"],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [],
  },
];

function NavItem({ link, isActive, onToggle }) {
  return (
    <li className={`sidebar-nav-item${isActive ? " open" : ""}`}>
      <div className="sidebar-nav-row">
        <a className="sidebar-nav-link" href={link.href}>
          {link.label}
        </a>
        {link.children.length > 0 && (
          <button
            className="sidebar-nav-toggle"
            type="button"
            aria-label={isActive ? `Collapse ${link.label}` : `Expand ${link.label}`}
            aria-expanded={isActive}
            onClick={onToggle}
          >
            {isActive ? "−" : "+"}
          </button>
        )}
      </div>
      {isActive && link.children.length > 0 && (
        <ul className="sidebar-subnav">
          {link.children.map((child) => (
            <li key={child}>
              <a href={`${link.href}/${child.toLowerCase().replace(/\s+/g, "-")}`}>
                {child}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function DesktopDropdown({ link }) {
  const [open, setOpen] = useState(false);
  if (link.children.length === 0) {
    return (
      <li className="desktop-nav-item">
        <a className="desktop-nav-link" href={link.href}>{link.label}</a>
      </li>
    );
  }
  return (
    <li
      className={`desktop-nav-item desktop-has-dropdown${open ? " open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a className="desktop-nav-link" href={link.href}>
        {link.label}
        <span className="desktop-nav-arrow" aria-hidden="true" />
      </a>
      {open && (
        <ul className="desktop-dropdown">
          {link.children.map((child) => (
            <li key={child}>
              <a href={`${link.href}/${child.toLowerCase().replace(/\s+/g, "-")}`}>
                {child}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [waOpen, setWaOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
    setOpenIndex(null);
  }

  function toggleNav(index) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <>
      {/* ── Desktop header (≥1024px) ── */}
      <header className="site-header">
        {/* Top bar */}
        <div className="header-top">
          <a className="brand" href="/" aria-label="GoFLY Travel home">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-globe">+</span>
              <span className="brand-mark-lines" />
            </span>
            <span className="brand-copy">
              <strong>GoFLY</strong>
              <small>Travel.co</small>
            </span>
          </a>

          {/* Search — desktop only */}
          <form className="header-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <span className="header-search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Find Your Perfect Tour Package"
              aria-label="Search tours"
            />
          </form>

          {/* Right actions */}
          <div className="header-right">
            {/* Need Help — desktop only */}
            <span className="need-help desktop-only">Need Help?</span>

            {/* Language */}
            <button className="language-select" type="button" aria-label="Select language">
              <span className="globe-icon" aria-hidden="true">&#8853;</span>
              <span>EN</span>
              <span className="chevron" aria-hidden="true" />
            </button>

            {/* Login — desktop */}
            <a className="login-link desktop-only" href="/login">
              <span aria-hidden="true">▲</span> Login
            </a>

            {/* Mobile/tablet controls */}
            <button className="icon-button search-button mobile-only" type="button" aria-label="Search">
              <span className="search-icon" aria-hidden="true" />
            </button>
            <button
              className="icon-button menu-button mobile-only"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="menu-icon" aria-hidden="true">
                <i /><i /><i />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom nav bar — desktop only */}
        <div className="header-bottom desktop-only">
          <nav aria-label="Main navigation">
            <ul className="desktop-nav">
              {navLinks.map((link) => (
                <DesktopDropdown key={link.label} link={link} />
              ))}
            </ul>
          </nav>

          {/* WhatsApp pill */}
          <div className="desktop-whatsapp">
            <button
              className={`whatsapp-pill${waOpen ? " open" : ""}`}
              type="button"
              onClick={() => setWaOpen((p) => !p)}
              aria-expanded={waOpen}
            >
              <span className="wa-icon" aria-hidden="true">◉</span>
              <span className="wa-text">
                <small>WhatsApp</small>
                <strong>+91 345 533 865</strong>
              </span>
              <span className="wa-arrow" aria-hidden="true">{waOpen ? "▴" : "▾"}</span>
            </button>
            {waOpen && (
              <ul className="wa-dropdown wa-dropdown--up">
                <li>
                  <a href="https://wa.me/91345533865" target="_blank" rel="noreferrer">
                    <span className="wa-contact-icon wa-green">◉</span>
                    <span className="wa-contact-text"><small>WhatsApp</small><strong>+91 345 533 865</strong></span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@example.com">
                    <span className="wa-contact-icon wa-mail">✉</span>
                    <span className="wa-contact-text"><small>Mail Support</small><strong>info@example.com</strong></span>
                  </a>
                </li>
                <li>
                  <a href="tel:+91345533865">
                    <span className="wa-contact-icon wa-red">▶</span>
                    <span className="wa-contact-text"><small>More Inquiry</small><strong>+91 345 533 865</strong></span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* ── Sidebar overlay ── */}
      {menuOpen && (
        <div className="sidebar-overlay" onClick={toggleMenu} aria-hidden="true" />
      )}

      {/* ── Sidebar (mobile/tablet) ── */}
      <aside className={`sidebar${menuOpen ? " sidebar--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="sidebar-header">
          <a className="brand" href="/" aria-label="GoFLY Travel home" onClick={toggleMenu}>
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-globe">+</span>
              <span className="brand-mark-lines" />
            </span>
            <span className="brand-copy">
              <strong>GoFLY</strong>
              <small>Travel.co</small>
            </span>
          </a>
          <button className="sidebar-close" type="button" aria-label="Close menu" onClick={toggleMenu}>
            ×
          </button>
        </div>

        <nav aria-label="Sidebar navigation">
          <ul className="sidebar-nav">
            {navLinks.map((link, index) => (
              <NavItem
                key={link.label}
                link={link}
                isActive={openIndex === index}
                onToggle={() => toggleNav(index)}
              />
            ))}
          </ul>
        </nav>

        {/* Contact Dropdown */}
        <div className="sidebar-whatsapp">
          <button
            className={`whatsapp-pill${waOpen ? " open" : ""}`}
            type="button"
            onClick={() => setWaOpen((prev) => !prev)}
            aria-expanded={waOpen}
          >
            <span className="wa-icon" aria-hidden="true">◉</span>
            <span className="wa-text">
              <small>WhatsApp</small>
              <strong>+91 345 533 865</strong>
            </span>
            <span className="wa-arrow" aria-hidden="true">{waOpen ? "▴" : "▾"}</span>
          </button>
          {waOpen && (
            <ul className="wa-dropdown">
              <li>
                <a href="https://wa.me/91345533865" target="_blank" rel="noreferrer">
                  <span className="wa-contact-icon wa-green">◉</span>
                  <span className="wa-contact-text"><small>WhatsApp</small><strong>+91 345 533 865</strong></span>
                </a>
              </li>
              <li>
                <a href="mailto:info@example.com">
                  <span className="wa-contact-icon wa-mail">✉</span>
                  <span className="wa-contact-text"><small>Mail Support</small><strong>info@example.com</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:+91345533865">
                  <span className="wa-contact-icon wa-red">▶</span>
                  <span className="wa-contact-text"><small>More Inquiry</small><strong>+91 345 533 865</strong></span>
                </a>
              </li>
            </ul>
          )}
        </div>

        <div className="sidebar-footer">
          <a className="sidebar-login" href="/login">
            <span aria-hidden="true">▲</span> Login
          </a>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
