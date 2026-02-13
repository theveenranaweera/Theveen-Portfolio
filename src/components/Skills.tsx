import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { SKILL_CATEGORIES } from '@/data/skills';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const skillsContainer = skillsRef.current;
      if (!section || !skillsContainer) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });

      // Animate section title
      tl.fromTo('.skills-title',
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

      // Animate skill tags with stagger
      tl.fromTo('.skill-tag',
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
          stagger: {
            amount: 1.2,
            from: 'start'
          }
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="skills-title text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Skills & Technologies
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and methodologies for building cutting-edge solutions.
          </p>
        </div>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={index} className="glass-card p-6">
              <h3 className="text-xl font-heading font-semibold text-gradient-accent mb-4 border-b border-primary/20 pb-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-tag cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;