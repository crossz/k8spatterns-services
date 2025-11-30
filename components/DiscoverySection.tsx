import React from 'react';
import { Search, Globe, Box, Settings } from 'lucide-react';

interface SectionProps {
  id: string;
}

export const DiscoverySection: React.FC<SectionProps> = ({ id }) => {
  return (
    <section id={id} className="min-h-screen py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">服务发现 & <span className="text-purple-400">k3d 原理</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Pod 之间如何互相“找到”对方？k3d 这样的本地集群又是如何把服务暴露给宿主机的？
          </p>
        </div>

        {/* Diagram Wrapper */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl overflow-x-auto">
          <div className="min-w-[800px] flex flex-col items-center gap-12 relative">
            
            {/* Layer 1: The Host */}
            <div className="w-full flex justify-center">
              <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg shadow-white/10 z-10 flex items-center gap-2">
                <Globe size={18} />
                Host Machine / 浏览器 (localhost:8080)
              </div>
            </div>

            {/* Connector */}
            <div className="h-12 w-0.5 bg-gradient-to-b from-white to-slate-600"></div>

            {/* Layer 2: Docker / K3d Proxy */}
            <div className="w-full border-2 border-dashed border-slate-700 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-slate-500 text-sm">Docker 容器边界</div>
              
              <div className="flex justify-center mb-8">
                <div className="bg-purple-900/40 border border-purple-500 text-purple-200 px-8 py-4 rounded-lg flex flex-col items-center">
                  <div className="font-bold mb-1">k3d-proxy (LoadBalancer)</div>
                  <div className="text-xs opacity-70">端口映射: 8080:80</div>
                </div>
              </div>

              {/* Connector Internal */}
              <div className="flex justify-center mb-8">
                 <div className="h-8 w-0.5 bg-slate-600"></div>
              </div>

              {/* Layer 3: Ingress / Service */}
              <div className="grid grid-cols-2 gap-12">
                
                {/* Path A: Ingress Controller */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 mb-4 text-orange-400 font-bold">
                    <Settings size={18} />
                    Traefik / Ingress Controller
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    根据 Host 头或路径进行路由。<br/>
                    例如：<code>app.localhost</code>
                  </p>
                  <div className="h-0.5 w-full bg-slate-600 mb-4"></div>
                  <div className="text-center text-sm font-mono text-blue-300">Service: my-app</div>
                </div>

                {/* Path B: DNS Discovery */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 opacity-80">
                  <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold">
                    <Search size={18} />
                    CoreDNS (内部 DNS)
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    集群内部 Pod 通过域名查询：<br/>
                    <code>my-svc.default.svc.cluster.local</code>
                  </p>
                  <div className="h-0.5 w-full bg-slate-600 mb-4"></div>
                  <div className="text-center text-sm font-mono text-green-300">解析为 ClusterIP</div>
                </div>

              </div>
              
              {/* Connector to Pods */}
              <div className="flex justify-center mt-8">
                 <div className="h-8 w-0.5 bg-slate-600"></div>
              </div>

               {/* Layer 4: Target Pods */}
               <div className="flex justify-center gap-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="bg-slate-800 p-3 rounded-lg border border-slate-600 flex items-center gap-2">
                     <Box size={16} className="text-green-400" />
                     <span className="text-xs">Pod-{i}</span>
                   </div>
                 ))}
               </div>

            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
           <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-purple-500">
             <h3 className="font-bold text-lg mb-2 text-white">k3d 的魔法</h3>
             <p className="text-slate-400 text-sm">
               k3d 会创建一个辅助容器 (<code>k3d-proxy</code>)，作为宿主机 Docker 网络和 k3s 集群网络之间的桥梁。这使得类型为 <code>LoadBalancer</code> 的 Service（如 Traefik）可以直接通过 localhost 访问，而无需真实的云提供商。
             </p>
           </div>
           <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-blue-500">
             <h3 className="font-bold text-lg mb-2 text-white">CoreDNS 机制</h3>
             <p className="text-slate-400 text-sm">
               每个 Service 创建时都会自动注册 DNS A 记录。Pod 不需要知道具体的 IP 地址，只需要 curl <code>http://service-name</code>。Kube-proxy（通过 iptables 或 IPVS）会拦截该流量并轮询转发给健康的 Pod。
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};