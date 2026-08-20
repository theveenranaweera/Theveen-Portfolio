import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Envelope,
  LinkedinLogo,
  GithubLogo
} from 'phosphor-react';

import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });

      // Animate section title
      tl.fromTo('.contact-title',
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );

      // Animate section subtitle
      tl.fromTo('.contact-subtitle',
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.6'
      );

      // Animate contact cards
      tl.fromTo('.contact-card',
        {
          opacity: 0,
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactCards = [
    {
      icon: Envelope,
      label: 'Email',
      title: 'Get in touch',
      href: `mailto:${CONTACT_INFO.EMAIL}`,
      cardHover: 'hover:shadow-[0_0_25px_rgba(157,214,255,0.3)]',
      iconHover: 'group-hover:border-primary/50 group-hover:bg-primary/5',
      iconColor: 'group-hover:text-primary',
      textHover: 'group-hover:text-primary'
    },
    {
      icon: LinkedinLogo,
      label: 'LinkedIn',
      title: 'Connect with me',
      href: SOCIAL_LINKS.LINKEDIN,
      cardHover: 'hover:shadow-[0_0_25px_rgba(65,105,225,0.3)]',
      iconHover: 'group-hover:border-[#4169E1]/50 group-hover:bg-[#4169E1]/5',
      iconColor: 'group-hover:text-[#4169E1]',
      textHover: 'group-hover:text-[#4169E1]'
    },
    {
      icon: GithubLogo,
      label: 'GitHub',
      title: 'View my code',
      href: SOCIAL_LINKS.GITHUB,
      cardHover: 'hover:shadow-[0_0_25px_rgba(156,163,175,0.3)]',
      iconHover: 'group-hover:border-gray-400/50 group-hover:bg-gray-400/5',
      iconColor: 'group-hover:text-gray-400',
      textHover: 'group-hover:text-gray-400'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 flex items-center"
    >
      <div id="contact" className="scroll-anchor max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Let's Connect
          </h2>
          <p className="contact-subtitle text-[16px] text-muted-foreground max-w-2xl mx-auto mb-2">
            Come on up here...feel free to reach out!
          </p>
        </div>

        <div className="flex flex-col max-w-sm mx-auto gap-5 w-full">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`contact-card glass-card p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 group cursor-pointer hover:-translate-y-1 ${card.cardHover}`}
              >
                <div className={`w-14 h-14 shrink-0 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 ${card.iconHover}`}>
                  <Icon size={24} className={`text-foreground/70 transition-colors duration-300 ${card.iconColor}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm text-muted-foreground font-medium mb-1">{card.label}</span>
                  <span className={`text-lg font-heading font-semibold text-foreground transition-colors duration-300 ${card.textHover}`}>{card.title}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;