'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Calculator, Timer, ArrowRight
} from 'lucide-react';

// --- COMPONENTE: CARD COM EFEITO SPOTLIGHT (ESTILO APPLE) ---
function SpotlightCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      className={`group relative border border-white/10 bg-gray-900/40 overflow-hidden rounded-3xl ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full bg-black/20 backdrop-blur-2xl p-8 rounded-3xl saturate-150">
        {children}
      </div>
    </motion.div>
  );
}

// --- WIDGET FUNCIONAL: CALCULADORA DE TRANSFERÊNCIA ---
function NetworkCalculator() {
  const [fileSize, setFileSize] = useState<number>(10); // GB
  const [speed, setSpeed] = useState<number>(100); // Mbps
  
  // Lógica real de conversão
  const calculateTime = () => {
    const totalMegabits = fileSize * 8000;
    const seconds = totalMegabits / speed;
    
    if (seconds < 60) return `${seconds.toFixed(1)} Segundos`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} Minutos`;
    return `${(seconds / 3600).toFixed(1)} Horas`;
  };

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4 text-emerald-400">
        <Calculator size={20} />
        <span className="font-mono text-sm uppercase tracking-wider">Interactive Tool v1.0</span>
      </div>
      <h3 className="text-white font-bold mb-4">Estimativa de Download</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Tamanho do Arquivo: <span className="text-white">{fileSize} GB</span></label>
          <input 
            type="range" min="1" max="100" value={fileSize} 
            onChange={(e) => setFileSize(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Velocidade de Internet: <span className="text-white">{speed} Mbps</span></label>
          <input 
            type="range" min="10" max="1000" value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
        <div className="text-xs text-emerald-300">Tempo Estimado</div>
        <div className="text-xl font-bold text-emerald-400 font-mono">{calculateTime()}</div>
      </div>
    </div>
  );
}

// --- DADOS DO CURRÍCULO (EXPANDIDOS) ---
const projects = [
  {
    title: "FiberOptic Sentinel",
    desc: "Monitoramento IoT para redes FTTH. Script Python que analisa atenuação em tempo real via SNMP.",
    tags: ["Python", "SNMP", "IoT"],
    icon: Activity
  },
  {
    title: "AutoConfig Deploy",
    desc: "Automação de provisionamento para OLTs e Switches (Huawei/Cisco) reduzindo setup manual em 70%.",
    tags: ["Bash", "Network Automation"],
    icon: Terminal
  },
  {
    title: "ISP Client Dashboard",
    desc: "Painel web moderno para gestão de assinantes, integrado com Radius e APIs de pagamento.",
    tags: ["Next.js", "React", "Node.js"],
    icon: Globe
  },
  {
    title: "SecureNet VPN",
    desc: "Implementação de servidor VPN corporativo com autenticação de dois fatores e logs automatizados.",
    tags: ["Linux", "Security", "Docker"],
    icon: Lock
  }
];

const skills = [
  { name: "Fibra Óptica & FTTH", level: 98, icon: Wifi },
  { name: "Redes & TCP/IP", level: 95, icon: Server },
  { name: "Python & Scripting", level: 85, icon: Code2 },
  { name: "Config. Hardware", level: 90, icon: Cpu },
  { name: "Linux & Servidores", level: 80, icon: Terminal },
  { name: "Banco de Dados", level: 70, icon: Database },
  { name: "React & Frontend", level: 75, icon: Zap },
  { name: "Segurança de Redes", level: 85, icon: Lock },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito global de mouse para o background
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* Backgrounds */}
      <div className="fixed inset-0 bg-grid z-0 opacity-20" />
      <div className="spotlight" /> {/* O Holofote Global */}
      
      <div className="relative z-10 px-6">
        
        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center relative max-w-7xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              🚀 Disponível para Projetos Inovadores
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">
              Victor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Gomes</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Técnico em Telecomunicações híbrido. Eu construo a infraestrutura física que conecta o mundo e o software que a faz inteligente.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-2">
                <Mail size={18}/> Fale Comigo
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full backdrop-blur-md transition-all flex items-center gap-2">
                <Github size={18}/> GitHub
              </button>
            </div>
          </motion.div>

          {/* DEMONSTRAÇÃO DE CÓDIGO INTERATIVO */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 w-full max-w-4xl"
          >
            <SpotlightCard>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Engenharia + Código</h3>
                  <p className="text-slate-400 mb-6">
                    Não sou apenas um técnico que passa cabos. Eu crio ferramentas para otimizar redes. 
                    Veja este exemplo funcional de uma ferramenta que desenvolvi para cálculos rápidos de banda.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2"><ArrowRight size={14} className="text-emerald-500"/> React State Management</li>
                    <li className="flex items-center gap-2"><ArrowRight size={14} className="text-emerald-500"/> Real-time Calculation</li>
                    <li className="flex items-center gap-2"><ArrowRight size={14} className="text-emerald-500"/> Tailwind Styles</li>
                  </ul>
                </div>
                
                {/* O WIDGET FUNCIONAL AQUI */}
                <NetworkCalculator />
              </div>
            </SpotlightCard>
          </motion.div>

          <div className="absolute bottom-10 animate-bounce text-slate-600">
            <ChevronDown />
          </div>
        </section>

        {/* SKILLS - BENTO GRID STYLE */}
        <section className="py-32 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Arsenal Técnico</h2>
            <p className="text-slate-400">Uma combinação rara de Hardware, Redes e Desenvolvimento.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <SpotlightCard key={i} delay={i * 0.1} className="flex flex-col items-center justify-center text-center p-6 h-full">
                <div className="p-4 rounded-full bg-white/5 mb-4 ring-1 ring-white/10">
                  <skill.icon size={24} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{skill.name}</h3>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* PROJETOS */}
        <section className="py-20 max-w-7xl mx-auto pb-40">
          <h2 className="text-4xl font-bold text-white mb-12">Projetos de Alto Nível</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <SpotlightCard key={i} delay={i * 0.2}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-white/10">
                    <project.icon className="text-emerald-400" />
                  </div>
                  <ExternalLinkButton />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-12 text-center">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">ViictorN</h3>
              <p className="text-slate-500 text-sm">Fullstack Network Technician</p>
            </div>
            <div className="flex gap-6">
              <a href="mailto:victor140730@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors">victor140730@gmail.com</a>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400">(87) 98164-1911</span>
            </div>
            <p className="text-slate-600 text-sm">© 2025. Construído com Next.js 14.</p>
          </div>
        </footer>

      </div>
    </main>
  );
}

// Botão auxiliar para manter o código limpo
const ExternalLinkButton = () => (
  <button className="text-slate-500 hover:text-white transition-colors">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  </button>
);