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
            <div className="glass-card p-8 md:p-10 min-h-[450px] flex flex-col justify-center">
              <div className="space-y-8 text-foreground/80 leading-relaxed text-left">
                <p className="text-lg text-foreground">
                  I'm a Software Engineering Undergraduate driven by genuine curiosity for artificial intelligence and a
                  passion for turning complex tech into tools that actually make life better.
                </p>

                <div className="space-y-4">
                  <h4 className="text-xl font-heading font-semibold text-gradient-accent">Current Focus</h4>
                  <ul className="space-y-3 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span>Pursuing my Software Engineering degree at the University of Lancashire (aiming high with predicted First Class Honours) while obsessing over clean code and modern tech stacks.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span>Diving deep into intelligent systems crafting smart RAG pipelines and exploring how LLMs can solve real-world problems.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span>Leveling up my engineering toolkit, from algorithmic optimization to full-scale software architecture.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-heading font-semibold text-gradient-accent">What I Bring to the Table</h4>
                  <ul className="space-y-3 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">Intelligent AI Solutions:</strong> Practical, Python-driven RAG workflows that blend OCR document search, smart context enrichment, and snappy API design.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">User-First Applications:</strong> Intuitive, responsive mobile apps built with Flutter, Firebase, and Node.js that are made for real people to use every day.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">Solid Engineering Foundations:</strong> Memory-safe C++ systems, benchmarked data pipelines, and a healthy respect for performance and data integrity.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-heading font-semibold text-gradient-accent">Milestones I'm Proud Of</h4>
                  <ul className="space-y-3 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">Global Wavenet Internship:</strong> Engineered unified OCR and document search pipelines, shipping production-ready AI improvements and fine-tuning backend APIs.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">GluCure Plus:</strong> Built a dedicated daily health-tracking Flutter app serving 500+ users with real-time Firestore sync and automated product lookups.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-[5px] text-[10px] text-primary">○</span>
                      <span><strong className="font-semibold text-foreground">Agile Leadership:</strong> Stepped up as Product Owner for an AR navigation prototype, bridging the gap between client expectations, UI design, and interactive Unity development.</span>
                    </li>
                  </ul>
                </div>

                <div className="h-px w-full my-6 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

                <p className="text-sm md:text-base">
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