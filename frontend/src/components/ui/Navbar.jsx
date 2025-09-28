// src/components/ui/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import Switch from './Switch';
import TopDrawer from './TopDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faDiscord, faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);
    const donateBtnRef = useRef(null);
    const donateMenuRef = useRef(null);

    const btnRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const closeIfOutside = (e) => {
            if (
                !menuRef.current?.contains(e.target) &&
                !btnRef.current?.contains(e.target) &&
                !donateMenuRef.current?.contains(e.target) &&
                !donateBtnRef.current?.contains(e.target)
            ) {
                setOpen(false);
                setDonateOpen(false);
            }
        };

        document.addEventListener('mousedown', closeIfOutside);
        return () => document.removeEventListener('mousedown', closeIfOutside);
    }, []);

    return (
        <header className="relative z-40 w-full flex items-center py-3 bg-theme text-theme md:border-b border-theme">          
         {/* Hamburger menu (only on small screens) */}
            <div className="absolute right-4 top-1 z-50 md:hidden">
                <TopDrawer />
            </div>
            {/* left-most theme toggle */}
            <div className="relative mr-auto pl-12 hidden md:block">
                <Switch />
            </div>

            {/* Donate button */}
            {/* <div className="relative ml-auto">
                <button
                    ref={donateBtnRef}
                    onClick={() => setDonateOpen(p => !p)}
                    className="ml-auto mr-12 px-4 py-1 rounded-lg font-body cursor-pointer 
                    text-black hover:bg-black hover:text-white 
                    dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 hidden md:block"
                >
                    Donate
                </button>

                {donateOpen && (
                    <div
                        ref={donateMenuRef}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 flex flex-col gap-2 px-4 py-3 rounded-xl 
                    bg-black/10 text-black border border-black/15 
                    dark:bg-white/10 dark:text-white dark:border-white/15 
                    backdrop-blur-md animate-slide-in-v"
                    >
                        <a
                            href="https://buymeacoffee.com/yourname"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faCoffee} className="w-5 h-5" />
                            <span className="text-sm font-body">Coffee</span>
                        </a>

                        <a
                            href="https://patreon.com/yourname"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faPatreon} className="w-5 h-5" />
                            <span className="text-sm font-body">Patreon</span>
                        </a>
                    </div>
                )}
            </div> */}

            {/* Centre nav */}
            <nav
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 cursor-pointer hidden md:flex gap-6 font-body select-none"
            >
                <a
                    href="#"
                    className="px-5 py-1 rounded-lg duration-500 text-theme hover:bg-theme hover:text-theme"
                >
                    Home
                </a>

                {/* Socials */}
                <button
                    ref={btnRef}
                    onClick={() => setOpen((p) => !p)}
                    className="relative cursor-pointer px-4 py-1 rounded-lg duration-500 text-theme hover:bg-theme hover:text-theme"
                >
                    Socials
                    {open && (
                        <div
                            ref={menuRef}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 flex gap-4 px-4 py-2 rounded-xl bg-theme text-theme border border-theme backdrop-blur-md animate-slide-in-h"
                        >
                            {[
                                { icon: faWhatsapp, href: "https://chat.whatsapp.com/Bv1bqqqzKn9ACam4vSL4LR?mode=ems_copy_t" },
                                { icon: faDiscord, href: "https://discord.gg/9zBsDPDQ" },
                                { icon: faInstagram, href: "https://www.instagram.com/papr.site/" },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform duration-200 hover:scale-110"
                                    aria-label={item.icon.iconName}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    )}
                </button>
            </nav>
        </header>
    );
}
