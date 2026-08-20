import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 overflow-hidden relative bg-transparent"
    >
      <div id="about" className="scroll-anchor max-w-7xl mx-auto">

        {/* Header - Reverted to Original */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            About Me
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            Here's the exciting things about me!
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto items-center">

          {/* Bio Text */}
          <div ref={contentRef} className="space-y-6">
            <div className="glass-card p-10 md:p-12 min-h-[450px] flex flex-col justify-center">
              <h3 className="text-2xl font-heading font-semibold text-gradient-accent mb-6">
                Hello! I'm Theveen Ranaweera
              </h3>

              <div className="space-y-4 text-foreground/80 leading-relaxed text-justify">
                <p>
                  I'm a passionate Software Engineer currently pursuing my BSc (Hons) in Software Engineering at UCLan,
                  with a deep fascination for artificial intelligence and machine learning technologies.
                </p>

                <p>
                  Worked as a Software Engineering Intern at Wavenet, I specialized in optimizing, improving and analysing about intelligent
                  solutions using cutting-edge technologies like RAG pipelines, LLMs, and full-stack development.
                  The limitless potential of AI and its ability to address pressing issues in the real world are what motivate me to pursue a career in technology.
                </p>

                <div className="h-px w-full my-6 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

                <p>
                  When I'm not coding, I love exploring new music, experimenting with songs as a singer,
                  or staying active at the gym and in the pool as a swimmer.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;