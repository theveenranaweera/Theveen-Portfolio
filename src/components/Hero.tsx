import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = [
  'Hello', '你好', '嗨', 'Hola', 'नमस्ते', 'مرحبا',
  'Olá', 'হ্যালো', 'Привет', 'こんにちは', 'Hallo', 'ආයුබෝවන්'
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    // GSAP animations for initial page load
    const ctx = gsap.context(() => {
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
    }, heroRef);

    // Framer Motion animation for greetings
    const greetingInterval = setInterval(() => {
      setGreetingIndex(prevIndex => (prevIndex + 1) % GREETINGS.length);
    }, 2700);

    return () => {
      ctx.revert();
      clearInterval(greetingInterval);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-2xl opacity-40 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/30 rounded-full blur-xl opacity-50 animate-float"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-left max-w-7xl mx-auto pr-4 sm:pr-8 lg:pr-12 w-full">
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-heading font-bold mb-8 leading-[1.1] tracking-tight"
        >
          <div className="block text-foreground">
            <AnimatePresence mode="wait">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="inline-block"
              >
                {GREETINGS[greetingIndex]}
              </motion.span>
            </AnimatePresence>, I'm Theveen
          </div>
          <div className="mt-2 sm:mt-0 bg-gradient-to-r from-[#4382DF] via-[#4988C4] to-[#90CAF9] text-transparent bg-clip-text w-fit">
            <div className="block">
              Software Engineer
            </div>
            <div className="block mt-2 sm:mt-0">
              & AI Addict!
            </div>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-8 md:mt-12">
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl font-medium leading-relaxed"
          >
            I'm currently a Software Engineering undergraduate learning to craft intelligent solutions with cutting-edge technology,
            from machine learning pipelines to full-stack applications.
          </p>


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