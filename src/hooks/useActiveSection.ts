import { useState, useEffect, useRef } from 'react';
import { throttle } from '@/lib/utils';

export function useActiveSection(navLinks: { name: string; href: string }[]) {
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        // Add a little breathing room (e.g. 40px) for the scroll margin
        const totalOffset = rect.bottom + 40;
        document.documentElement.style.setProperty('--nav-height', `${totalOffset}px`);
      }
    };

    const resizeObserver = new ResizeObserver(() => updateNavHeight());
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    updateNavHeight();

    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
      updateNavHeight();

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection('#contact');
        return;
      }

      const focusPoint = scrollY + (windowHeight * 0.4);
      let currentSection = '#hero';
      const allLinks = [...navLinks, { name: 'Contact', href: '#contact' }];

      for (let i = allLinks.length - 1; i >= 0; i--) {
        const link = allLinks[i];
        const section = document.querySelector(link.href) as HTMLElement | null;
        if (section) {
          const sectionOffsetTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionOffsetTop <= focusPoint) {
            currentSection = link.href;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    }, 100);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavHeight);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavHeight);
      resizeObserver.disconnect();
    };
  }, [navLinks]);

  return { activeSection, isScrolled, navRef };
}
