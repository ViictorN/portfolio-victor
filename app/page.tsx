'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence 
} from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Network, ShieldCheck, 
  Gauge, Menu, X, ArrowUpRight, Laptop, Smartphone, Layers, MonitorPlay
} from 'lucide-react';

// --- 1. CURSOR MAGNÉTICO ---
function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300 }; // Mais rápido e "elástico"
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      const target = e.target as HTMLElement;
      // Detecta qualquer elemento interativo
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A';
      setIsHovering(!!isInteractive);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" style={{ x: cursorXSpring, y: cursorYSpring }}>
      <motion.div 
        animate={{ 
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "rgba(16, 185, 129, 0.5)",
          borderColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "transparent",
          borderWidth: isHovering ? 1 : 0
        }}
        className="w-4 h-4 rounded-full backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
      >
        {!isHovering && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
      </motion.div>
    </motion.div>
  );
}

// --- 2. COMPONENTES UI (GLASS & TILT) ---

// Card 3D que inclina com o mouse (Usado no Hero)
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]); // Inverte eixo
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div 
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 3); // Suavidade
        y.set((e.clientY - centerY) / 3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}

// Card com Liquid Glass + Spotlight
function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-3xl glass-panel ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full p-6">{children}</div>
    </motion.div>
  );
}

// Navbar Glass
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-6 left-0 w-full z-50 px-4 md:px-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-black/30 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
          <span className="font-bold text-white tracking-wider text-sm">VIICTOR<span className="text-emerald-400">N</span></span>
        </div>

        <div className="hidden md:flex gap-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
          <a href="#skills" className="hover:text-white transition-colors">Habilidades</a>
          <a href="#projects" className="hover:text-white transition-colors">Projetos</a>
          <a href="#lab" className="hover:text-white transition-colors">Laboratório</a>
        </div>

        <div className="hidden md:block">
           <a href="mailto:victor140730@gmail.com" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all">Fale Comigo</a>
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden text-white"><Menu size={24} /></button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center gap-8">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-white"><X size={32} /></button>
            <nav className="flex flex-col items-center gap-8 text-3xl font-bold text-white tracking-tight">
              <a onClick={() => setIsOpen(false)} href="#skills">Habilidades</a>
              <a onClick={() => setIsOpen(false)} href="#projects">Projetos</a>
              <a onClick={() => setIsOpen(false)} href="#lab">Laboratório</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- DADOS ---
const skills = [
  { name: "Fibra Óptica", level: 98, icon: Wifi, color: "text-emerald-400" },
  { name: "Redes TCP/IP", level: 95, icon: Server, color: "text-blue-400" },
  { name: "Python", level: 85, icon: Code2, color: "text-yellow-400" },
  { name: "Hardware", level: 90, icon: Cpu, color: "text-orange-400" },
  { name: "Linux", level: 80, icon: Terminal, color: "text-purple-400" },
  { name: "React/Next", level: 75, icon: Zap, color: "text-cyan-400" },
  { name: "Database", level: 70, icon: Database, color: "text-pink-400" },
  { name: "Security", level: 85, icon: Lock, color: "text-red-400" },
];

const projects = [
  {
    title: "FiberOptic Sentinel",
    desc: "Monitoramento IoT para redes FTTH. Coleta dados via SNMP e alerta técnicos.",
    tags: ["Python", "IoT"],
    icon: Activity
  },
  {
    title: "AutoConfig Switch",
    desc: "Automação de provisionamento para Cisco/Huawei. Reduz setup em 70%.",
    tags: ["Bash", "Auto"],
    icon: Terminal
  },
  {
    title: "ISP Dashboard",
    desc: "Painel de gestão para provedores visualizarem tráfego e clientes.",
    tags: ["Next.js", "React"],
    icon: Globe
  },
  {
    title: "SecureNet VPN",
    desc: "Infraestrutura VPN WireGuard com Docker e autenticação 2FA.",
    tags: ["Security", "Docker"],
    icon: Lock
  },
  {
    title: "Smart OLT",
    desc: "Monitoramento visual de temperatura e sinal óptico integrado ao Zabbix.",
    tags: ["Zabbix", "Monitoring"],
    icon: Gauge
  },
  {
    title: "Radius Auth",
    desc: "Backend FreeRADIUS para autenticação PPPoE de alta performance.",
    tags: ["Backend", "DB"],
    icon: Server
  }
];

// --- FERRAMENTAS (INPUTS COM GLASS) ---
const GlassInput = ({ label, value, onChange, suffix }: any) => (
  <div className="mb-3">
    <label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 block ml-1">{label}</label>
    <div className="relative">
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-all"
      />
      {suffix && <span className="absolute right-3 top-2 text-xs text-slate-500">{suffix}</span>}
    </div>
  </div>
);

// Ferramentas simplificadas para caber no código
const FiberCalc = () => {
  const [val, setVal] = useState({ d: 10, s: 2 });
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><Activity size={16}/> Loss Budget</h4><GlassInput label="Km" value={val.d} onChange={(v:any)=>setVal({...val, d:v})} /><GlassInput label="Splices" value={val.s} onChange={(v:any)=>setVal({...val, s:v})} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-xl text-white">{((val.d*0.35)+(val.s*0.1)+1).toFixed(2)} dB</div></div>);
};
const DownloadCalc = () => {
  const [val, setVal] = useState({ s: 50, sp: 300 });
  const t = (val.s*8000)/val.sp;
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2"><Download size={16}/> Time Est.</h4><GlassInput label="GB" value={val.s} onChange={(v:any)=>setVal({...val, s:v})} /><GlassInput label="Mbps" value={val.sp} onChange={(v:any)=>setVal({...val, sp:v})} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-xl text-white">{t<60?t.toFixed(0)+'s':(t/60).toFixed(1)+'m'}</div></div>);
};
const SubnetCalc = () => {
  const [cidr, setCidr] = useState(24);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2"><Network size={16}/> Subnet</h4><div className="mb-4"><label className="text-xs text-slate-400 block mb-2">Prefix: /{cidr}</label><input type="range" min="16" max="30" value={cidr} onChange={(e)=>setCidr(Number(e.target.value))} className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none"/></div><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-xl text-white">{(Math.pow(2, 32-cidr)-2).toLocaleString()} hosts</div></div>);
};

export default function Portfolio() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-emerald-500/30">
      <MagneticCursor />
      <Navbar />

      {/* BACKGROUNDS */}
      <div className="aurora-bg" />
      <div className="perspective-grid" />
      
      <div className="relative z-10 px-4 md:px-6">
        
        {/* --- HERO SECTION (REDESENHADA) --- */}
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto pt-20">
          
          {/* Lado Esquerdo: Tipografia Impactante */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 mb-6 border border-emerald-500/30 bg-emerald-500/10 rounded-full">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Open to Work</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              HYBRID<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-white">TECH</span>NICIAN.
            </h1>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-8 mx-auto md:mx-0">
              A ponte definitiva entre a infraestrutura física de <strong>Telecom</strong> e a inteligência do <strong>Software</strong>.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold hover:scale-105 transition-transform">Projetos</button>
              <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">Contato</button>
            </div>
          </motion.div>

          {/* Lado Direito: Tilt Card 3D "ID Holográfico" */}
          <div className="flex-1 w-full max-w-sm hidden md:block">
            <TiltCard>
              <div className="glass-panel rounded-[30px] p-8 relative overflow-hidden aspect-[3/4] flex flex-col justify-between border-t border-l border-white/20 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 blur-[60px] rounded-full" />
                
                <div className="flex justify-between items-start">
                  <Cpu size={32} className="text-white/80" />
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest">ID REF</div>
                    <div className="font-mono text-emerald-400">VN-87PE</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-black border border-white/10 mx-auto flex items-center justify-center">
                     <span className="text-4xl">VN</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white">ViictorN</h3>
                    <p className="text-sm text-emerald-400 font-mono mt-1">Fullstack Tech</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl text-center border border-white/5">
                    <div className="text-slate-400 mb-1">LEVEL</div>
                    <div className="text-white font-bold">SENIOR</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-center border border-white/5">
                    <div className="text-slate-400 mb-1">STATUS</div>
                    <div className="text-emerald-400 font-bold animate-pulse">ONLINE</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* --- SECTION 1: HABILIDADES (HIERARQUIA REQUISITADA) --- */}
        <section id="skills" className="py-20 max-w-6xl mx-auto">
          <div className="mb-12 flex items-end gap-4">
             <h2 className="text-4xl md:text-5xl font-bold text-white">Dominância<br/><span className="text-slate-600">Técnica.</span></h2>
             <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent mb-4" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <GlassCard key={i} delay={i * 0.05} className="hover:border-emerald-500/30 transition-colors flex flex-col items-center justify-center text-center py-8">
                <skill.icon size={32} className={`${skill.color} mb-4`} />
                <h3 className="text-white font-bold mb-2">{skill.name}</h3>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1 }}
                    className={`h-full bg-current ${skill.color}`} 
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: PROJETOS --- */}
        <section id="projects" className="py-20 max-w-6xl mx-auto">
           <div className="mb-12 flex items-end gap-4">
             <h2 className="text-4xl md:text-5xl font-bold text-white">Projetos<br/><span className="text-slate-600">Recentes.</span></h2>
             <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                    <project.icon size={20} />
                  </div>
                  <div className="px-2 py-1 rounded text-[10px] font-bold bg-white/5 text-slate-400 border border-white/5">2025</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">{tag}</span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: LABORATÓRIO (MOVIDO PARA O FIM) --- */}
        <section id="lab" className="py-20 max-w-6xl mx-auto pb-40">
          <div className="glass-panel rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            
            <div className="mb-12 text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                 <MonitorPlay size={12} /> Interactive Area
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Laboratório de Testes</h2>
               <p className="text-slate-400 max-w-xl mx-auto">Ferramentas funcionais desenvolvidas para demonstrar lógica de programação aplicada a telecomunicações.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="bg-black/40"><FiberCalc /></GlassCard>
              <GlassCard className="bg-black/40"><DownloadCalc /></GlassCard>
              <GlassCard className="bg-black/40"><SubnetCalc /></GlassCard>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/10 py-12 bg-black text-center relative z-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
             <div className="text-left">
               <h4 className="font-bold text-white">ViictorN</h4>
               <p className="text-xs text-slate-500">Pernambuco, Brasil.</p>
             </div>
             <div className="flex gap-6 text-sm mt-4 md:mt-0">
               <a href="#" className="hover:text-emerald-400">Email</a>
               <a href="#" className="hover:text-emerald-400">LinkedIn</a>
               <a href="#" className="hover:text-emerald-400">GitHub</a>
             </div>
          </div>
        </footer>

      </div>
    </main>
  );
}