import { useState, useEffect } from "react";
import { Menu, X, Music, Calendar, BookOpen, Users, Info, HelpCircle } from "lucide-react";

interface HeaderProps {
  currentRoute: string;
}

export default function Header({ currentRoute }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#/", icon: Music, route: "home" },
    { label: "Optredens", href: "#/optredens", icon: Calendar, route: "optredens" },
    { label: "Boek ons", href: "#/boek-ons", icon: BookOpen, route: "boek-ons" },
    { label: "Over ons", href: "#/over-ons", icon: Info, route: "over-ons" },
    { label: "Mannen", href: "#/mannen", icon: Users, route: "mannen" },
    { label: "Muziek", href: "#/muziek", icon: Music, route: "muziek" },
    { label: "Blog", href: "#/blog", icon: BookOpen, route: "blog" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-3 ${
        scrolled 
          ? "bg-brand-bg-3/95 backdrop-blur-md py-3 border-brand-cream/20 shadow-lg" 
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#/" 
          className="group flex items-center gap-2 font-display text-2xl md:text-3xl tracking-widest text-brand-cream hover:text-brand-neon transition-colors"
        >
          <span className="bg-brand-red px-2 py-1 text-white inline-block border-2 border-brand-cream hard-shadow-neon rotate-[-2deg] group-hover:rotate-0 transition-transform">
            QLC
          </span>
          <span className="font-bold uppercase tracking-[0.2em] hidden sm:inline ml-1">
            QUARTER LIFE CRISIS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route || (link.route === "home" && currentRoute === "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-display uppercase text-sm tracking-[0.15em] px-3 py-1.5 border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-brand-cream text-brand-bg border-brand-cream hard-shadow-neon"
                    : "text-brand-cream border-transparent hover:border-brand-neon hover:text-brand-neon hover:rotate-[-1deg]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          
          <a
            href="#/boek-ons"
            className="ml-3 font-display uppercase text-sm tracking-[0.2em] px-4 py-2 bg-brand-amber text-brand-bg-3 border-2 border-brand-cream font-bold hover-bounce hard-shadow-cream"
          >
            BOEK NU!
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-2 border-brand-cream bg-brand-bg-2 text-brand-cream hard-shadow-cream active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] bg-brand-bg-3/98 z-40 border-t-3 border-brand-red p-6 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.route === "home" && currentRoute === "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 font-display uppercase text-xl tracking-widest p-3 border-2 transition-all ${
                    isActive
                      ? "bg-brand-cream text-brand-bg border-brand-cream hard-shadow-neon"
                      : "text-brand-cream border-brand-cream/10 hover:border-brand-neon hover:text-brand-neon"
                  }`}
                >
                  <link.icon className="w-5 h-5 text-brand-amber" />
                  {link.label}
                </a>
              );
            })}
            <a
              href="#/boek-ons"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center font-display uppercase text-xl tracking-[0.2em] py-3.5 bg-brand-amber text-brand-bg-3 border-2 border-brand-cream font-bold hard-shadow-cream hover:bg-brand-neon transition-all"
            >
              BOEK NU DE BAND!
            </a>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-brand-cream/10 text-center">
            <p className="font-display tracking-widest text-brand-amber text-lg">"PLAY LOUD, GROW UP LATER"</p>
            <p className="text-xs text-brand-text-muted mt-2">Bunschoten-Spakenburg / Amersfoort</p>
          </div>
        </div>
      )}
    </header>
  );
}
