import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WA_LINK = "https://chat.whatsapp.com/Bv1bqqqzKn9ACam4vSL4LR?mode=ems_copy_t";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const isHidden = location.pathname === '/say-hi';

  useEffect(() => {
    const scroller = document.querySelector('.app-frame-scroll');
    if (!scroller) return;

    const onScroll = () => {
      if (scroller.scrollTop > 400) setVisible(true);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  if (!visible || isHidden) return null;

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      title="Study with the community"
      className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-theme font-body text-sm hover:bg-[var(--hover-overlay)] transition-colors duration-200 shadow-lg"
    >
      <i className="fa-brands fa-whatsapp text-green-400 text-base" />
      <span className="hidden sm:inline text-xs">Join community</span>
    </a>
  );
}
