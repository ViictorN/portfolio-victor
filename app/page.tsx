'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Network, ShieldCheck, 
  Gauge, Menu, X, ArrowRight, Laptop, Smartphone
} from 'lucide-react';

// --- 1. CURSOR LIQUID GLASS PERSONALIZADO ---
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Verifica se está passando sobre algo clicável
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      {/* O Círculo "Liquid Glass" */}
      <motion.div 
        animate={{ 
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 255, 255, 0.05)",
          borderColor: isHovering ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.2)"
        }}
        className="w-8 h-8 rounded-full border backdrop-blur-[2px] flex items-center justify-center transition-colors duration-300"
      >
        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
      </motion.div>
    </motion.div>
  );
}

// --- 2. MENU DE NAVEGAÇÃO (HAMBURGUER + DESKTOP) ---
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"/>
          <span className="font-bold text-white tracking-tight">ViictorN</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">Início</a>
          <a href="#lab" className="hover:text-emerald-400 transition-colors">Ferramentas</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projetos</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center gap-6 text-2xl font-bold text-white">
              <a onClick={() => setIsOpen(false)} href="#hero" className="hover:text-emerald-400">Início</a>
              <a onClick={() => setIsOpen(false)} href="#lab" className="hover:text-emerald-400">Laboratório</a>
              <a onClick={() => setIsOpen(false)} href="#skills" className="hover:text-emerald-400">Habilidades</a>
              <a onClick={() => setIsOpen(false)} href="#projects" className="hover:text-emerald-400">Projetos</a>
              <a onClick={() => setIsOpen(false)} href="mailto:victor140730@gmail.com" className="text-emerald-500 mt-4 text-lg font-medium">Fale Comigo</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- COMPONENTES UI ---
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
      className={`group relative border border-white/10 bg-gray-900/20 overflow-hidden rounded-3xl ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full bg-black/20 backdrop-blur-lg p-6 rounded-3xl border border-white/5 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

const InputField = ({ label, value, onChange, type = "number", suffix = "" }: any) => (
  <div className="mb-4 w-full">
    <label className="text-xs text-slate-400 mb-1.5 block ml-1">{label}</label>
    <div className="relative group">
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
      />
      {suffix && <span className="absolute right-4 top-3 text-xs text-slate-500">{suffix}</span>}
    </div>
  </div>
);

// --- MINI FERRAMENTAS ---
const FiberCalc = () => {
  const [dist, setDist] = useState(10);
  const [splices, setSplices] = useState(2);
  const loss = (dist * 0.35) + (splices * 0.1) + (2 * 0.5); 
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-emerald-400 mb-2">
        <Activity size={18} /> <h4 className="font-bold text-white">Optical Loss Budget</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Cálculo de atenuação em fibra.</p>
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Km" value={dist} onChange={setDist} />
        <InputField label="Emendas" value={splices} onChange={setSplices} />
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex justify-between items-center mt-auto">
        <span className="text-xs text-emerald-200">Total</span>
        <span className="text-lg font-bold text-emerald-400">{loss.toFixed(2)} dB</span>
      </div>
    </div>
  );
};

const DownloadCalc = () => {
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(300);
  const time = (size * 8000) / speed;
  const formattedTime = time < 60 ? `${time.toFixed(0)}s` : time < 3600 ? `${(time/60).toFixed(1)}m` : `${(time/3600).toFixed(1)}h`;
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-cyan-400 mb-2">
        <Download size={18} /> <h4 className="font-bold text-white">Download Time</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Estimativa de transferência.</p>
      <div className="grid grid-cols-2 gap-3">
        <InputField label="GB" value={size} onChange={setSize} />
        <InputField label="Mbps" value={speed} onChange={setSpeed} />
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl flex justify-between items-center mt-auto">
        <span className="text-xs text-cyan-200">Tempo</span>
        <span className="text-lg font-bold text-cyan-400">{formattedTime}</span>
      </div>
    </div>
  );
};

const PowerConverter = () => {
  const [dbm, setDbm] = useState(0);
  const mw = Math.pow(10, dbm / 10);
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-purple-400 mb-2">
        <Zap size={18} /> <h4 className="font-bold text-white">Conversor RF</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">dBm para mW.</p>
      <InputField label="Potência (dBm)" value={dbm} onChange={setDbm} suffix="dBm" />
      <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl flex justify-between items-center mt-auto">
        <span className="text-xs text-purple-200">Linear</span>
        <span className="text-lg font-bold text-purple-400">{mw.toFixed(4)} mW</span>
      </div>
    </div>
  );
};

const SubnetCalc = () => {
  const [cidr, setCidr] = useState(24);
  const hosts = Math.pow(2, 32 - cidr) - 2;
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-orange-400 mb-2">
        <Network size={18} /> <h4 className="font-bold text-white">Calc. IPv4</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Hosts por CIDR.</p>
      <div className="mb-4">
        <label className="text-xs text-slate-400 mb-1.5 block">Máscara (/{cidr})</label>
        <input type="range" min="16" max="30" value={cidr} onChange={(e) => setCidr(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"/>
      </div>
      <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl flex justify-between items-center mt-auto">
        <span className="text-xs text-orange-200">Hosts</span>
        <span className="text-lg font-bold text-orange-400">{hosts.toLocaleString()}</span>
      </div>
    </div>
  );
};

const MacValidator = () => {
  const [mac, setMac] = useState("");
  const isValid = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-rose-400 mb-2">
        <ShieldCheck size={18} /> <h4 className="font-bold text-white">MAC Regex</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Validador de endereço físico.</p>
      <InputField label="Endereço MAC" value={mac} onChange={setMac} type="text" suffix={isValid ? "✓" : ""} />
      <div className={`p-3 rounded-xl flex justify-between items-center border transition-colors mt-auto ${isValid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
        <span className="text-xs text-slate-300">Status</span>
        <span className={`text-sm font-bold ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>{mac.length === 0 ? "..." : isValid ? "VÁLIDO" : "INVÁLIDO"}</span>
      </div>
    </div>
  );
};

const PingSim = () => {
  const [ping, setPing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const runPing = async () => {
    setLoading(true); setPing(null);
    await new Promise(r => setTimeout(r, 800));
    setPing(Math.floor(Math.random() * (80 - 10) + 10));
    setLoading(false);
  };
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 text-blue-400 mb-2">
        <Gauge size={18} /> <h4 className="font-bold text-white">Ping Async</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Teste de latência assíncrona.</p>
      <button onClick={runPing} disabled={loading} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white text-sm font-medium transition-all mt-auto">
        {loading ? "Enviando..." : "Testar Ping"}
      </button>
      {ping && (
         <div className="mt-3 text-center text-blue-400 font-bold font-mono">{ping} ms</div>
      )}
    </div>
  );
};

// --- DADOS ---

const skills = [
  { name: "Fibra Óptica & FTTH", level: 98, icon: Wifi },
  { name: "Redes & TCP/IP", level: 95, icon: Server },
  { name: "Python & Scripting", level: 85, icon: Code2 },
  { name: "Config. Hardware", level: 90, icon: Cpu },
  { name: "Linux & Servers", level: 80, icon: Terminal },
  { name: "Banco de Dados", level: 70, icon: Database },
  { name: "React & Frontend", level: 75, icon: Zap },
  { name: "Segurança de Redes", level: 85, icon: Lock },
];

const projects = [
  {
    title: "FiberOptic Sentinel",
    desc: "Monitoramento de atenuação em tempo real via SNMP com alertas no Telegram.",
    tags: ["Python", "SNMP", "Bot"],
    icon: Activity
  },
  {
    title: "AutoConfig Switch",
    desc: "Provisionamento zero-touch de switches Cisco/Huawei, reduzindo setup em 70%.",
    tags: ["Bash", "Cisco CLI"],
    icon: Terminal
  },
  {
    title: "ISP Manager UI",
    desc: "Dashboard administrativo para provedores de internet visualizarem consumo.",
    tags: ["Next.js", "Tailwind"],
    icon: Globe
  },
  {
    title: "SecureNet VPN",
    desc: "Servidor VPN WireGuard em Docker com autenticação 2FA para acesso remoto.",
    tags: ["Docker", "Security"],
    icon: Lock
  },
  {
    title: "Smart OLT Monitor",
    desc: "Integração Zabbix para visualização gráfica de temperatura e tráfego de OLTs.",
    tags: ["Zabbix", "Monitoring"],
    icon: Gauge
  },
  {
    title: "Radius Auth",
    desc: "Servidor FreeRADIUS para autenticação centralizada PPPoE.",
    tags: ["Backend", "Database"],
    icon: Server
  }
];

// --- PÁGINA PRINCIPAL ---
export default function Portfolio() {
  return (
    <main className="relative min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      <CustomCursor />
      <Navbar />
      
      {/* Backgrounds Animados */}
      <div className="fixed inset-0 z-0">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="bg-grid-pattern" />
      </div>
      
      <div className="relative z-10 px-4 md:px-6">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative max-w-7xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="text-center mb-12 md:mb-24 w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs md:text-sm font-medium text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              Fullstack Network Technician
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight mb-6 leading-tight">
              Viictor<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">N</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              Conectando o mundo físico das <strong>Telecomunicações</strong> com a inteligência do <strong>Desenvolvimento Moderno</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full px-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
                <Mail size={18}/> Entrar em Contato
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2">
                <Download size={18}/> Baixar CV
              </button>
            </div>
          </motion.div>

          <div className="absolute bottom-10 animate-bounce text-slate-500 hidden md:block">
            <ChevronDown />
          </div>
        </section>

        {/* LAB SECTION */}
        <section id="lab" className="py-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 px-2">
            <div>
              <div className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-2">Live Demo</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Laboratório Interativo</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm mt-4 md:mt-0">
              <Terminal size={16} /> Ferramentas funcionais
            </div>
          </div>
          
          {/* Grid Responsivo: 1 col mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <SpotlightCard delay={0.1}><FiberCalc /></SpotlightCard>
            <SpotlightCard delay={0.2}><DownloadCalc /></SpotlightCard>
            <SpotlightCard delay={0.3}><SubnetCalc /></SpotlightCard>
            <SpotlightCard delay={0.4}><PowerConverter /></SpotlightCard>
            <SpotlightCard delay={0.5}><PingSim /></SpotlightCard>
            <SpotlightCard delay={0.6}><MacValidator /></SpotlightCard>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16 px-2">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dominância Técnica</h2>
             <p className="text-slate-400">Stack completa: do Cabo ao Código.</p>
          </div>
          
          {/* Grid Responsivo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {skills.map((skill, i) => (
              <SpotlightCard key={i} delay={i * 0.1} className="flex flex-col items-center justify-center text-center p-4 md:p-6 h-full">
                <div className="p-3 md:p-4 rounded-full bg-white/5 mb-3 md:mb-4 ring-1 ring-white/10 group-hover:bg-emerald-500/20 transition-colors">
                  <skill.icon size={20} className="text-emerald-400 md:w-6 md:h-6" />
                </div>
                <h3 className="font-bold text-white mb-2 text-xs md:text-sm">{skill.name}</h3>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
                <span className="text-[10px] md:text-xs text-slate-500 mt-2">{skill.level}%</span>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 max-w-7xl mx-auto pb-40">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 px-2">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <SpotlightCard key={i} delay={i * 0.15}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-white/10">
                    <project.icon className="text-emerald-400" size={24} />
                  </div>
                  <ArrowRight className="text-slate-600 -rotate-45 group-hover:text-white group-hover:rotate-0 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-xs text-slate-300 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-12 text-center relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">ViictorN</h3>
              <p className="text-slate-500 text-sm">Bom Conselho - PE</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm">
              <a href="mailto:victor140730@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-2">
                <Mail size={16}/> victor140730@gmail.com
              </a>
              <span className="hidden md:inline text-slate-700">|</span>
              <span className="text-slate-400 flex items-center justify-center gap-2">
                <Phone size={16}/> (87) 98164-1911
              </span>
            </div>
            <p className="text-slate-600 text-xs md:text-sm">© 2025. ViictorN.</p>
          </div>
        </footer>

      </div>
    </main>
  );
}