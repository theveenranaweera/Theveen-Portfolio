import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'GluCure+',
      description: 'A cross-platform mobile application empowering users to track and reduce daily sugar consumption. It features a visual "fuel gauge" progress ring, historical data tracking, and real-time integration with the OpenFoodFacts API to instantly fetch nutrition data for over 2 million retail items.',
      techStack: ['Flutter', 'Dart', 'Firebase',],
      demoUrl: 'https://drive.google.com/file/d/1YwZl4SoU2Ok4K587Azrf71ZAPu3InTL5/view?usp=sharing',
      codeUrl: 'https://github.com/theveenranaweera/GluCurePlus',
    },
    {
      title: 'Sort Wars!',
      description: 'A high-performance algorithmic benchmarking suite engineered in Python to analyze Merge Sort and Quick Sort on datasets of 100,000+ elements. It utilizes Matplotlib to visualize execution time and memory usage, demonstrating QuickSort\'s 40% memory efficiency advantage and achieving 99.7% faster execution in optimized scenarios.',
      techStack: ['Python'],
      demoUrl: '#',
      codeUrl: 'https://github.com/theveenranaweera/Sort-Wars',
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const projectsContainer = projectsRef.current;
    if (!section || !projectsContainer) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    // Animate section title
    tl.fromTo('.projects-title',
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

    // Animate project cards
    tl.fromTo('.project-card',
      {
        opacity: 0,
        y: 60,
        scale: 0.95
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 flex items-center bg-transparent"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions built with cutting-edge technologies and creative problem-solving.
          </p>
        </div>

        {/* Grid Layout: Stacks on mobile, 2 columns on large screens */}
        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card p-8 w-full hover:glow-primary transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              {/* Project Header */}
              <div className="mb-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-heading font-bold text-gradient-accent">
                    {project.title}
                  </h3>
                </div>
                <p className="text-foreground/80 leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Key Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-background-secondary text-foreground/80 rounded-full border border-primary/20 hover:border-primary/70 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10 mt-auto">
                <Button
                  variant="outline"
                  size="default"
                  disabled={project.demoUrl === '#' || !project.demoUrl}
                  className={`flex-1 transition-all duration-300 rounded-full ${project.demoUrl === '#' || !project.demoUrl
                      ? 'border-primary/10 text-primary/40 opacity-50 cursor-not-allowed'
                      : 'border-primary/30 text-primary hover:text-primary hover:bg-primary/10 hover:border-primary/50'
                    }`}
                  onClick={() => {
                    if (project.demoUrl !== '#' && project.demoUrl) {
                      window.open(project.demoUrl, '_blank');
                    }
                  }}
                >
                  <Globe size={18} className="mr-2" />
                  Live Demo
                  <ArrowUpRight size={14} className="ml-1 opacity-70" />
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 border-accent/30 text-accent hover:text-accent hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 rounded-full"
                  onClick={() => window.open(project.codeUrl, '_blank')}
                >
                  <GithubLogo size={18} className="mr-2" />
                  Source Code
                  <ArrowUpRight size={14} className="ml-1 opacity-70" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA Card */}
        <div className="mt-12">
          <div className="project-card glass-card p-8 text-center w-full hover:glow-primary transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-heading font-semibold text-gradient-accent mb-4">
              Want to see more?
            </h3>
            <p className="text-foreground/80 mb-6">
              Explore my complete collection of projects and contributions on GitHub.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 min-w-[200px] rounded-full"
              onClick={() => window.open('https://github.com/theveenranaweera', '_blank')}
            >
              <GithubLogo size={20} className="mr-2" />
              Visit GitHub Profile
              <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;