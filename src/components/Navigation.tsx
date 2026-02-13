import { useState, useEffect } from 'react';
import { List, X, PaperPlaneTilt } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { throttle } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  useEffect(() => {
    const handleScroll = throttle(() => {
      // 1. Handle Navbar Visuals (Compact State)
      setIsScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 2. "Bottom of Page" Detection (Crucial for Contact section)
      // If user is near the bottom, force the last section (Contact) to be active
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection('#contact');
        return;
      }

      // 3. Standard Scroll Spy Logic
      // We use a "focus point" that is 40% down the screen.
      // As soon as a section's top crosses this line, it becomes active.
      const focusPoint = scrollY + (windowHeight * 0.4);

      // Check sections in reverse to find the last one that has passed the focus point
      let currentSection = '#hero'; // Default to hero/top

      // Create a full list including Contact for checking
      const allLinks = [...navLinks, { name: 'Contact', href: '#contact' }];

      for (let i = allLinks.length - 1; i >= 0; i--) {
        const link = allLinks[i];
        const section = document.querySelector(link.href) as HTMLElement | null;

        if (section) {
          // If the section top is above our focus point, it's the active one
          if (section.offsetTop <= focusPoint) {
            currentSection = link.href;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    }, 100);

    // Run once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement | null;
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Ambient Glow behind navbar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-primary/20 blur-[100px] pointer-events-none z-40 opacity-50" />

      <nav
        className={`
          fixed left-1/2 -translate-x-1/2 z-50
          transition-all duration-500 ease-in-out
          ${isScrolled ? 'top-4 w-[90%] md:w-auto' : 'top-6 w-[95%] md:w-auto'}
        `}
      >
        <div
          className={`
            relative
            flex items-center justify-between
            px-2 p-2 md:px-3 md:py-2
            rounded-full
            border border-white/10
            shadow-xl shadow-black/10
            backdrop-blur-xl
            transition-all duration-500
            ${isScrolled ? 'bg-background/80' : 'bg-background/40'}
          `}
        >
          {/* Logo Section */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="pl-3 pr-4 group flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/tr-logo.svg"
                alt="Logo"
                className="h-8 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`
                    relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}
                  `}
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/10 border border-primary/20 rounded-full -z-10 animate-fade-in" />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="hidden md:flex pl-4 pr-1">
            <Button
              onClick={() => scrollToSection('#contact')}
              size="sm"
              className={`
                rounded-full transition-all duration-300
                ${activeSection === '#contact'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)]'
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'}
              `}
            >
              Contact
              <PaperPlaneTilt weight="bold" className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center pr-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <List size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            absolute top-full left-0 right-0 mt-3 p-4
            glass-card rounded-3xl border border-white/10
            flex flex-col gap-2
            origin-top transition-all duration-300 ease-out
            ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'}
          `}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                scrollToSection(link.href);
                setIsOpen(false);
              }}
              className={`
                p-4 rounded-xl text-left font-medium transition-colors
                ${activeSection === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-white/5 text-muted-foreground'}
              `}
            >
              {link.name}
            </button>
          ))}
          <Button
            className="w-full mt-2 rounded-xl bg-primary text-primary-foreground"
            onClick={() => {
              scrollToSection('#contact');
              setIsOpen(false);
            }}
          >
            Contact Me <PaperPlaneTilt weight="bold" className="ml-2" />
          </Button>
        </div>
      </nav>

      {/* Backdrop for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;