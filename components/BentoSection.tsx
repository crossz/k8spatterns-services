import React, { useState } from 'react';
import { Bot, Package, Layers, ArrowRight, Cpu, Container } from 'lucide-react';

interface SectionProps {
  id: string;
}

export const BentoSection: React.FC<SectionProps> = ({ id }) => {
  const [step, setStep] = useState(1);

  return (
    <section id={id} className="min-h-screen py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            AI 推理服务自动化 <br/>
            <span className="text-emerald-400">From Model to Kubernetes</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-4xl">
            传统应用开发和 AI 模型上线之间存在巨大鸿沟。<strong>BentoML</strong> 提供了一个标准化的框架，将机器学习模型打包成生产级 API 服务。
            它深度利用了 Kubernetes 的能力，实现了从“Python 脚本”到“高并发微服务”的无缝转换。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Logic Explanation */}
          <div className="space-y-8">
            <div 
              className={`p-6 rounded-xl border transition-all cursor-pointer ${step === 1 ? 'bg-emerald-900/20 border-emerald-500' : 'bg-slate-900 border-slate-800 opacity-50'}`}
              onClick={() => setStep(1)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-500/20 p-2 rounded text-emerald-400 font-mono">1. Define</div>
                <h3 className="text-xl font-bold">定义服务逻辑</h3>
              </div>
              <p className="text-slate-400">
                不再需要手写 Flask/FastAPI 样板代码。BentoML 提供了针对 AI 优化的装饰器。
                <code>@bentoml.service</code> 自动处理输入输出序列化、OpenAPI 文档生成。
              </p>
            </div>

            <div 
              className={`p-6 rounded-xl border transition-all cursor-pointer ${step === 2 ? 'bg-blue-900/20 border-blue-500' : 'bg-slate-900 border-slate-800 opacity-50'}`}
              onClick={() => setStep(2)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/20 p-2 rounded text-blue-400 font-mono">2. Build</div>
                <h3 className="text-xl font-bold">标准化打包 (Bento)</h3>
              </div>
              <p className="text-slate-400">
                <code>bentoml build</code> 将代码、模型文件 (Pickle/Safetensors)、Python 依赖 (pip/conda) 打包成一个统一的 "Bento" 归档。
                这解决了“在我本地能跑”的经典依赖地狱问题。
              </p>
            </div>

            <div 
              className={`p-6 rounded-xl border transition-all cursor-pointer ${step === 3 ? 'bg-purple-900/20 border-purple-500' : 'bg-slate-900 border-slate-800 opacity-50'}`}
              onClick={() => setStep(3)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500/20 p-2 rounded text-purple-400 font-mono">3. Deploy on K8s</div>
                <h3 className="text-xl font-bold">Runner 架构与自动扩缩</h3>
              </div>
              <p className="text-slate-400">
                这是 BentoML 在 K8s 上的杀手锏。它生成的镜像可以自动将 <strong>API Server (I/O 密集型)</strong> 和 <strong>Runner (计算密集型/GPU)</strong> 拆分为不同的 Pod。
                <br/><span className="text-purple-300 text-sm mt-2 block">优势：API 层可以在 CPU 节点便宜地扩容，而 Runner 层独立在昂贵的 GPU 节点上按需扩容。还支持 Adaptive Batching（自适应批处理）来提升吞吐。</span>
              </p>
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 relative flex items-center justify-center min-h-[500px]">
            
            {/* Step 1 Visual */}
            <div className={`absolute transition-all duration-500 flex flex-col items-center ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
               <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-64">
                 <div className="text-xs text-slate-500 mb-2">service.py</div>
                 <pre className="text-xs font-mono text-emerald-400">
                   @bentoml.service<br/>
                   class MyModel:<br/>
                   &nbsp;&nbsp;@bentoml.api<br/>
                   &nbsp;&nbsp;def predict(self, img):<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;return model(img)
                 </pre>
               </div>
               <ArrowDown className="my-4 text-slate-600 animate-bounce" />
               <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-48 flex items-center justify-center gap-2">
                 <Bot size={20} className="text-slate-400" />
                 <span>Local Inference</span>
               </div>
            </div>

            {/* Step 2 Visual */}
            <div className={`absolute transition-all duration-500 flex flex-col items-center ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
               <div className="relative">
                 <div className="w-48 h-56 bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-500 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <Package size={48} className="text-blue-400 mb-4" />
                    <span className="font-bold text-lg">Bento</span>
                    <span className="text-xs text-slate-400 mt-2">Version: v1.0.0</span>
                 </div>
                 {/* Floating items into box */}
                 <span className="absolute -left-12 top-10 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">Model</span>
                 <span className="absolute -right-12 top-20 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">Code</span>
                 <span className="absolute -left-8 bottom-10 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">Config</span>
               </div>
               <div className="mt-8 flex items-center gap-2 text-sm text-blue-400">
                  <ArrowRight size={16} />
                  <span>Generating Docker Image</span>
               </div>
            </div>

            {/* Step 3 Visual */}
            <div className={`absolute transition-all duration-500 w-full ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
               <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 relative">
                 <span className="absolute -top-3 left-4 bg-slate-950 px-2 text-slate-500 text-xs">Kubernetes Cluster</span>
                 
                 {/* Ingress / Service */}
                 <div className="flex justify-center mb-6">
                    <div className="bg-emerald-900/30 border border-emerald-500 px-4 py-2 rounded text-sm text-emerald-300">
                      K8s Service (LoadBalancer)
                    </div>
                 </div>

                 {/* Split Architecture */}
                 <div className="grid grid-cols-2 gap-4">
                    {/* API Server Pods */}
                    <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col gap-2">
                       <span className="text-xs text-slate-400 flex items-center gap-1"><Container size={12}/> API Servers (CPU)</span>
                       <div className="flex gap-2">
                          <div className="h-8 w-8 bg-blue-600 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-blue-600 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                       </div>
                       <span className="text-[10px] text-slate-500">Handling JSON, Validation, Queueing</span>
                    </div>

                    {/* Runner Pods */}
                    <div className="bg-slate-900 p-4 rounded border border-slate-700 flex flex-col gap-2 relative overflow-hidden">
                       <div className="absolute inset-0 bg-purple-500/5"></div>
                       <span className="text-xs text-purple-400 flex items-center gap-1"><Cpu size={12}/> Model Runners (GPU)</span>
                       <div className="flex gap-2">
                          <div className="h-8 w-8 bg-purple-600 rounded shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>
                       </div>
                       <span className="text-[10px] text-slate-500">Adaptive Batching Execution</span>
                    </div>
                 </div>

                 {/* Flow Lines */}
                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Simplified connection lines could go here, but omitted for clean CSS */}
                 </div>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// Helper for ArrowDown in JSX
const ArrowDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);