import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {


  useEffect(() => {
    // Add floating background elements animation
    gsap.to('.floating-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        amount: 1,
        from: 'random'
      }
    });

    // Add parallax effect to background elements
    gsap.utils.toArray('.parallax-element').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);



  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute top-3/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute top-1/2 left-1/6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="floating-orb absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="w-1 h-16 bg-primary/20 rounded-full overflow-hidden">
          <div
            className="w-full bg-primary rounded-full transition-all duration-300"
            style={{
              height: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;