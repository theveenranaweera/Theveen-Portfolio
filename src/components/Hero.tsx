import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'phosphor-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const greetings = [
    'Hello', '你好', '嗨', 'Hola', 'नमस्ते', 'مرحبا',
    'Olá', 'হ্যালো', 'Привет', 'こんにちは', 'Hallo', 'ආයුබෝවන්'
  ];
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    // GSAP animations for initial page load
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }
    );
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Framer Motion animation for greetings
    const greetingInterval = setInterval(() => {
      setGreetingIndex(prevIndex => (prevIndex + 1) % greetings.length);
    }, 2700);

    return () => {
      tl.kill();
      clearInterval(greetingInterval);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-2xl opacity-40 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/30 rounded-full blur-xl opacity-50 animate-float"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <h1
          ref={headlineRef}
          className="text-[38.4px] md:text-[64px] lg:text-[76px] font-heading font-bold mb-2 leading-tight"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="inline-block"
            >
              {greetings[greetingIndex]}
            </motion.span>
          </AnimatePresence>, I'm{' '}
          <span className="text-gradient-primary">Theveen</span>
          <br />
          <span className="text-[24px] md:text-[38.4px] lg:text-[32px] text-foreground/80 block mt-5">
            Software Engineer & AI Addict!
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-[16px] md:text-[18px] text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          I'm currently a Software Engineering undergraduate learning to craft intelligent solutions with cutting-edge technology,
          from machine learning pipelines to full-stack applications.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="group bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 text-[14.4px] font-semibold rounded-xl glow-primary transition-all duration-300 hover:scale-105"
          >
            Hire Me
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-[14.4px] font-semibold rounded-xl border-primary/30 text-primary hover:text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-primary/40 rounded-full animate-glow-pulse"></div>
      <div className="absolute bottom-40 right-16 w-4 h-4 bg-accent/40 rounded-full animate-glow-pulse"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-primary/60 rounded-full animate-glow-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-accent/50 rounded-full animate-glow-pulse"></div>
    </section>
  );
};

export default Hero;