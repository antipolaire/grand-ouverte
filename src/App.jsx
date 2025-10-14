import React, { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import {  Music, Calendar, Menu, X, Play, ShoppingCart } from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaBandcamp as Bandcamp } from "react-icons/fa";

/**
 * GRAND OUVERTE – Enhanced One-Pager (Premium UI/UX Edition)
 * - Professional polish with modern effects
 * - Sophisticated animations and transitions
 * - Glassmorphism and gradient effects
 * - Enhanced micro-interactions
 * - Smooth scroll reveals
 * - Premium card designs
 */

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 6);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const albums = useMemo(
        () => [
            {
                id: 1,
                title: "Liebesspieler",
                members:
                    "Marcel Wache · Thomas Adler · Erik · David",
                description:
                    "Rohe Energie trifft auf emotionale Tiefe",
                cover:
                    "images/album_1.png",
                coverWebP:
                    "images/album_1.webp",
                vinylColor: "hsl(355, 64%, 48%)",
            },
            {
                id: 2,
                title: "Nächtliche Fluchten",
                members:
                    "Marcel Wache · Thomas Adler · Erik · David",
                description:
                    "Übernatürlicher Abstieg in den Abgrund – unerbittliche Schwere, hypnotische Melancholie.",
                cover:
                    "images/album_2.png",
                coverWebP:
                    "images/album_2.webp",
                vinylColor: "hsl(130, 42%, 84%)",
            },
        ],
        []
    );

    const events = useMemo(
        () => [
            {
                date: "February 10, 2026",
                venue: "Ost-Pol, Dresden",
                location: "Rothenburger Str. 15, 01099 Dresden",
                url: "#tickets-bataclan",
            },
            {
                date: "April 7, 2026",
                venue: "Alter Schlachthof, Dresden",
                location: "Kesselsdorfer Str. 29, 01159 Dresden",
                url: "#tickets-olympia",
            },
            {
                date: "June 18, 2026",
                venue: "Olympiastadion, Berlin",
                location: "Olympischer Platz 3, 14053 Berlin",
                url: "#tickets-trianon",
            },
        ],
        []
    );

    return (
        <div className="app">

            <a href="#main" className="skip">Skip to content</a>

            {/* ----- Header / Nav ----- */}
            <header className={"site-header" + (scrolled ? " scrolled" : "")}>
                <div className="container header-inner" role="navigation" aria-label="Primary">
                    <a className="brand" href="#home" aria-label="Grand Ouverte – Home">
                        <span className="brand-top">GRAND</span>
                        <span className="brand-bottom">OUVERTE</span>
                    </a>

                    <nav className="desktop-nav" aria-label="Primary">
                        <a href="#music">MUSIK</a>
                        <a href="#events">LIVE</a>
                        <a href="#band">BAND</a>
                        <a href="#gallery">FOTOS</a>
                        <a href="#newsletter">NEWS</a>
                    </nav>

                    <button
                        className="menu-button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            </header>

            {/* ----- Hero ----- */}
            <section id="home" className="hero" aria-label="Hero">
                <div className="hero-media" aria-hidden>
                    <div className="hero-video" />
                    <div className="hero-gradient" />
                    <div className="hero-radial" />
                </div>
                <div className="container hero-inner">
                    <h1 className="hero-title">
                        GRAND
                        <br />
                        OUVERTE
                    </h1>
                    <p className="hero-tag">Handgemachter Indie Rock aus Dresden</p>
                    <div className="hero-cta">
                        <a className="btn btn-primary" href="#music">
                            <Music size={18} aria-hidden /> MUSIK
                        </a>
                        <a className="btn btn-ghost" href="#events">
                            <Calendar size={18} aria-hidden /> LIVE KONZERTE
                        </a>
                    </div>
                </div>
            </section>

            <main id="main">
                {/* ----- Events ----- */}
                <section id="events" className="section section-dark">
                    <SectionHeader title="Wir sehen uns - LIVE!" />
                    <ul className="events-list" role="list">
                        {events.map((ev, i) => (
                            <li key={i} className="event">
                                <div className="event-col">
                                    <div className="event-date">{ev.date}</div>
                                    <div className="event-venue">{ev.venue}</div>
                                    <div className="event-loc">{ev.location}</div>
                                </div>
                                <a className="btn btn-line" href={ev.url} aria-label={`Tickets for ${ev.venue}`}>
                                    Tickets
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ----- Music / Discography ----- */}
                <section id="music" className="section">
                    <SectionHeader title="EPs & ALBEN" />
                    <div className="album-row" data-reduced={prefersReducedMotion}>
                        {albums.map((album) => (
                            <AlbumCard key={album.id} album={album} />)
                        )}
                    </div>
                </section>

                {/* ----- Band ----- */}
                <section id="band" className="section section-gradient">
                    <div className="container">
                        <h2 className="headline">ENERGIE // FREIHEIT // GEFÜHLE // MENSCHEN</h2>
                        <BandGrid/>
                        <div className="band-description">
                            <p>
                                Grand Ouvert, das seltenste Spiel beim Skat, ein anzügliches Kleidungsstück, die große
                                Freiheit!
                                Rockmusik mit Texten über Rebellion, Poesie, Ängste, Hoffnung, Humor und alles dazwischen.
                                Intensive, elektrisierende Klanglandschaften, die keiner Genre-Schublade zuzuordnen sind.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ----- Gallery ----- */}
                <section id="gallery" className="section">
                    <div className="container">
                        <div className="gallery-grid top">
                            {GALLERY.slice(0, 4).map((src, i) => (
                                <Figure key={i} src={src} alt={`Live photo ${i + 1}`}/>
                            ))}
                        </div>

                        <div className="marquee" aria-hidden>
                            <div className="marquee-track">
                                {Array.from({length: 10}).map((_, i) => (
                                    <span key={i}>Grand Ouverte</span>
                                ))}
                            </div>
                        </div>

                        <div className="gallery-grid bottom">
                            {GALLERY.slice(4).map((src, i) => (
                                <Figure key={i} src={src} alt={`Live photo ${i + 5}`} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ----- Newsletter ----- */}
                <section id="newsletter" className="section section-gradient-2">
                    <div className="container center">
                        <h2 className="headline">Nicht verpassen!</h2>
                        <p className="subhead">
                            Melde dich für unseren Newsletter an und erhalte Updates zu neuen Veröffentlichungen,
                            Tourdaten und exklusiven Inhalten.
                        </p>
                        <form className="newsletter" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe to newsletter">
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input id="email" type="email" inputMode="email" autoComplete="email" required placeholder="Deine E-Mail Adresse" />
                            <button className="btn btn-primary" type="submit">Anmelden</button>
                        </form>
                        <p className="fineprint">
                            Wir respektieren deine Privatsphäre. Deine Daten werden sicher und vertraulich behandelt.
                        </p>
                    </div>
                </section>
            </main>

            {/* ----- Footer ----- */}
            <footer className="site-footer">
                <div className="container footer-grid">
                    <div>
                        <h4 className="foot-h">Sitemap</h4>
                        <ul className="foot-links" role="list">
                            {[
                                ["Home", "#home"],
                                ["Music", "#music"],
                                ["Band", "#band"],
                                ["Events", "#events"],
                                ["Gallery", "#gallery"],
                                ["Newsletter", "#newsletter"],
                            ].map(([label, href]) => (
                                <li key={label}><a href={href}>{label}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="foot-h">Updates</h4>
                        <ul className="foot-links" role="list">
                            {[
                                ["Events", "#events"],
                                ["Newsletter", "#newsletter"],
                            ].map(([label, href]) => (
                                <li key={label}><a href={href}>{label}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="follow">
                        <h4 className="foot-h">Follow Us</h4>
                        <div className="socials">
                            <a href="#" aria-label="Instagram"><Instagram size={22} aria-hidden/></a>
                            <a href="https://www.facebook.com/people/Grand-Ouverte/61582449352378/"
                               aria-label="Facebook"><Facebook size={22} aria-hidden/></a>
                            <a href="https://grandouverte.bandcamp.com" aria-label="Bandcamp"><Bandcamp size={22} aria-hidden/></a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    © {new Date().getFullYear()} Grand Ouverte. All rights reserved.
                    {typeof __BUILD_TIME__ !== 'undefined' && (
                        <span style={{ opacity: 0.5, marginLeft: '1rem', fontSize: '0.8rem' }}>
                            {/* eslint-disable-next-line no-undef */}
                            v{new Date(__BUILD_TIME__).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </span>
                    )}
                </div>
            </footer>
        </div>
    );
}

/* --------------------------- Subcomponents --------------------------- */

function SectionHeader({ title, cta }) {
    return (
        <div className="container section-head">
            <h2 className="headline small">{title}</h2>
            {cta ? (
                <a className="link-underline" href={cta.href}>
                    {cta.label}
                </a>
            ) : null}
        </div>
    );
}

function AlbumCard({ album }) {
    const [hover, setHover] = useState(false);
    return (
        <article
            className="album"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="album-media">
                <picture>
                    {album.coverWebP && <source srcSet={album.coverWebP} type="image/webp" />}
                    <img
                        className="album-cover"
                        src={album.cover}
                        alt={`${album.title} – album cover`}
                        loading="lazy"
                        decoding="async"
                    />
                </picture>
                <div
                    className="vinyl"
                    style={{
                        background: `radial-gradient(circle at center, ${album.vinylColor} 0%, #1a1a1a 30%, #000 100%)`,
                        transform: hover ? "translateX(25%) rotate(25deg)" : "translateX(0) rotate(-90deg)",
                    }}
                    aria-hidden
                >
                    <div className="vinyl-label" style={{ background: album.vinylColor }}>
                        <div className="vinyl-brand">Grand Ouverte</div>
                        <div className="vinyl-title">{album.title}</div>
                    </div>
                </div>
            </div>
            <div className="album-meta">
                <h3 className="album-title">{album.title}</h3>
                <p className="album-members">{album.members}</p>
                <p className="album-desc">{album.description}</p>
                <div className="album-cta">
                    <a href="#" className="btn btn-line">
                        <Play size={16} aria-hidden /> Play
                    </a>
                    <a href="#" className="btn btn-ghost">
                        <ShoppingCart size={16} aria-hidden /> Buy
                    </a>
                </div>
            </div>
        </article>
    );
}

function BandGrid() {
    const members = [
        { name: "Marcel Wache", role: "Lead Vocals", image: "images/thomas_studio.png", imageWebP: "images/thomas_studio.webp" },
        { name: "David", role: "Drums", image: "images/erik.png", imageWebP: "images/erik.webp" },
        { name: "Thomas Adler", role: "Lead Guitar", image: "images/DSCF0112.jpg", imageWebP: "images/DSCF0112.webp" },
        { name: "Erik", role: "Bass", image: "images/dave_drums.jpg", imageWebP: "images/dave_drums.webp" },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="band-grid">
            {members.map((member, idx) => (
                <div
                    key={idx}
                    className={`band-card ${hoveredIndex === idx ? 'hovered' : ''}`}
                    data-rotation={idx % 2 === 0 ? 'right' : 'left'}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onTouchStart={() => setHoveredIndex(idx)}
                    onTouchEnd={() => setHoveredIndex(null)}
                >
                    <div className="band-card-inner">
                        <picture>
                            {member.imageWebP && <source srcSet={member.imageWebP} type="image/webp" />}
                            <img
                                src={member.image}
                                alt={member.name}
                                loading="lazy"
                                decoding="async"
                                className="band-img"
                            />
                        </picture>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Figure({src, alt}) {
    return (
        <figure className="shot">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
            />
        </figure>
    );
}

/* --------------------------- Hooks & Data --------------------------- */

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = () => setReduced(mq.matches);
        handler();
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return reduced;
}

const GALLERY = [
    "images/u5753668412_Close_up_stage_photography._Fisheye._Professional_92e49794-acd2-416e-8eae-bc819eb53652_1.webp",
    "images/u5753668412_Live_event_photography_of_epic_rock_band_Grand_Ou_84398df1-4c5a-4de2-a3b2-63032ad6cf31_2.webp",
    "images/u5753668412_Live_event_photography_of_epic_rock_band_Grand_Ou_84398df1-4c5a-4de2-a3b2-63032ad6cf31_3.webp",
    "images/u5753668412_Close_up_stage_photography._Fisheye._Professional_92e49794-acd2-416e-8eae-bc819eb53652_3.webp",
];


function MobileMenu({ open, onClose }) {
    return (
        <div id="mobile-menu" className={"mobile-menu" + (open ? " open" : "")}>
            <nav aria-label="Mobile">
                {[
                    ["MUSIK", "#music"],
                    ["LIVE", "#events"],
                    ["BAND", "#band"],
                    ["FOTOS", "#gallery"],
                    ["NEWS", "#newsletter"],
                ].map(([label, href]) => (
                    <a key={label} href={href} onClick={onClose}>
                        {label}
                    </a>
                ))}
            </nav>
            <div className="mobile-social">
                <a href="#" aria-label="Instagram"><Instagram size={22} aria-hidden /></a>
                <a href="https://www.facebook.com/people/Grand-Ouverte/61582449352378/" aria-label="Facebook"><Facebook size={22} aria-hidden /></a>
                <a href="https://grandouverte.bandcamp.com" aria-label="Bandcamp"><Bandcamp size={22} aria-hidden /></a>
            </div>
        </div>
    );
}
