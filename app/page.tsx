'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence, useInView 
} from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Network, ShieldCheck, 
  Gauge, Menu, X, ArrowUpRight, HardDrive, Clock, 
  ArrowUp, Cable, MonitorPlay, MapPin, Router, Key, Signal
} from 'lucide-react';

// --- 1. CURSOR (Hidden on Mobile) ---
function LiquidCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('.interactive'));
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference" 
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <motion.div 
        animate={{ scale: isHovering ? 3 : 1 }}
        className="w-5 h-5 bg-white rounded-full blur-[1px]"
      />
    </motion.div>
  );
}

// --- 2. UI COMPONENTS (RESPONSIVOS) ---

const NeonButton = ({ children, primary = false, icon: Icon, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      w-full sm:w-auto relative px-6 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 interactive
      ${primary 
        ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-emerald-400" 
        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-emerald-500/30"
      }
    `}
  >
    {Icon && <Icon size={18} />}
    {children}
  </motion.button>
);

function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col">{children}</div>
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-4 sm:py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 interactive cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
            <span className="font-bold text-white tracking-wider text-sm">VIICTOR<span className="text-emerald-500">N</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            {['Habilidades', 'Projetos', 'Laboratório'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace('á','a').replace('ó','o')}`} className="hover:text-emerald-400 transition-colors pb-1 interactive">{item}</a>
            ))}
          </div>
          
          <div className="hidden md:block">
             <a href="mailto:victor140730@gmail.com" className="px-5 py-2 rounded-full bg-white/5 hover:bg-emerald-500/10 border border-white/10 text-xs font-bold text-white transition-all interactive">FALE COMIGO</a>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-white p-2 bg-white/5 rounded-lg border border-white/10 interactive z-50">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-3xl z-[999] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full interactive"><X size={32} /></button>
            <nav className="flex flex-col items-center gap-10">
              {['Habilidades', 'Projetos', 'Laboratório'].map((item) => (
                <a key={item} onClick={() => setIsOpen(false)} href={`#${item.toLowerCase().replace('á','a').replace('ó','o')}`} className="text-4xl font-bold text-white tracking-tighter hover:text-emerald-500 transition-colors">{item.toUpperCase()}</a>
              ))}
              <a href="mailto:victor140730@gmail.com" className="mt-8 px-8 py-4 border border-emerald-500/30 rounded-full text-emerald-400 font-mono">victor140730@gmail.com</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- FERRAMENTAS FUNCIONAIS (12 ITENS) ---
const GlassInput = ({ label, value, onChange, suffix }: any) => (
  <div className="mb-3 w-full interactive">
    <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 block ml-1 font-bold">{label}</label>
    <div className="relative group">
      <input type="text" inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"/>
      {suffix && <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">{suffix}</span>}
    </div>
  </div>
);

// Calculadoras
const FiberCalc = () => { const [d, setD] = useState(10); const [s, setS] = useState(2); return (<div className="h-full flex flex-col"><h4 className="font-bold text-emerald-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Activity size={14}/> LOSS BUDGET</h4><GlassInput label="Km" value={d} onChange={setD} /><GlassInput label="Emendas" value={s} onChange={setS} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Total</span><span className="font-mono text-base sm:text-lg text-white font-bold">{((d*0.35)+(s*0.1)+1).toFixed(2)} dB</span></div></div>); };
const DownloadCalc = () => { const [s, setS] = useState(50); const [sp, setSp] = useState(300); const t = (s*8000)/sp; return (<div className="h-full flex flex-col"><h4 className="font-bold text-cyan-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Download size={14}/> DOWNLOAD TIME</h4><GlassInput label="GB" value={s} onChange={setS} /><GlassInput label="Mbps" value={sp} onChange={setSp} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Tempo</span><span className="font-mono text-base sm:text-lg text-white font-bold">{t<60?t.toFixed(0)+'s':(t/60).toFixed(1)+'m'}</span></div></div>); };
const SubnetCalc = () => { const [c, setC] = useState(24); return (<div className="h-full flex flex-col"><h4 className="font-bold text-orange-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Network size={14}/> IPV4 SUBNET</h4><div className="mb-4 interactive"><label className="text-xs text-slate-500 block mb-2 font-bold">PREFIXO: /{c}</label><input type="range" min="16" max="30" value={c} onChange={(e)=>setC(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"/></div><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Hosts</span><span className="font-mono text-base sm:text-lg text-white font-bold">{(Math.pow(2, 32-c)-2).toLocaleString()}</span></div></div>); };
const RaidCalc = () => { const [d, setD] = useState(4); const [sz, setSz] = useState(2); return (<div className="h-full flex flex-col"><h4 className="font-bold text-red-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><HardDrive size={14}/> RAID 5 CALC</h4><GlassInput label="Discos" value={d} onChange={setD} /><GlassInput label="TB" value={sz} onChange={setSz} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Útil</span><span className="font-mono text-base sm:text-lg text-white font-bold">{((d-1)*sz)} TB</span></div></div>); };
const UptimeCalc = () => { const [sla, setSla] = useState(99.9); const down = 365 * 24 * 60 * ((100-sla)/100); return (<div className="h-full flex flex-col"><h4 className="font-bold text-yellow-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Clock size={14}/> SLA UPTIME</h4><GlassInput label="SLA (%)" value={sla} onChange={setSla} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Offline/Ano</span><span className="font-mono text-base sm:text-lg text-white font-bold">{down.toFixed(1)} min</span></div></div>); };
const DataConv = () => { const [gb, setGb] = useState(1); return (<div className="h-full flex flex-col"><h4 className="font-bold text-pink-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Database size={14}/> CONVERSOR</h4><GlassInput label="GB" value={gb} onChange={setGb} /><div className="mt-auto pt-3 border-t border-white/10 text-right font-mono text-sm text-white">{(gb*1024).toLocaleString()} MB <br/> {(gb*8192).toLocaleString()} Mbits</div></div>); };
const PowerConv = () => { const [db, setDb] = useState(0); return (<div className="h-full flex flex-col"><h4 className="font-bold text-purple-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Zap size={14}/> DBM TO MW</h4><GlassInput label="dBm" value={db} onChange={setDb} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Linear</span><span className="font-mono text-base sm:text-lg text-white font-bold">{Math.pow(10, db/10).toFixed(4)} mW</span></div></div>); };
const MacCheck = () => { const [m, setM] = useState(""); const v = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(m); return (<div className="h-full flex flex-col"><h4 className="font-bold text-teal-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><ShieldCheck size={14}/> MAC CHECK</h4><GlassInput label="Endereço MAC" value={m} onChange={setM} /><div className={`mt-auto pt-3 border-t border-white/10 flex justify-between items-center font-bold text-sm ${v?'text-emerald-400':'text-rose-400'}`}><span className="text-xs text-slate-500">Status</span>{m.length===0?'...':v?'VÁLIDO':'INVÁLIDO'}</div></div>); };
const PingSim = () => { const [p, setP] = useState(0); const [l, setL] = useState(false); const run = async () => { setL(true); setP(0); await new Promise(r=>setTimeout(r,600)); setP(Math.floor(Math.random()*60+10)); setL(false); }; return (<div className="h-full flex flex-col"><h4 className="font-bold text-blue-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Gauge size={14}/> PING TEST</h4><button onClick={run} disabled={l} className="interactive w-full py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 transition-all mb-2">{l?'ENVIANDO...':'PING'}</button><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Latência</span><span className="font-mono text-base sm:text-lg text-white font-bold">{p>0?p+'ms':'--'}</span></div></div>); };
const DnsCalc = () => { const [t, setT] = useState(0); const [l, setL] = useState(false); const check = async () => { setL(true); await new Promise(r=>setTimeout(r,1000)); setT(Math.floor(Math.random()*150+20)); setL(false); }; return (<div className="h-full flex flex-col"><h4 className="font-bold text-indigo-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Globe size={14}/> DNS LOOKUP</h4><button onClick={check} disabled={l} className="interactive w-full py-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 transition-all mb-2">{l?'RESOLVENDO...':'CHECK DNS'}</button><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Propagação</span><span className="font-mono text-base sm:text-lg text-white font-bold">{t>0?t+'ms':'--'}</span></div></div>); };
const PassGen = () => { const [p, setP] = useState("******"); const gen = () => { setP(Math.random().toString(36).slice(-8).toUpperCase()); }; return (<div className="h-full flex flex-col"><h4 className="font-bold text-lime-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Key size={14}/> PASS GEN</h4><div className="p-3 bg-black/40 rounded mb-2 font-mono text-center text-white tracking-widest text-sm">{p}</div><button onClick={gen} className="mt-auto interactive w-full py-2 rounded-lg bg-lime-500/10 hover:bg-lime-500/20 text-lime-300 text-xs font-bold border border-lime-500/30 transition-all">GERAR SENHA</button></div>); };
const BandwidthCalc = () => { const [hz, setHz] = useState(20); return (<div className="h-full flex flex-col"><h4 className="font-bold text-fuchsia-400 text-xs sm:text-sm mb-4 flex items-center gap-2"><Signal size={14}/> BANDWIDTH</h4><GlassInput label="Largura (MHz)" value={hz} onChange={setHz} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Teórico</span><span className="font-mono text-base sm:text-lg text-white font-bold">{(hz*2).toFixed(0)} Mbps</span></div></div>); };

// --- DADOS EXPANDIDOS ---
const skills = [
  { name: "FIBRA ÓPTICA", level: 98, icon: Wifi, desc: "Fusão, OTDR, Power Meter" },
  { name: "REDES TCP/IP", level: 95, icon: Network, desc: "LAN, WAN, IPv4/IPv6" },
  { name: "HARDWARE", level: 92, icon: Cpu, desc: "Switches, Roteadores, OLTs" },
  { name: "PYTHON", level: 85, icon: Code2, desc: "Automação, SNMP, Scripts" },
  { name: "LINUX", level: 80, icon: Terminal, desc: "Ubuntu, Debian, CentOS" },
  { name: "CABEAMENTO", level: 90, icon: Cable, desc: "Estruturado Cat5e/6" },
  { name: "FRONTEND", level: 75, icon: Zap, desc: "React, Next.js, Tailwind" },
  { name: "MONITORAMENTO", level: 88, icon: Activity, desc: "Zabbix, Grafana" },
  { name: "DATABASE", level: 70, icon: Database, desc: "SQL, Radius" },
  { name: "SEGURANÇA", level: 82, icon: Lock, desc: "VPN, Firewall, SSH" },
];

const projects = [
  { title: "FiberOptic Monitor", desc: "Monitoramento via SNMP para OLTs Huawei/ZTE com gráficos em tempo real e alertas.", tags: ["Python", "SNMP"], icon: Activity },
  { title: "AutoProvision Bot", desc: "Bot que configura ONUs e Switches automaticamente, reduzindo setup em 90%.", tags: ["Python", "Bot"], icon: Terminal },
  { title: "ISP Dashboard", desc: "Painel de gestão para provedores: clientes, financeiro e suporte técnico integrado.", tags: ["Next.js", "React"], icon: Globe },
  { title: "SecureNet VPN", desc: "Túnel WireGuard em Docker com 2FA para acesso remoto seguro da equipe.", tags: ["Docker", "Sec"], icon: Lock },
  { title: "Cabling Project", desc: "Projeto de cabeamento estruturado para 200 pontos, certificado e documentado.", tags: ["Infra", "CAD"], icon: Cable },
  { title: "Zabbix Alerts", desc: "Integração Zabbix com Telegram para alertas críticos de rede instantâneos.", tags: ["Zabbix", "API"], icon: Zap },
  { title: "GPON Signal Analyzer", desc: "Script que varre toda a rede GPON identificando clientes com sinal degradado (-27dBm).", tags: ["Python", "GPON"], icon: Signal },
  { title: "Radius Billing Core", desc: "Backend para processamento de logs Radius e geração de faturas automáticas.", tags: ["Node.js", "SQL"], icon: Server },
  { title: "Smart Home Gateway", desc: "Integração de IoT caseira usando Home Assistant e scripts Python customizados.", tags: ["IoT", "Python"], icon: Router },
];

// --- LAYOUT ---
export default function Portfolio() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-emerald-500/30">
      <LiquidCursor />
      <div className="fluid-bg">
        <div className="fluid-orb orb-1"/>
        <div className="fluid-orb orb-2"/>
        <div className="fluid-orb orb-3"/>
      </div>
      <div className="noise-overlay" />
      <Navbar />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto pt-10 sm:pt-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
             className="text-center w-full max-w-5xl"
           >
             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 sm:mb-10 shadow-xl">
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
               <span className="text-[10px] sm:text-xs font-bold text-emerald-400 tracking-[0.2em] uppercase">Disponível para Projetos</span>
             </div>
             
             <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter mb-6 sm:mb-8 leading-[0.9]">
               INFRASTRUCTURE<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 animate-pulse">& CODE.</span>
             </h1>
             
             <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light px-4">
               A fusão definitiva entre <strong>Telecomunicações</strong> e <strong>Desenvolvimento</strong>. Transformando fibra óptica em inteligência digital.
             </p>

             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full items-center px-4">
               <NeonButton primary icon={Mail} onClick={() => window.location.href='mailto:victor140730@gmail.com'}>Fale Comigo</NeonButton>
               <NeonButton icon={Download}>Baixar CV</NeonButton>
             </div>
           </motion.div>
           
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50">
             <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll</span>
             <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
           </motion.div>
        </section>

        {/* SKILLS */}
        <section id="habilidades" className="py-20 sm:py-32 max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 px-2">
             <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Dominância Técnica</h2>
             <div className="h-1 w-20 bg-emerald-500 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {skills.map((skill, i) => (
              <GlassCard key={i} delay={i*0.05} className="hover:bg-white/5 transition-colors text-center py-6 sm:py-8 interactive">
                <div className="mb-4 inline-flex p-3 sm:p-4 rounded-2xl bg-white/5 text-emerald-400 border border-white/5 shadow-lg"><skill.icon size={24} className="sm:w-7 sm:h-7" /></div>
                <h3 className="text-white font-bold text-xs sm:text-sm mb-2 uppercase tracking-wider">{skill.name}</h3>
                <p className="text-[10px] text-slate-500 mb-3 font-medium hidden sm:block">{skill.desc}</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /></div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* PROJETOS (9 ITENS) */}
        <section id="projetos" className="py-20 sm:py-32 max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 px-2">
             <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Projetos Recentes</h2>
             <div className="h-1 w-20 bg-emerald-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <GlassCard key={i} delay={i * 0.1} className="hover:border-emerald-500/30 interactive group">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-emerald-400 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300"><project.icon size={24} /></div>
                  <ArrowUpRight className="text-slate-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">{project.tags.map(tag => (<span key={tag} className="text-[10px] px-3 py-1 rounded-md border border-white/5 bg-white/5 text-slate-300 font-bold tracking-wide">{tag}</span>))}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* LABORATÓRIO (12 ITENS) */}
        <section id="laboratorio" className="py-20 sm:py-32 max-w-7xl mx-auto">
          <div className="glass-panel rounded-[30px] sm:rounded-[40px] p-6 sm:p-16 relative overflow-hidden border-t border-white/10">
            <div className="text-center mb-12 sm:mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6"><MonitorPlay size={14} /> Área Interativa</div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Laboratório de Testes</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg">A prova prática de que hardware e software falam a mesma língua.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              <GlassCard className="bg-black/40"><FiberCalc /></GlassCard>
              <GlassCard className="bg-black/40"><DownloadCalc /></GlassCard>
              <GlassCard className="bg-black/40"><SubnetCalc /></GlassCard>
              <GlassCard className="bg-black/40"><RaidCalc /></GlassCard>
              <GlassCard className="bg-black/40"><UptimeCalc /></GlassCard>
              <GlassCard className="bg-black/40"><DataConv /></GlassCard>
              <GlassCard className="bg-black/40"><PowerConv /></GlassCard>
              <GlassCard className="bg-black/40"><MacCheck /></GlassCard>
              <GlassCard className="bg-black/40"><PingSim /></GlassCard>
              <GlassCard className="bg-black/40"><DnsCalc /></GlassCard>
              <GlassCard className="bg-black/40"><PassGen /></GlassCard>
              <GlassCard className="bg-black/40"><BandwidthCalc /></GlassCard>
            </div>
          </div>
        </section>

        {/* FOOTER ARREDONDADO E MELHORADO */}
        <footer className="rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-white/10 bg-[#0a0a0a] pt-16 sm:pt-24 pb-10 mt-10 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="font-bold text-white text-xl tracking-tight">VIICTOR<span className="text-emerald-500">N</span></span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">Excelência em Telecomunicações. Inovação em Desenvolvimento.</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all interactive"><Github size={20}/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all interactive"><Linkedin size={20}/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all interactive"><Globe size={20}/></a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Navegação</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-medium"><li><a href="#habilidades" className="hover:text-emerald-400 transition-colors interactive">Habilidades</a></li><li><a href="#projetos" className="hover:text-emerald-400 transition-colors interactive">Projetos</a></li><li><a href="#laboratorio" className="hover:text-emerald-400 transition-colors interactive">Laboratório</a></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Contato</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-medium"><li className="flex items-center gap-3"><Mail size={16} className="text-emerald-500"/> victor140730@gmail.com</li><li className="flex items-center gap-3"><Phone size={16} className="text-emerald-500"/> (87) 98164-1911</li><li className="flex items-center gap-3"><MapPin size={16} className="text-emerald-500"/> Bom Conselho - PE</li></ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"><p className="text-xs text-slate-600 font-bold">© 2025 VIICTORN. RESERVED.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-2 transition-colors font-bold uppercase interactive">Voltar ao Topo <ArrowUp size={14}/></button></div>
          </div>
        </footer>
      </div>
    </main>
  );
}