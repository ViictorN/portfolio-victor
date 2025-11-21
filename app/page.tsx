'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Calculator, ArrowRight,
  Radio, Network, ShieldCheck, Gauge
} from 'lucide-react';

// --- COMPONENTES VISUAIS (UI KITS) ---

// Card com efeito de iluminação (Spotlight)
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
              rgba(16, 185, 129, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
        {children}
      </div>
    </motion.div>
  );
}

// Input customizado estilo Apple/Moderno
const InputField = ({ label, value, onChange, type = "number", suffix = "" }: any) => (
  <div className="mb-4">
    <label className="text-xs text-slate-400 mb-1.5 block ml-1">{label}</label>
    <div className="relative group">
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
      />
      {suffix && <span className="absolute right-4 top-2.5 text-xs text-slate-500">{suffix}</span>}
    </div>
  </div>
);

// --- AS 6 FERRAMENTAS FUNCIONAIS (MINI APPS) ---

// 1. Calculadora de Fibra Óptica
const FiberCalc = () => {
  const [dist, setDist] = useState(10); // km
  const [splices, setSplices] = useState(2);
  // Fórmula: (Km * 0.35) + (Emendas * 0.1) + (Conectores * 0.5)
  const loss = (dist * 0.35) + (splices * 0.1) + (2 * 0.5); 
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-400 mb-2">
        <Activity size={18} /> <h4 className="font-bold text-white">Optical Loss Budget</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Estima a atenuação total do link óptico.</p>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Distância (km)" value={dist} onChange={setDist} />
        <InputField label="Emendas (qtd)" value={splices} onChange={setSplices} />
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex justify-between items-center">
        <span className="text-xs text-emerald-200">Perda Estimada</span>
        <span className="text-lg font-bold text-emerald-400">{loss.toFixed(2)} dB</span>
      </div>
    </div>
  );
};

// 2. Download Time Estimator
const DownloadCalc = () => {
  const [size, setSize] = useState(50); // GB
  const [speed, setSpeed] = useState(300); // Mbps
  const time = (size * 8000) / speed; // em segundos
  const formattedTime = time < 60 ? `${time.toFixed(0)} seg` : time < 3600 ? `${(time/60).toFixed(1)} min` : `${(time/3600).toFixed(1)} horas`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-cyan-400 mb-2">
        <Download size={18} /> <h4 className="font-bold text-white">Tempo de Download</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Cálculo de transferência de dados.</p>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Arquivo (GB)" value={size} onChange={setSize} />
        <InputField label="Internet (Mbps)" value={speed} onChange={setSpeed} />
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl flex justify-between items-center">
        <span className="text-xs text-cyan-200">Tempo Total</span>
        <span className="text-lg font-bold text-cyan-400">{formattedTime}</span>
      </div>
    </div>
  );
};

// 3. Conversor dBm <-> mW
const PowerConverter = () => {
  const [dbm, setDbm] = useState(0);
  const mw = Math.pow(10, dbm / 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-purple-400 mb-2">
        <Zap size={18} /> <h4 className="font-bold text-white">Conversor RF (dBm)</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Converte potência logarítmica para linear.</p>
      <InputField label="Potência (dBm)" value={dbm} onChange={setDbm} suffix="dBm" />
      <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl flex justify-between items-center">
        <span className="text-xs text-purple-200">Equivalente</span>
        <span className="text-lg font-bold text-purple-400">{mw.toFixed(4)} mW</span>
      </div>
    </div>
  );
};

// 4. Calculadora CIDR (Subnet)
const SubnetCalc = () => {
  const [cidr, setCidr] = useState(24);
  const hosts = Math.pow(2, 32 - cidr) - 2;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-orange-400 mb-2">
        <Network size={18} /> <h4 className="font-bold text-white">Calculadora IPv4</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Capacidade de hosts por máscara CIDR.</p>
      
      <div className="mb-4">
        <label className="text-xs text-slate-400 mb-1.5 block">Máscara (/{cidr})</label>
        <input 
          type="range" min="16" max="30" value={cidr} 
          onChange={(e) => setCidr(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl flex justify-between items-center">
        <span className="text-xs text-orange-200">Hosts Úteis</span>
        <span className="text-lg font-bold text-orange-400">{hosts.toLocaleString()} IPs</span>
      </div>
    </div>
  );
};

// 5. Validador de MAC Address (Regex)
const MacValidator = () => {
  const [mac, setMac] = useState("");
  const isValid = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-rose-400 mb-2">
        <ShieldCheck size={18} /> <h4 className="font-bold text-white">MAC Validator</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Verifica formatação de endereços físicos.</p>
      <InputField label="MAC Address" value={mac} onChange={setMac} type="text" suffix={isValid ? "✓" : "✕"} />
      <div className={`p-3 rounded-xl flex justify-between items-center border transition-colors ${isValid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
        <span className="text-xs text-slate-300">Status</span>
        <span className={`text-sm font-bold ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
          {mac.length === 0 ? "Aguardando..." : isValid ? "VÁLIDO" : "INVÁLIDO"}
        </span>
      </div>
    </div>
  );
};

// 6. Simulador de Latência (Async Demo)
const PingSim = () => {
  const [ping, setPing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const runPing = async () => {
    setLoading(true);
    setPing(null);
    // Simula delay de rede (Async/Await)
    await new Promise(r => setTimeout(r, 800));
    const randomPing = Math.floor(Math.random() * (80 - 10) + 10);
    setPing(randomPing);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-400 mb-2">
        <Gauge size={18} /> <h4 className="font-bold text-white">Ping Simulator</h4>
      </div>
      <p className="text-xs text-slate-400 mb-4">Demo de funções assíncronas (Async/Await).</p>
      
      <button 
        onClick={runPing}
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white text-sm font-medium transition-all"
      >
        {loading ? "Enviando pacotes..." : "Testar Latência"}
      </button>

      <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex justify-between items-center mt-4">
        <span className="text-xs text-blue-200">Resultado</span>
        <span className="text-lg font-bold text-blue-400">
          {ping ? `${ping} ms` : "--"}
        </span>
      </div>
    </div>
  );
};

// --- DADOS DO CURRÍCULO ---

const projects = [
  {
    title: "FiberOptic Sentinel",
    desc: "Monitoramento IoT para redes FTTH. Script Python que analisa atenuação via SNMP.",
    tags: ["Python", "SNMP", "IoT"],
    icon: Activity
  },
  {
    title: "AutoConfig Deploy",
    desc: "Automação de provisionamento para OLTs e Switches reduzindo setup em 70%.",
    tags: ["Bash", "Network Automation"],
    icon: Terminal
  },
  {
    title: "ISP Client Dashboard",
    desc: "Painel web moderno para gestão de assinantes, integrado com Radius.",
    tags: ["Next.js", "React", "Node.js"],
    icon: Globe
  },
];

const skills = [
  { name: "Fibra Óptica", level: 98, icon: Wifi },
  { name: "Redes TCP/IP", level: 95, icon: Server },
  { name: "Python", level: 85, icon: Code2 },
  { name: "Linux Server", level: 80, icon: Terminal },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="spotlight fixed inset-0 z-0 pointer-events-none" />
      
      <div className="relative z-10 px-6">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center relative max-w-7xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              Fullstack Network Technician
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">
              Victor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Gomes</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Construindo pontes entre a infraestrutura física e a inteligência do software. 
              Especialista em Telecomunicações, Fibra Óptica e Desenvolvimento Moderno.
            </p>
          </motion.div>

          {/* LAB SECTION (AS 6 FERRAMENTAS) */}
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">Laboratório de Ferramentas</h3>
              <span className="text-xs px-2 py-1 bg-white/10 rounded text-slate-400">Live Demo</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpotlightCard delay={0.1}><FiberCalc /></SpotlightCard>
              <SpotlightCard delay={0.2}><DownloadCalc /></SpotlightCard>
              <SpotlightCard delay={0.3}><SubnetCalc /></SpotlightCard>
              <SpotlightCard delay={0.4}><PowerConverter /></SpotlightCard>
              <SpotlightCard delay={0.5}><PingSim /></SpotlightCard>
              <SpotlightCard delay={0.6}><MacValidator /></SpotlightCard>
            </div>
          </div>

          <div className="mt-20 animate-bounce text-slate-600">
            <ChevronDown />
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-32 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Dominância Técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <SpotlightCard key={i} delay={i * 0.1} className="flex flex-col items-center justify-center text-center p-6">
                <div className="p-4 rounded-full bg-white/5 mb-4 ring-1 ring-white/10 group-hover:bg-emerald-500/20 transition-colors">
                  <skill.icon size={24} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{skill.name}</h3>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">ViictorN</h3>
              <p className="text-slate-500 text-sm">Conectividade & Código</p>
            </div>
            <div className="flex gap-6">
              <a href="mailto:victor140730@gmail.com" className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors">
                <Mail size={16}/> Fale Comigo
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors">
                <Linkedin size={16}/> LinkedIn
              </a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}