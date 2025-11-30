import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  id: string;
}

export const Hero: React.FC<HeroProps> = ({ id }) => {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />

      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
          Kubernetes 交互式架构指南
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Kubernetes<br />
          核心网络机制
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          从 <span className="text-blue-400 font-semibold">PV/PVC</span> 存储绑定到 <span className="text-purple-400 font-semibold">Service Discovery</span> (服务发现)。
          深度解析流量与数据在集群内部的流转原理。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('stateful')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            开始探索 <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};