'use client';

import React, { useState, useEffect } from 'react';
import { 
  motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence 
} from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Network, ShieldCheck, 
  Gauge, Menu, X, ArrowUpRight, HardDrive, Signal, 
  Search, MapPin, Clock, ArrowUp, Cable, Radio
} from 'lucide-react';

// --- 1. CURSOR MAGNÉTICO ---
function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('input');
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
          borderWidth: isHovering ? 1 : 0,
          borderColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "transparent"
        }}
        className="w-4 h-4 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200"
      >
        {!isHovering && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
      </motion.div>
    </motion.div>
  );
}

// --- COMPONENTES UI ---

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <motion.div 
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width/2)) / 4);
        y.set((e.clientY - (rect.top + rect.height/2)) / 4);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative z-10 h-full"
    >
      {children}
    </motion.div>
  );
}

function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }}
      className={`group relative overflow-hidden rounded-2xl glass-panel ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.06), transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full p-6 flex flex-col">{children}</div>
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"/>
          <span className="font-bold text-white tracking-wider text-sm">VIICTOR<span className="text-emerald-500">N</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-medium text-slate-300 uppercase tracking-wider">
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Habilidades</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projetos</a>
          <a href="#lab" className="hover:text-emerald-400 transition-colors">Laboratório</a>
        </div>
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white"><Menu size={24} /></button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center gap-8">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-white"><X size={32} /></button>
            <nav className="flex flex-col items-center gap-6 text-2xl font-bold text-white">
              <a onClick={() => setIsOpen(false)} href="#skills">Habilidades</a>
              <a onClick={() => setIsOpen(false)} href="#projects">Projetos</a>
              <a onClick={() => setIsOpen(false)} href="#lab">Laboratório</a>
              <a onClick={() => setIsOpen(false)} href="mailto:victor140730@gmail.com" className="text-emerald-500 mt-4">Contato</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- DADOS DO PORTFÓLIO (EXPANDIDO) ---

const skills = [
  { name: "Fibra Óptica (FTTH)", level: 98, icon: Wifi, desc: "Fusão, OTDR, Power Meter" },
  { name: "Redes & TCP/IP", level: 95, icon: Network, desc: "LAN, WAN, IPv4/IPv6" },
  { name: "Hardware & Infra", level: 92, icon: Cpu, desc: "Switches, Roteadores, OLTs" },
  { name: "Python Automation", level: 85, icon: Code2, desc: "Scripts, SNMP, APIs" },
  { name: "Linux Servers", level: 80, icon: Terminal, desc: "Ubuntu, Debian, CentOS" },
  { name: "Cabeamento", level: 90, icon: Cable, desc: "Estruturado Cat5e/6" },
  { name: "React & Frontend", level: 75, icon: Zap, desc: "Next.js, Tailwind, UI" },
  { name: "Monitoramento", level: 88, icon: Activity, desc: "Zabbix, Grafana" },
  { name: "Banco de Dados", level: 70, icon: Database, desc: "SQL, Radius" },
  { name: "Segurança", level: 82, icon: Lock, desc: "VPN, Firewall, SSH" },
];

const projects = [
  {
    title: "FiberOptic Monitor v2",
    desc: "Sistema completo de monitoramento de atenuação óptica. Lê dados via SNMP de OLTs Huawei/ZTE e gera gráficos de degradação em tempo real.",
    tags: ["Python", "SNMP", "Grafana"],
    icon: Activity
  },
  {
    title: "AutoProvisioning Bot",
    desc: "Bot de automação que configura ONUs e Switches automaticamente ao serem conectados na rede, reduzindo o tempo de ativação de 15min para 30s.",
    tags: ["Python", "Telnet/SSH", "Bot"],
    icon: Terminal
  },
  {
    title: "ISP Management Dashboard",
    desc: "Painel administrativo para provedores regionais. Gestão de clientes, bloqueio automático por inadimplência e integração com gateways de pagamento.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    icon: Globe
  },
  {
    title: "SecureNet VPN Server",
    desc: "Implementação de túnel VPN WireGuard em container Docker com autenticação 2FA para acesso remoto seguro de técnicos de campo.",
    tags: ["Docker", "WireGuard", "Linux"],
    icon: Lock
  },
  {
    title: "Structured Cabling Plan",
    desc: "Projeto e execução de cabeamento estruturado para escritório com 200 pontos, incluindo certificação de rede e organização de rack.",
    tags: ["Infra", "Hardware", "CAD"],
    icon: Cable
  },
  {
    title: "Zabbix Alert System",
    desc: "Integração personalizada do Zabbix com Telegram e WhatsApp para alertas críticos de queda de link ou temperatura de equipamentos.",
    tags: ["Zabbix", "API Integration"],
    icon: Signal
  }
];

// --- FERRAMENTAS DO LABORATÓRIO (9 ITENS) ---

const GlassInput = ({ label, value, onChange, suffix }: any) => (
  <div className="mb-3 w-full">
    <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 block ml-1">{label}</label>
    <div className="relative">
      <input 
        type="text" inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
      />
      {suffix && <span className="absolute right-3 top-2 text-xs text-slate-500">{suffix}</span>}
    </div>
  </div>
);

// 1. Optical Loss
const FiberCalc = () => {
  const [d, setD] = useState(10); const [s, setS] = useState(2);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-emerald-400 text-sm mb-3 flex items-center gap-2"><Activity size={14}/> Loss Budget</h4><GlassInput label="Km" value={d} onChange={setD} /><GlassInput label="Emendas" value={s} onChange={setS} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{((d*0.35)+(s*0.1)+1).toFixed(2)} dB</div></div>);
};
// 2. Download
const DownloadCalc = () => {
  const [s, setS] = useState(50); const [sp, setSp] = useState(300);
  const t = (s*8000)/sp;
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-cyan-400 text-sm mb-3 flex items-center gap-2"><Download size={14}/> Tempo Download</h4><GlassInput label="GB" value={s} onChange={setS} /><GlassInput label="Mbps" value={sp} onChange={setSp} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{t<60?t.toFixed(0)+'s':(t/60).toFixed(1)+'m'}</div></div>);
};
// 3. Subnet
const SubnetCalc = () => {
  const [c, setC] = useState(24);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-orange-400 text-sm mb-3 flex items-center gap-2"><Network size={14}/> IPv4 Subnet</h4><div className="mb-4"><label className="text-xs text-slate-500 block mb-1">Prefix: /{c}</label><input type="range" min="16" max="30" value={c} onChange={(e)=>setC(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"/></div><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{(Math.pow(2, 32-c)-2).toLocaleString()} hosts</div></div>);
};
// 4. RAID Calculator
const RaidCalc = () => {
  const [d, setD] = useState(4); const [sz, setSz] = useState(2);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-red-400 text-sm mb-3 flex items-center gap-2"><HardDrive size={14}/> RAID 5 Calc</h4><GlassInput label="Discos (Qtd)" value={d} onChange={setD} /><GlassInput label="Tamanho (TB)" value={sz} onChange={setSz} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{((d-1)*sz)} TB Úteis</div></div>);
};
// 5. Uptime SLA
const UptimeCalc = () => {
  const [sla, setSla] = useState(99.9);
  const down = 365 * 24 * 60 * ((100-sla)/100);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-yellow-400 text-sm mb-3 flex items-center gap-2"><Clock size={14}/> SLA Downtime</h4><GlassInput label="SLA (%)" value={sla} onChange={setSla} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-sm text-white">{down.toFixed(1)} min/ano</div></div>);
};
// 6. Data Unit Converter
const DataConv = () => {
  const [gb, setGb] = useState(1);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-pink-400 text-sm mb-3 flex items-center gap-2"><Database size={14}/> Unit Convert</h4><GlassInput label="Gigabytes" value={gb} onChange={setGb} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-sm text-white">{(gb*1024).toLocaleString()} MB <br/> {(gb*8192).toLocaleString()} Mbits</div></div>);
};
// 7. Conversor dBm
const PowerConv = () => {
  const [db, setDb] = useState(0);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-purple-400 text-sm mb-3 flex items-center gap-2"><Zap size={14}/> dBm to mW</h4><GlassInput label="dBm" value={db} onChange={setDb} /><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{Math.pow(10, db/10).toFixed(4)} mW</div></div>);
};
// 8. MAC Check
const MacCheck = () => {
  const [m, setM] = useState("");
  const v = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(m);
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-teal-400 text-sm mb-3 flex items-center gap-2"><ShieldCheck size={14}/> MAC Check</h4><GlassInput label="Address" value={m} onChange={setM} /><div className={`mt-auto pt-2 border-t border-white/10 text-right font-bold text-sm ${v?'text-emerald-400':'text-rose-400'}`}>{m.length===0?'...':v?'VÁLIDO':'INVÁLIDO'}</div></div>);
};
// 9. Ping
const PingSim = () => {
  const [p, setP] = useState(0); const [l, setL] = useState(false);
  const run = async () => { setL(true); setP(0); await new Promise(r=>setTimeout(r,600)); setP(Math.floor(Math.random()*60+10)); setL(false); };
  return (<div className="h-full flex flex-col"><h4 className="font-bold text-blue-400 text-sm mb-3 flex items-center gap-2"><Gauge size={14}/> Latency Test</h4><button onClick={run} disabled={l} className="w-full py-2 rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs border border-blue-500/30 transition-all">{l?'...':'PING'}</button><div className="mt-auto pt-2 border-t border-white/10 text-right font-mono text-lg text-white">{p>0?p+'ms':'--'}</div></div>);
};

export default function Portfolio() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-emerald-500/30 pb-10">
      <MagneticCursor />
      <Navbar />

      {/* BACKGROUNDS */}
      <div className="aurora-bg" />
      <div className="perspective-grid" />
      
      <div className="relative z-10 px-4 md:px-6">
        
        {/* --- HERO SECTION (REFEITO) --- */}
        <section className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto pt-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
             className="text-center w-full max-w-4xl"
           >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
               <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
               <span className="text-[10px] md:text-xs font-bold text-emerald-400 tracking-[0.2em] uppercase">Disponível para Projetos</span>
             </div>
             
             <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
               INFRASTRUCTURE<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">& CODE.</span>
             </h1>
             
             <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
               Especialista em unir a robustez das <strong>Redes de Fibra Óptica</strong> com a agilidade da <strong>Automação Python</strong>. Eu construo a internet física e o código que a controla.
             </p>

             <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
               <button className="glass-button px-8 py-4 rounded-full text-white font-bold flex items-center justify-center gap-2 min-w-[180px]">
                 <Mail size={18} /> Fale Comigo
               </button>
               <button className="glass-button px-8 py-4 rounded-full text-white font-medium flex items-center justify-center gap-2 min-w-[180px]">
                 <Download size={18} /> Download CV
               </button>
             </div>
           </motion.div>

           <div className="mt-20 flex gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Logos decorativos (Tech Stack) */}
             <Terminal size={32} /> <Wifi size={32} /> <Code2 size={32} /> <Server size={32} />
           </div>
        </section>

        {/* --- DOMINÂNCIA TÉCNICA (EXPANDIDO) --- */}
        <section id="skills" className="py-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
             <div>
               <h2 className="text-4xl font-bold text-white mb-2">Dominância Técnica</h2>
               <p className="text-slate-400">Hardware, Infraestrutura & Desenvolvimento.</p>
             </div>
             <div className="h-px bg-white/10 flex-1 hidden md:block mb-4 ml-8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <GlassCard key={i} delay={i*0.05} className="hover:border-emerald-500/30 transition-colors text-center py-6">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                  <skill.icon size={24} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{skill.name}</h3>
                <p className="text-[10px] text-slate-500 mb-3">{skill.desc}</p>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1 }} className="h-full bg-emerald-500" />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- PROJETOS RECENTES (EXPANDIDO) --- */}
        <section id="projects" className="py-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
             <div>
               <h2 className="text-4xl font-bold text-white mb-2">Projetos Recentes</h2>
               <p className="text-slate-400">Soluções reais aplicadas em campo.</p>
             </div>
             <div className="h-px bg-white/10 flex-1 hidden md:block mb-4 ml-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <TiltCard key={i}>
                <GlassCard className="h-full hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                      <project.icon size={20} />
                    </div>
                    <ArrowUpRight className="text-slate-600" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded border border-white/10 bg-black/20 text-slate-300">{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* --- LABORATÓRIO (9 FERRAMENTAS) --- */}
        <section id="lab" className="py-24 max-w-7xl mx-auto">
          <div className="glass-panel rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            {/* Decorative Header */}
            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                <Terminal size={12} /> Live Tools
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Laboratório de Testes</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Coleção de utilitários funcionais que desenvolvi para auxiliar em tarefas diárias de telecomunicações e redes.
              </p>
            </div>

            {/* Grid de Ferramentas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              <GlassCard className="bg-black/40"><FiberCalc /></GlassCard>
              <GlassCard className="bg-black/40"><DownloadCalc /></GlassCard>
              <GlassCard className="bg-black/40"><SubnetCalc /></GlassCard>
              <GlassCard className="bg-black/40"><RaidCalc /></GlassCard>
              <GlassCard className="bg-black/40"><UptimeCalc /></GlassCard>
              <GlassCard className="bg-black/40"><DataConv /></GlassCard>
              <GlassCard className="bg-black/40"><PowerConv /></GlassCard>
              <GlassCard className="bg-black/40"><MacCheck /></GlassCard>
              <GlassCard className="bg-black/40"><PingSim /></GlassCard>
            </div>
          </div>
        </section>

        {/* --- FOOTER (PROFISSIONAL) --- */}
        <footer className="border-t border-white/10 bg-black relative z-10 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              
              {/* Coluna 1: Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="font-bold text-white text-xl tracking-tight">VIICTOR<span className="text-emerald-500">N</span></span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                  Transformando a conectividade global através de infraestrutura robusta e código inteligente. Focado em excelência técnica e inovação.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-black transition-all text-slate-400"><Github size={18}/></a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-slate-400"><Linkedin size={18}/></a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-pink-500 hover:text-white transition-all text-slate-400"><Globe size={18}/></a>
                </div>
              </div>

              {/* Coluna 2: Links */}
              <div>
                <h4 className="font-bold text-white mb-6">Navegação</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Início</a></li>
                  <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Habilidades</a></li>
                  <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projetos</a></li>
                  <li><a href="#lab" className="hover:text-emerald-400 transition-colors">Laboratório</a></li>
                </ul>
              </div>

              {/* Coluna 3: Contato */}
              <div>
                <h4 className="font-bold text-white mb-6">Contato</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><Mail size={14}/> victor140730@gmail.com</li>
                  <li className="flex items-center gap-2"><Phone size={14}/> (87) 98164-1911</li>
                  <li className="flex items-center gap-2"><MapPin size={14}/> Bom Conselho - PE</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-600">© 2025 ViictorN. Todos os direitos reservados.</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors"
              >
                Voltar ao Topo <ArrowUp size={12}/>
              </button>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}