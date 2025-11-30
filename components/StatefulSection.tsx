import React, { useState } from 'react';
import { Database, HardDrive, FileCheck, ArrowRight, RefreshCw } from 'lucide-react';

interface SectionProps {
  id: string;
}

export const StatefulSection: React.FC<SectionProps> = ({ id }) => {
  const [bindStatus, setBindStatus] = useState<'unbound' | 'pending' | 'bound'>('unbound');

  const handleBind = () => {
    setBindStatus('pending');
    setTimeout(() => setBindStatus('bound'), 1500);
  };

  const handleReset = () => {
    setBindStatus('unbound');
  };

  return (
    <section id={id} className="min-h-screen py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            有状态服务 & <span className="text-blue-500">数据持久化</span>
          </h2>
          <div className="prose prose-invert prose-lg text-slate-300 mb-8">
            <p className="mb-4">
              不同于随时可以销毁重建的无状态应用 (Stateless)，<strong>StatefulSet</strong> 管理的 Pod 具有固定的身份标识（例如 Pod-0 永远是 Pod-0）。为了在 Pod 重启后数据不丢失，K8s 引入了存储解耦的概念。
            </p>
            <p className="mb-4">
              主要包含两个核心对象：
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded text-purple-400 mt-1"><HardDrive size={18} /></div>
                <div>
                  <strong className="text-purple-300 block">Persistent Volume (PV)</strong>
                  <span className="text-sm">基础设施中的实际存储资源（例如 AWS EBS, NFS, 或本地磁盘）。它是集群级别的资源。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded text-blue-400 mt-1"><FileCheck size={18} /></div>
                <div>
                  <strong className="text-blue-300 block">Persistent Volume Claim (PVC)</strong>
                  <span className="text-sm">用户对存储的“申请书”。类似领用单：“我需要 10Gi 的读写存储”。K8s 会自动根据 PVC 匹配最合适的 PV。</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Side */}
        <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-mono text-sm uppercase tracking-widest text-slate-500">Binding Controller (绑定控制器)</h3>
            <button 
              onClick={bindStatus === 'bound' ? handleReset : handleBind}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <RefreshCw size={16} className={bindStatus === 'pending' ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="flex flex-col gap-8 relative">
            {/* PVC (The Request) */}
            <div className={`
              border-2 border-dashed rounded-lg p-6 transition-all duration-700
              ${bindStatus === 'unbound' ? 'border-blue-500/50 bg-blue-500/5 translate-y-0' : ''}
              ${bindStatus === 'pending' ? 'border-yellow-500/50 bg-yellow-500/5 translate-y-[50px] scale-95' : ''}
              ${bindStatus === 'bound' ? 'border-green-500 bg-green-500/10 translate-y-[120px] z-10' : ''}
            `}>
              <div className="flex items-center gap-4">
                <FileCheck className={bindStatus === 'bound' ? 'text-green-500' : 'text-blue-500'} />
                <div>
                  <div className="font-mono text-sm font-bold">claim-db-0 (PVC 申请)</div>
                  <div className="text-xs text-slate-400">需求: 10Gi, ReadWriteOnce</div>
                </div>
              </div>
            </div>

            {/* Connection Line */}
            <div className={`
              absolute left-1/2 -translate-x-1/2 top-[80px] w-0.5 bg-slate-700 transition-all duration-700
              ${bindStatus === 'unbound' ? 'h-16 opacity-50' : ''}
              ${bindStatus === 'pending' ? 'h-8 opacity-20' : ''}
              ${bindStatus === 'bound' ? 'h-0 opacity-0' : ''}
            `} />

            {/* PV (The Resource) */}
            <div className={`
              border-2 rounded-lg p-6 transition-all duration-700 mt-12
              ${bindStatus === 'unbound' ? 'border-slate-700 bg-slate-900' : ''}
              ${bindStatus === 'pending' ? 'border-yellow-500/50 bg-yellow-500/5 animate-pulse' : ''}
              ${bindStatus === 'bound' ? 'border-green-500 bg-green-500/10 -translate-y-[20px]' : ''}
            `}>
              <div className="flex items-center gap-4">
                <HardDrive className={bindStatus === 'bound' ? 'text-green-500' : 'text-purple-500'} />
                <div>
                  <div className="font-mono text-sm font-bold">pv-volume-123 (PV 资源)</div>
                  <div className="text-xs text-slate-400">容量: 20Gi, HostPath</div>
                </div>
              </div>
            </div>

            {/* Pod Connection */}
            <div className={`
               mt-8 p-4 rounded bg-slate-800 border border-slate-700 flex items-center justify-between transition-opacity duration-500
               ${bindStatus === 'bound' ? 'opacity-100' : 'opacity-30'}
            `}>
              <div className="flex items-center gap-3">
                <Database size={20} className="text-slate-400" />
                <span className="font-mono text-sm">Pod: db-0</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                已挂载至 /data
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
             <button 
               onClick={handleBind}
               disabled={bindStatus !== 'unbound'}
               className={`
                 px-6 py-2 rounded font-medium text-sm transition-all
                 ${bindStatus === 'unbound' 
                   ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50' 
                   : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
               `}
             >
               {bindStatus === 'bound' ? '绑定成功 (Bound)' : bindStatus === 'pending' ? '正在匹配...' : '模拟 PVC/PV 绑定'}
             </button>
          </div>

        </div>
      </div>
    </section>
  );
};