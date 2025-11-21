'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, useMotionTemplate, useMotionValue, useTransform, AnimatePresence, useInView 
} from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, 
  Zap, Database, Globe, Lock, Network, ShieldCheck, 
  Gauge, Menu, X, ArrowUpRight, HardDrive, Clock, 
  ArrowUp, Cable, MonitorPlay, MapPin
} from 'lucide-react';

// --- 1. EFEITO: NETWORK BACKGROUND (CANVAS) ---
const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    
    const properties = {
      bgColor: 'rgba(5, 5, 5, 0)', // Transparente para ver o fundo preto
      particleColor: 'rgba(16, 185, 129, 0.5)', // Verde Emerald
      particleRadius: 1.5,
      particleCount: 60,
      lineLength: 150,
      particleSpeed: 0.3,
    };

    class Particle {
      x: number; y: number; velocityX: number; velocityY: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
        this.velocityY = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
      }
      position() {
        this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
        this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
      reDraw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    const reDrawBackground = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
    };

    const drawLines = () => {
      if (!ctx) return;
      let x1, y1, x2, y2, length, opacity;
      for (let i in particles) {
        for (let j in particles) {
          x1 = particles[i].x; y1 = particles[i].y;
          x2 = particles[j].x; y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
    };

    const reDrawParticles = () => {
      for (let i in particles) {
        particles[i].position();
        particles[i].reDraw();
      }
    };

    const loop = () => {
      reDrawBackground();
      reDrawParticles();
      drawLines();
      requestAnimationFrame(loop);
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    };

    init();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none" />;
};

// --- 2. EFEITO: HYPERTEXT (Decodificador) ---
const HyperText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const iterations = useRef(0);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iterations.current) return text[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("")
      );
      if (iterations.current >= text.length) clearInterval(interval);
      iterations.current += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
};

// --- 3. EFEITO: BORDER BEAM (Feixe de Luz) ---
const BorderBeam = ({ duration = 4, size = 200 }: { duration?: number, size?: number }) => (
  <div 
    style={{ "--duration": duration } as React.CSSProperties}
    className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
  >
    <div 
      className="absolute aspect-square inset-0 animate-border-beam bg-gradient-to-l from-transparent via-emerald-500 to-transparent"
      style={{ width: size, offsetPath: "rect(0 auto auto 0 round 16px)" }}
    />
  </div>
);

// --- 4. UX: CURSOR LIQUID GLASS (ZERO DELAY) ---
function LiquidArrowCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.interactive');
      setIsHovering(!!isInteractive);
    };
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
    <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" style={{ x: cursorX, y: cursorY }}>
      <motion.div animate={{ scale: isClicking ? 0.9 : isHovering ? 1.2 : 1 }} className="relative -mt-1 -ml-1">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
           <path d="M6 2L26 18L16 20L14 28L6 2Z" fill="rgba(0, 0, 0, 0.3)" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="1.5" style={{ backdropFilter: "blur(6px)" }} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// --- COMPONENTES DE UI REFINADOS ---

const NeonButton = ({ children, primary = false, icon: Icon, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, textShadow: "0 0 10px rgba(16,185,129,0.8)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 interactive
      ${primary 
        ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 border border-emerald-400" 
        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      }
    `}
  >
    {Icon && <Icon size={18} />}
    {children}
  </motion.button>
);

function GlassCard({ children, className = "", delay = 0, withBeam = false }: { children: React.ReactNode, className?: string, delay?: number, withBeam?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
      {withBeam && <BorderBeam />}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.05), transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full p-6 flex flex-col">{children}</div>
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 interactive cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"/>
            <span className="font-bold text-white tracking-wider text-sm">VIICTOR<span className="text-emerald-500">N</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            {['Habilidades', 'Projetos', 'Laboratório'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace('á','a').replace('ó','o')}`} className="hover:text-emerald-400 transition-colors pb-1 interactive hover:shadow-[0_2px_0px_rgba(16,185,129,1)]">{item}</a>
            ))}
          </div>
          <div className="hidden md:block">
             <a href="mailto:victor140730@gmail.com" className="px-5 py-2 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 text-xs font-bold text-white transition-all interactive">FALE COMIGO</a>
          </div>
          <button onClick={() => setIsOpen(true)} className="md:hidden text-white interactive"><Menu size={24} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 20 }} className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center gap-8 backdrop-blur-xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-white"><X size={32} /></button>
            <nav className="flex flex-col items-center gap-8 text-3xl font-black text-white tracking-tighter">
              <a onClick={() => setIsOpen(false)} href="#habilidades">HABILIDADES</a>
              <a onClick={() => setIsOpen(false)} href="#projetos">PROJETOS</a>
              <a onClick={() => setIsOpen(false)} href="#laboratorio">LABORATÓRIO</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- FERRAMENTAS & DADOS ---
const GlassInput = ({ label, value, onChange, suffix }: any) => (
  <div className="mb-3 w-full interactive">
    <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 block ml-1 font-bold">{label}</label>
    <div className="relative group">
      <input type="text" inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-900/10 transition-all font-mono group-hover:border-white/20"/>
      {suffix && <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{suffix}</span>}
    </div>
  </div>
);

const FiberCalc = () => { const [d, setD] = useState(10); const [s, setS] = useState(2); return (<div className="h-full flex flex-col"><h4 className="font-bold text-emerald-400 text-sm mb-4 flex items-center gap-2"><Activity size={14}/> LOSS BUDGET</h4><GlassInput label="Distância (Km)" value={d} onChange={setD} /><GlassInput label="Emendas (Qtd)" value={s} onChange={setS} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Total Estimado</span><span className="font-mono text-lg text-white font-bold">{((d*0.35)+(s*0.1)+1).toFixed(2)} dB</span></div></div>); };
const DownloadCalc = () => { const [s, setS] = useState(50); const [sp, setSp] = useState(300); const t = (s*8000)/sp; return (<div className="h-full flex flex-col"><h4 className="font-bold text-cyan-400 text-sm mb-4 flex items-center gap-2"><Download size={14}/> TEMPO DOWNLOAD</h4><GlassInput label="Arquivo (GB)" value={s} onChange={setS} /><GlassInput label="Velocidade (Mbps)" value={sp} onChange={setSp} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Tempo</span><span className="font-mono text-lg text-white font-bold">{t<60?t.toFixed(0)+'s':(t/60).toFixed(1)+'m'}</span></div></div>); };
const SubnetCalc = () => { const [c, setC] = useState(24); return (<div className="h-full flex flex-col"><h4 className="font-bold text-orange-400 text-sm mb-4 flex items-center gap-2"><Network size={14}/> IPV4 SUBNET</h4><div className="mb-4 interactive"><label className="text-xs text-slate-500 block mb-2 font-bold">PREFIXO: /{c}</label><input type="range" min="16" max="30" value={c} onChange={(e)=>setC(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"/></div><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Hosts Úteis</span><span className="font-mono text-lg text-white font-bold">{(Math.pow(2, 32-c)-2).toLocaleString()}</span></div></div>); };
const RaidCalc = () => { const [d, setD] = useState(4); const [sz, setSz] = useState(2); return (<div className="h-full flex flex-col"><h4 className="font-bold text-red-400 text-sm mb-4 flex items-center gap-2"><HardDrive size={14}/> RAID 5 CALC</h4><GlassInput label="Discos" value={d} onChange={setD} /><GlassInput label="Tamanho (TB)" value={sz} onChange={setSz} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Capacidade</span><span className="font-mono text-lg text-white font-bold">{((d-1)*sz)} TB</span></div></div>); };
const UptimeCalc = () => { const [sla, setSla] = useState(99.9); const down = 365 * 24 * 60 * ((100-sla)/100); return (<div className="h-full flex flex-col"><h4 className="font-bold text-yellow-400 text-sm mb-4 flex items-center gap-2"><Clock size={14}/> SLA UPTIME</h4><GlassInput label="SLA (%)" value={sla} onChange={setSla} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Downtime/Ano</span><span className="font-mono text-lg text-white font-bold">{down.toFixed(1)} min</span></div></div>); };
const DataConv = () => { const [gb, setGb] = useState(1); return (<div className="h-full flex flex-col"><h4 className="font-bold text-pink-400 text-sm mb-4 flex items-center gap-2"><Database size={14}/> CONVERSOR UNIT</h4><GlassInput label="Gigabytes" value={gb} onChange={setGb} /><div className="mt-auto pt-3 border-t border-white/10 text-right font-mono text-sm text-white leading-tight">{(gb*1024).toLocaleString()} MB <br/> {(gb*8192).toLocaleString()} Mbits</div></div>); };
const PowerConv = () => { const [db, setDb] = useState(0); return (<div className="h-full flex flex-col"><h4 className="font-bold text-purple-400 text-sm mb-4 flex items-center gap-2"><Zap size={14}/> DBM TO MW</h4><GlassInput label="dBm" value={db} onChange={setDb} /><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Linear</span><span className="font-mono text-lg text-white font-bold">{Math.pow(10, db/10).toFixed(4)} mW</span></div></div>); };
const MacCheck = () => { const [m, setM] = useState(""); const v = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(m); return (<div className="h-full flex flex-col"><h4 className="font-bold text-teal-400 text-sm mb-4 flex items-center gap-2"><ShieldCheck size={14}/> MAC CHECK</h4><GlassInput label="Endereço MAC" value={m} onChange={setM} /><div className={`mt-auto pt-3 border-t border-white/10 flex justify-between items-center font-bold text-sm ${v?'text-emerald-400':'text-rose-400'}`}><span className="text-xs text-slate-500">Status</span>{m.length===0?'...':v?'VÁLIDO':'INVÁLIDO'}</div></div>); };
const PingSim = () => { const [p, setP] = useState(0); const [l, setL] = useState(false); const run = async () => { setL(true); setP(0); await new Promise(r=>setTimeout(r,600)); setP(Math.floor(Math.random()*60+10)); setL(false); }; return (<div className="h-full flex flex-col"><h4 className="font-bold text-blue-400 text-sm mb-4 flex items-center gap-2"><Gauge size={14}/> LATENCY TEST</h4><button onClick={run} disabled={l} className="interactive w-full py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 transition-all mb-2">{l?'ENVIANDO...':'TESTAR PING'}</button><div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center"><span className="text-xs text-slate-500">Latência</span><span className="font-mono text-lg text-white font-bold">{p>0?p+'ms':'--'}</span></div></div>); };

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
  { title: "FiberOptic Monitor", desc: "Monitoramento via SNMP para OLTs Huawei/ZTE com gráficos em tempo real.", tags: ["Python", "SNMP"], icon: Activity },
  { title: "AutoProvision Bot", desc: "Bot que configura ONUs e Switches automaticamente, reduzindo setup.", tags: ["Python", "Bot"], icon: Terminal },
  { title: "ISP Dashboard", desc: "Painel de gestão para provedores: clientes, financeiro e suporte.", tags: ["Next.js", "React"], icon: Globe },
  { title: "SecureNet VPN", desc: "Túnel WireGuard em Docker com 2FA para acesso remoto seguro.", tags: ["Docker", "Sec"], icon: Lock },
  { title: "Cabling Project", desc: "Projeto de cabeamento estruturado para 200 pontos certificado.", tags: ["Infra", "CAD"], icon: Cable },
  { title: "Zabbix Alerts", desc: "Integração Zabbix com Telegram para alertas críticos de rede.", tags: ["Zabbix", "API"], icon: Zap }
];

export default function Portfolio() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-emerald-500/30 pb-10">
      <LiquidArrowCursor />
      <NetworkBackground />
      <div className="noise-overlay" />
      <Navbar />
      
      <div className="relative z-10 px-4 md:px-6">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto pt-20">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "circOut" }}
             className="text-center w-full max-w-5xl"
           >
             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
               <span className="text-xs font-bold text-emerald-400 tracking-[0.2em] uppercase">Disponível para Projetos</span>
             </div>
             
             <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
               <HyperText text="INFRASTRUCTURE" className="block" /><br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 animate-pulse">& CODE.</span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
               A fusão definitiva entre <strong>Telecomunicações</strong> e <strong>Desenvolvimento</strong>. Transformando fibra óptica em inteligência digital.
             </p>

             <div className="flex flex-col sm:flex-row justify-center gap-6 w-full items-center">
               <NeonButton primary icon={Mail} onClick={() => window.location.href='mailto:victor140730@gmail.com'}>Fale Comigo</NeonButton>
               <NeonButton icon={Download}>Baixar CV</NeonButton>
             </div>
           </motion.div>
           
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50">
             <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll Down</span>
             <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
           </motion.div>
        </section>

        {/* SKILLS */}
        <section id="habilidades" className="py-32 max-w-7xl mx-auto">
          <div className="flex items-end gap-6 mb-16">
             <h2 className="text-5xl md:text-7xl font-black text-white/5 absolute select-none -translate-y-12 -translate-x-6">EXPERTISE</h2>
             <h2 className="text-4xl font-bold text-white relative z-10">Dominância Técnica</h2>
             <div className="h-px bg-white/10 flex-1 hidden md:block mb-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <GlassCard key={i} delay={i*0.05} className="hover:bg-white/5 transition-colors text-center py-8 interactive">
                <div className="mb-5 inline-flex p-4 rounded-2xl bg-white/5 text-emerald-400 border border-white/5 shadow-lg"><skill.icon size={28} /></div>
                <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">{skill.name}</h3>
                <p className="text-[10px] text-slate-500 mb-4 font-medium">{skill.desc}</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /></div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* PROJETOS (COM BORDER BEAM) */}
        <section id="projetos" className="py-32 max-w-7xl mx-auto">
          <div className="flex items-end gap-6 mb-16">
             <h2 className="text-5xl md:text-7xl font-black text-white/5 absolute select-none -translate-y-12 -translate-x-6">PORTFOLIO</h2>
             <h2 className="text-4xl font-bold text-white relative z-10">Projetos Recentes</h2>
             <div className="h-px bg-white/10 flex-1 hidden md:block mb-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <GlassCard key={i} delay={i * 0.1} withBeam className="hover:border-emerald-500/30 interactive group">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-emerald-400 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300"><project.icon size={24} /></div>
                  <ArrowUpRight className="text-slate-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">{project.tags.map(tag => (<span key={tag} className="text-[10px] px-3 py-1 rounded-md border border-white/5 bg-white/5 text-slate-300 font-bold tracking-wide">{tag}</span>))}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* LABORATÓRIO */}
        <section id="laboratorio" className="py-32 max-w-7xl mx-auto">
          <div className="glass-panel rounded-[40px] p-8 md:p-16 relative overflow-hidden border-t border-white/10">
            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6"><MonitorPlay size={14} /> Área Interativa</div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Laboratório de Testes</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">A prova prática de que hardware e software falam a mesma língua.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              <GlassCard className="bg-black/60"><FiberCalc /></GlassCard>
              <GlassCard className="bg-black/60"><DownloadCalc /></GlassCard>
              <GlassCard className="bg-black/60"><SubnetCalc /></GlassCard>
              <GlassCard className="bg-black/60"><RaidCalc /></GlassCard>
              <GlassCard className="bg-black/60"><UptimeCalc /></GlassCard>
              <GlassCard className="bg-black/60"><DataConv /></GlassCard>
              <GlassCard className="bg-black/60"><PowerConv /></GlassCard>
              <GlassCard className="bg-black/60"><MacCheck /></GlassCard>
              <GlassCard className="bg-black/60"><PingSim /></GlassCard>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl pt-20 pb-10 mt-20">
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
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Menu</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-medium"><li><a href="#habilidades" className="hover:text-emerald-400 transition-colors interactive">Habilidades</a></li><li><a href="#projetos" className="hover:text-emerald-400 transition-colors interactive">Projetos</a></li><li><a href="#laboratorio" className="hover:text-emerald-400 transition-colors interactive">Laboratório</a></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Contato</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-medium"><li className="flex items-center gap-3"><Mail size={16} className="text-emerald-500"/> victor140730@gmail.com</li><li className="flex items-center gap-3"><Phone size={16} className="text-emerald-500"/> (87) 98164-1911</li><li className="flex items-center gap-3"><MapPin size={16} className="text-emerald-500"/> Bom Conselho - PE</li></ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"><p className="text-xs text-slate-600 font-bold">© 2025 VIICTORN. TODOS OS DIREITOS RESERVADOS.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-2 transition-colors font-bold uppercase interactive">Voltar ao Topo <ArrowUp size={14}/></button></div>
          </div>
        </footer>
      </div>
    </main>
  );
}