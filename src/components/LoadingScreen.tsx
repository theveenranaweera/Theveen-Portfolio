import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progressValue = Math.round(this.progress() * 100);
        setProgress(progressValue);
      }
    });

    // Animate loading text
    tl.from('.loading-text', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, 0);

    // Fade out and complete
    tl.to('.preloader', {
      duration: 1,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        <div className="loading-text mb-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-primary mb-4">
            Welcome
          </h1>
          <p className="text-muted-foreground text-lg">
            Initializing portfolio experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Loading</span>
            <span className="text-sm text-primary font-mono">{progress}%</span>
          </div>
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full progress-bar transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary/40 rounded-full animate-glow-pulse"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-accent/40 rounded-full animate-glow-pulse"></div>
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-primary/60 rounded-full animate-glow-pulse"></div>
    </div>
  );
};

export default LoadingScreen;