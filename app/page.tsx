'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, Server, Code2, Cpu, Terminal, MapPin, Mail, Phone, 
  Download, Github, Linkedin, ChevronDown, Activity, Layers, Zap 
} from 'lucide-react';

// --- COMPONENTES VISUAIS (GLASSMORPHISM) ---

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.07)" }}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-6 transition-all duration-300 ${className}`}
  >
    {/* Efeito de brilho no topo (Reflexo de vidro) */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
    {children}
  </motion.div>
);

const SectionTitle = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-2 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold text-white tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

// --- DADOS REAIS DO CURRÍCULO ---

const projects = [
  {
    title: "FiberOptic Sentinel",
    desc: "Monitoramento em tempo real de redes FTTH usando Python. Analisa queda de sinal e gera alertas automáticos.",
    tags: ["Python", "IoT", "Data"],
    icon: Activity
  },
  {
    title: "NetDeploy Auto",
    desc: "Script de automação para configurar Switches Cisco/Huawei via SSH, reduzindo tempo de setup em 70%.",
    tags: ["Bash", "Network", "Automation"],
    icon: Terminal
  },
  {
    title: "ISP Manager Dashboard",
    desc: "Interface moderna para técnicos de campo visualizarem status de conexão e ordens de serviço.",
    tags: ["React", "Next.js", "UI/UX"],
    icon: Layers
  }
];

const skills = [
  { name: "Fibra Óptica & FTTH", level: 95, icon: Wifi },
  { name: "Infraestrutura de Redes", level: 90, icon: Server },
  { name: "Python & Automação", level: 80, icon: Code2 },
  { name: "Hardware & Manutenção", level: 85, icon: Cpu },
];

export default function Portfolio() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 font-sans">
      
      {/* --- BACKGROUND FX --- */}
      <div className="bg-noise fixed inset-0 z-[1]" />
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] blob" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] blob" style={{ animationDelay: "2s" }} />
      
      {/* --- CONTEÚDO PRINCIPAL (Z-INDEX ALTO PARA FICAR SOBRE O NOISE) --- */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                OPEN TO WORK
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
                Olá, eu sou <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  ViictorN
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                A fusão entre o mundo físico das <strong>Telecomunicações</strong> e a lógica do <strong>Desenvolvimento Moderno</strong>. Transformo cabos e códigos em soluções.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={18} /> Entrar em Contato
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                
                <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-2 text-white">
                  <Download size={18} /> Download CV
                </button>
              </div>
            </motion.div>

            {/* CARD FLUTUANTE 3D */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl transform rotate-6" />
              <GlassCard className="transform -rotate-3 border-emerald-500/20 bg-black/40">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <Terminal className="text-slate-600" size={20} />
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-purple-400">user</span>
                    <span className="text-slate-500">@</span>
                    <span className="text-blue-400">viictorn</span>
                    <span className="text-white">:~#</span>
                    <span className="text-yellow-300">init protocol</span>
                  </div>
                  <div className="text-slate-400 pl-4">&gt; Establishing secure connection...</div>
                  <div className="text-slate-400 pl-4">&gt; Loading telecom modules... [OK]</div>
                  <div className="text-slate-400 pl-4">&gt; Loading dev skills... [OK]</div>
                  <div className="text-emerald-400 pl-4">&gt; System Ready.</div>
                  <div className="w-3 h-5 bg-emerald-500 animate-pulse mt-2" />
                </div>
              </GlassCard>
            </motion.div>

          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
          >
            <ChevronDown />
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="MINHA STACK" title="Habilidades Técnicas" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, i) => (
                <GlassCard key={i} delay={i * 0.1} className="hover:border-emerald-500/30 group">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <skill.icon className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    />
                  </div>
                  <p className="text-right text-xs text-slate-500 mt-2">{skill.level}% Dominância</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="py-32 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="PORTFÓLIO" title="Projetos Recentes" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <GlassCard key={i} delay={i * 0.2} className="group cursor-pointer">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="text-emerald-400 fill-emerald-400/20" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:border-emerald-500/50 transition-colors">
                    <project.icon className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer className="py-20 px-6 border-t border-white/5 bg-black/40 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Vamos construir algo incrível?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <GlassCard className="flex items-center gap-4 px-8 py-4">
                <Mail className="text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-white font-medium">victor140730@gmail.com</div>
                </div>
              </GlassCard>
              
              <GlassCard className="flex items-center gap-4 px-8 py-4">
                <Phone className="text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Telefone</div>
                  <div className="text-white font-medium">(87) 98164-1911</div>
                </div>
              </GlassCard>
            </div>
            
            <div className="flex justify-center gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin /></a>
            </div>
            <p className="text-slate-600 text-sm mt-8">© 2025 ViictorN. Desenvolvido com Next.js & Tailwind.</p>
          </div>
        </footer>

      </div>
    </main>
  );
}