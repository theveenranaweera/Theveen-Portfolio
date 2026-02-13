import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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
      tl.fromTo('.experience-title',
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

      // Animate timeline line
      tl.fromTo('.timeline-line',
        {
          scaleY: 0
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out'
        },
        '-=0.4'
      );

      // Animate timeline entries
      tl.fromTo('.timeline-entry',
        {
          opacity: 0,
          x: (_, target) => {
            const side = target.getAttribute('data-side');
            return side === 'left' ? -100 : 100;
          }
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.3
        },
        '-=1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-16 md:py-16 lg:py-24 px-4 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="experience-title text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Experience & Education
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            My journey through education and professional development in the tech industry.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line origin-top"></div>

          {/* Timeline Entries */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  className="timeline-entry relative flex md:justify-between items-center"
                  data-side={exp.side}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 timeline-dot flex items-center justify-center">
                    <Icon size={16} className="text-primary-foreground" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[48%] ${exp.side === 'left' ? 'md:pr-4' : 'md:pl-4 ml-auto'
                      }`}
                  >
                    <div className="glass-card p-6 transition-all duration-300">
                      <div className="mb-4">
                        <h3 className="text-xl font-heading font-semibold text-gradient-accent mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors duration-300"
                          >
                            {exp.company}
                          </a>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                      </div>

                      {Array.isArray(exp.description) ? (
                        <ul className="text-foreground/80 mb-4 leading-relaxed space-y-2 list-disc list-inside">
                          {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-foreground/80 mb-4 leading-relaxed text-justify">
                          {exp.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 text-xs bg-background-secondary text-foreground/80 rounded-full border border-primary/20 hover:border-primary/70 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;