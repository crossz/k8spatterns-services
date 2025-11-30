import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { StatefulSection } from './components/StatefulSection';
import { ServerlessSection } from './components/ServerlessSection';
import { BentoSection } from './components/BentoSection';
import { ServiceTypesSection } from './components/ServiceTypesSection';
import { DiscoverySection } from './components/DiscoverySection';
import { Navigation } from './components/Navigation';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Simple scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stateful', 'serverless', 'bento', 'servicetypes', 'discovery'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-500 selection:text-white">
      <Navigation activeSection={activeSection} />
      
      <main className="flex flex-col">
        <Hero id="hero" />
        <StatefulSection id="stateful" />
        <ServerlessSection id="serverless" />
        <BentoSection id="bento" />
        <ServiceTypesSection id="servicetypes" />
        <DiscoverySection id="discovery" />
      </main>

      <footer className="py-12 border-t border-slate-800 text-center text-slate-500">
        <p className="mb-2">Kubernetes Deep Dive Visualization</p>
        <p className="text-sm">Inspired by remix.dev design patterns</p>
      </footer>
    </div>
  );
};

export default App;