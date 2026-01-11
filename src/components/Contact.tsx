import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Envelope,
  Phone,
  MapPin,
  GithubLogo,
  LinkedinLogo
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

    // Animate social icons
    tl.fromTo('.social-icon',
      {
        opacity: 0,
        scale: 0.8,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1
      },
      '-=0.3'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const contactInfo = [
    {
      icon: Envelope,
      label: 'Email',
      value: 'theveend@gmail.com',
      href: 'mailto:theveend@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+94 (70) 303-6321',
      href: "tel:+94703036321"
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Colombo, Sri Lanka',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: GithubLogo,
      label: 'GitHub',
      href: 'https://github.com/theveenranaweera',
      color: 'hover:text-gray-400'
    },
    {
      icon: LinkedinLogo,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/theveen-ranaweera/',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Let's Connect
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto mb-2">
            Come on up here...feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Card */}
          <div className="contact-card glass-card p-8 hover:glow-primary transition-all duration-300">
            <h3 className="text-2xl font-heading font-semibold text-gradient-accent mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-full hover:bg-primary/10 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 group-hover:glow-primary transition-all duration-300">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connect Card */}
          <div className="contact-card glass-card p-8 hover:glow-accent transition-all duration-300">
            <h3 className="text-2xl font-heading font-semibold text-gradient-accent mb-6">
              Let's Connect
            </h3>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              Follow me on social media to stay updated with my latest projects,
              insights, and tech adventures. Always open to networking and
              discussing innovative ideas!
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-14 h-14 bg-background-secondary rounded-full flex items-center justify-center border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:glow-primary ${social.color}`}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;