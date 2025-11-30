import React, { useState } from 'react';
import { K8sServiceType } from '../types';
import { Network, Globe, Server, Share2 } from 'lucide-react';

interface SectionProps {
  id: string;
}

const definitions = {
  [K8sServiceType.ClusterIP]: {
    title: "ClusterIP (默认类型)",
    desc: "仅在集群内部暴露服务。分配一个内部 VIP (虚拟 IP)。选择此类型意味着该服务只能从集群内部访问，外部无法 ping 通。",
    useCase: "内部微服务通信 (例如：后端 API 调用 Database，或微服务 A 调用微服务 B)。",
    icon: Network
  },
  [K8sServiceType.NodePort]: {
    title: "NodePort",
    desc: "在每个 Node (节点) 的 IP 上开放一个静态端口 (NodePort)。集群外部可以通过 <NodeIP>:<NodePort> 直接访问服务。",
    useCase: "开发调试环境、非云环境下的临时暴露、或特殊硬件映射场景。",
    icon: Server
  },
  [K8sServiceType.LoadBalancer]: {
    title: "LoadBalancer",
    desc: "使用云服务商 (AWS, GCP, Azure) 提供的负载均衡器向外暴露服务。它会自动创建 NodePort 和 ClusterIP 路由。",
    useCase: "生产环境的对外服务 (如 Web 网站、公共 API 网关)。",
    icon: Globe
  },
  [K8sServiceType.ExternalName]: {
    title: "ExternalName",
    desc: "将服务映射到 DNS 名称 (例如 foo.bar.example.com)，通过返回 CNAME 记录实现。不经过代理或转发。",
    useCase: "在集群内通过 K8s 原生名称访问外部数据库或遗留系统。",
    icon: Share2
  }
};

export const ServiceTypesSection: React.FC<SectionProps> = ({ id }) => {
  const [activeType, setActiveType] = useState<K8sServiceType>(K8sServiceType.ClusterIP);

  const renderVisual = () => {
    switch (activeType) {
      case K8sServiceType.ClusterIP:
        return (
          <div className="h-64 flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-xl m-4" />
            <div className="absolute top-2 left-6 bg-slate-900 px-2 text-xs text-slate-500">Cluster Boundary (集群边界)</div>
            
            <div className="flex items-center gap-8 z-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-2 mx-auto">Client Pod</div>
              </div>
              <div className="h-0.5 w-16 bg-blue-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-blue-400">Internal IP</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 border border-blue-500 rounded-lg">
                <div className="font-bold text-blue-300">Service</div>
                <div className="text-xs text-blue-400">10.96.0.1</div>
              </div>
            </div>
          </div>
        );
      case K8sServiceType.NodePort:
        return (
          <div className="h-64 flex items-center justify-center relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <div className="text-center mb-2">User (外部用户)</div>
              <ArrowLine />
            </div>
            
            <div className="border-2 border-slate-600 bg-slate-800/50 p-6 rounded-xl ml-12 relative">
               <div className="absolute -top-3 bg-slate-600 text-white text-xs px-2 rounded">Node (虚拟机/物理机)</div>
               <div className="flex flex-col items-center">
                 <div className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded border border-orange-500/50 mb-4">
                   Port: 30007
                 </div>
                 <div className="h-8 w-0.5 bg-slate-500"></div>
                 <div className="bg-blue-900/30 border border-blue-500 px-4 py-2 rounded mt-2">
                   Service
                 </div>
               </div>
            </div>
          </div>
        );
      case K8sServiceType.LoadBalancer:
        return (
          <div className="h-64 flex items-center justify-center gap-4">
             <div className="text-center">
                <Globe className="mx-auto mb-2 text-slate-400" />
                <span className="text-xs">Internet</span>
             </div>
             <ArrowLine />
             <div className="bg-purple-600 text-white p-3 rounded-lg shadow-lg shadow-purple-900/50 z-10">
               Cloud LB (云负载均衡)
               <div className="text-[10px] opacity-75">Public IP</div>
             </div>
             <ArrowLine />
             <div className="border border-slate-600 p-4 rounded bg-slate-800">
               <div className="text-xs text-slate-400 mb-1">Cluster</div>
               <div className="bg-blue-900/30 border border-blue-500 px-3 py-1 rounded text-sm">Service</div>
             </div>
          </div>
        );
      default:
        return <div className="h-64 flex items-center justify-center text-slate-500">Visual not available</div>;
    }
  };

  return (
    <section id={id} className="min-h-screen py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Service Types (服务类型)</h2>
        
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {(Object.keys(definitions) as K8sServiceType[]).map((type) => {
              const info = definitions[type];
              const Icon = info.icon;
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`
                    text-left p-4 rounded-xl transition-all duration-300 border
                    ${activeType === type 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg translate-x-2' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:border-slate-600'}
                  `}
                >
                  <div className="flex items-center gap-3 font-bold mb-1">
                    <Icon size={18} />
                    {info.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-8 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 {definitions[activeType].title}
              </h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {definitions[activeType].desc}
              </p>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mb-8">
                <span className="text-blue-400 font-bold text-sm uppercase tracking-wide">适用场景 (Best Use Case):</span>
                <p className="text-slate-400 mt-1">{definitions[activeType].useCase}</p>
              </div>
            </div>

            {/* Dynamic Diagram */}
            <div className="bg-slate-900 rounded-xl border border-slate-800/50 overflow-hidden">
               {renderVisual()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArrowLine = () => (
  <div className="flex items-center text-slate-500 mx-2">
    <div className="h-0.5 w-8 bg-current"></div>
    <div className="w-2 h-2 border-t-2 border-r-2 border-current rotate-45 -ml-1.5"></div>
  </div>
);