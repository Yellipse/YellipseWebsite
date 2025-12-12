import React, { useState, useEffect } from 'react';
import logo from '../assets/YellipseLogo-LONG.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products'];

      // Default to home
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (or close to top)
          // Using 150px offset to trigger change a bit earlier
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break; // found the topmost visible section
          }
        }
      }

      setActiveTab(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`glass-navbar ${isOpen ? 'nav-open' : ''}`}>
        <div className="logo-container">
          {activeTab === 'home' ? (
            <img src={logo} alt="Yellipse Logo" className="navbar-logo" />
          ) : (
            <span className="navbar-section-name">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          <a
            href="#home"
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            Home
          </a>
          <a
            href="#products"
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
          >
            Products
          </a>
        </div>
        <div className="nav-actions desktop-only">
          <button className="glass-button">Get Started</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-links">
            <a
              href="#home"
              className={`sidebar-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            >
              Home
            </a>
            <a
              href="#products"
              className={`sidebar-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
            >
              Products
            </a>
          </div>
          <div className="sidebar-actions">
            <button className="glass-button full-width">Get Started</button>
          </div>
        </div>
      </div>

      {/* Overlay for closing sidebar */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
