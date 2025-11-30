import React from 'react';
import { Box, Layers, Zap, Network, Compass, Bot } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'hero', icon: Box, label: '概览' },
    { id: 'stateful', icon: Layers, label: '有状态存储' },
    { id: 'serverless', icon: Zap, label: '扩容与 Nginx' },
    { id: 'bento', icon: Bot, label: 'AI 推理 (BentoML)' },
    { id: 'servicetypes', icon: Network, label: 'Service 类型' },
    { id: 'discovery', icon: Compass, label: '服务发现' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tighter text-blue-400 flex items-center gap-2">
          <Box className="w-6 h-6" />
          <span>K8s<span className="text-white">Dive</span></span>
        </div>
        
        <div className="hidden md:flex gap-1 bg-white/5 p-1 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="md:hidden">
          <span className="text-sm text-slate-400 capitalize">{activeSection}</span>
        </div>
      </div>
    </nav>
  );
};