import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'phosphor-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%', // Triggers when top of section hits 70% viewport height
        end: 'bottom 20%',
        toggleActions: 'play none none none', // Do not reverse on scroll up
        once: true // <--- This ensures the animation runs only ONE time
      }
    });

    // Fade in section
    tl.fromTo(section,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Slide content from left
    tl.fromTo(contentRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // Slide resume from right
    tl.fromTo(imageRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleResumeDownload = () => {
    window.open('https://drive.google.com/file/d/1CRrwQzhM9gjcOf-_OlEH67cRe3jrPn9b/view?usp=sharing', '_blank');
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 overflow-hidden relative bg-transparent"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header - Reverted to Original */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            About Me
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            Here's the exciting things about me!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Bio Text - Reverted to Original Design */}
          <div ref={contentRef} className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading font-semibold text-gradient-accent mb-6">
                Hello! I'm Theveen Ranaweera
              </h3>

              <div className="space-y-4 text-foreground/80 leading-relaxed text-justify">
                <p>
                  I'm a passionate Software Engineer currently pursuing my BSc (Hons) in Software Engineering at UCLan,
                  with a deep fascination for artificial intelligence and machine learning technologies.
                </p>

                <p>
                  Currently working as a Software Engineering Intern at Wavenet, I specialize in optimizing, improving and analysing about intelligent
                  solutions using cutting-edge technologies like RAG pipelines, LLMs, and full-stack development.
                  The limitless potential of AI and its ability to address pressing issues in the real world are what motivate me to pursue a career in technology.
                </p>

                <div className="h-px w-full my-6 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

                <p>
                  When I’m not coding, I love exploring new music, experimenting with songs as a singer,
                  or staying active at the gym and in the pool as a swimmer.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Resume Preview - New Layout, No Shadow */}
          <div ref={imageRef} className="flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-md">

              {/* Card Container - No offset shadow */}
              <div className="glass-card p-2 md:p-3 rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-white/10">
                {/* Resume Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-t-lg border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">resume.pdf</span>
                </div>

                {/* Iframe Wrapper - Aspect Ratio 1:1.414 (A4 Paper) */}
                <div className="relative w-full aspect-[1/1.414] bg-white overflow-hidden shadow-inner">
                  <iframe
                    src="https://drive.google.com/file/d/1CRrwQzhM9gjcOf-_OlEH67cRe3jrPn9b/preview"
                    className="absolute top-0 left-0 w-full h-full border-0 transform scale-[1.02] origin-top"
                    title="Resume Preview"
                  />
                </div>

                {/* Download Action Area */}
                <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50 flex justify-center rounded-b-lg">
                  <Button
                    onClick={handleResumeDownload}
                    className="group w-auto bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 text-[14.4px] font-semibold rounded-xl glow-primary transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Download size={20} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;