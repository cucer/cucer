'use client';

import { useState } from 'react';
import Image from 'next/image';
import SocialNav from './SocialNav';

function LogoSigil() {
  return (
    <div className="logo-sigil">
      <Image
        src="/assets/logo.webp"
        alt="Cagatay Ucer logo"
        width={500}
        height={500}
        priority
      />
    </div>
  );
}

export default function SiteHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header>
        <div className="header-mobile">
          <LogoSigil />
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <div className="header-desktop">
          <LogoSigil />
        </div>
      </header>

      <aside
        className={`mobile-sidebar${isSidebarOpen ? ' open' : ''}`}
        aria-hidden={!isSidebarOpen}
      >
        <div className="placeholder-bar"></div>
        <div className="sidebar-header">
          <button
            className="close-btn"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="ex-line"></div>
            <div className="ex-line"></div>
          </button>
        </div>
        <SocialNav onNavigate={() => setSidebarOpen(false)} />
      </aside>
    </>
  );
}
