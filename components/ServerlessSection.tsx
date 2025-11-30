import React from 'react';
import { Server, Users, ArrowDown, ShieldCheck, Zap } from 'lucide-react';

interface SectionProps {
  id: string;
}

export const ServerlessSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <section id={id} className="min-h-screen py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            无状态扩容 & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">高并发架构</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl">
            在传统架构中，我们通常需要手动配置 <strong>Nginx</strong> 反向代理来处理高并发负载。
            Kubernetes <span className="text-white font-bold">Services</span> 将这种模式完全抽象化，提供了类似 Serverless 的体验。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Traditional Way */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-800 rounded-lg">
                <Server size={24} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-200">传统模式 (Nginx)</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center p-4 bg-black/40 rounded-lg border border-slate-800">
                <code className="text-green-400 text-sm font-mono">
                  upstream backend &#123;<br/>
                  &nbsp;&nbsp;server 10.0.0.1;<br/>
                  &nbsp;&nbsp;server 10.0.0.2;<br/>
                  &#125;
                </code>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="text-slate-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-slate-800 p-2 rounded text-center text-xs text-slate-400">Server A (IP 固定)</div>
                 <div className="bg-slate-800 p-2 rounded text-center text-xs text-slate-400">Server B (IP 固定)</div>
              </div>
            </div>
            
            <ul className="mt-6 space-y-2 text-slate-400 text-sm">
              <li>• 需要在配置文件中手动管理后端 IP</li>
              <li>• 扩容时往往需要重载 (Reload) 配置</li>
              <li>• 如果 Nginx 本身未做高可用，存在单点故障风险</li>
            </ul>
          </div>

          {/* Kubernetes Way */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900/20 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/50">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Kubernetes Service 模式</h3>
            </div>

            <div className="space-y-4 relative z-10">
               <div className="flex items-center justify-between p-4 bg-blue-950/50 rounded-lg border border-blue-500/30">
                  <span className="font-mono text-blue-300 font-bold">Service (虚拟 VIP)</span>
                  <ShieldCheck size={16} className="text-blue-400" />
               </div>
               
               <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
               </div>

               <div className="grid grid-cols-3 gap-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="bg-slate-800 p-2 rounded text-center border border-slate-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-green-500/10 animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                      <span className="text-xs text-slate-300 relative z-10">Pod-{i}</span>
                   </div>
                 ))}
               </div>
            </div>

            <ul className="mt-6 space-y-2 text-blue-200/70 text-sm relative z-10">
              <li className="flex items-center gap-2"><ArrowDown size={14} className="rotate-[-45deg]" /> <strong>标签选择器 (Label Selector):</strong> 自动发现后端 Pod，无需手动配置 IP。</li>
              <li className="flex items-center gap-2"><ArrowDown size={14} className="rotate-[-45deg]" /> <strong>内核级负载均衡:</strong> 基于 iptables 或 IPVS，性能极高。</li>
              <li className="flex items-center gap-2"><ArrowDown size={14} className="rotate-[-45deg]" /> <strong>Serverless 体验:</strong> 只需定义“我要什么”，K8s 自动处理流量路由。</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};