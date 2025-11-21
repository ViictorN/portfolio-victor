'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Server, 
  Code2, 
  Cpu, 
  Terminal, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin,
  ChevronDown
} from 'lucide-react';

// --- Componentes de UI Reutilizáveis ---

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const Card = ({ title, desc, icon: Icon, tags }: { title: string, desc: string, icon: any, tags?: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm hover:border-emerald-500/50 transition-colors group"
  >
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
      <Icon className="text-emerald-400 w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
    {tags && (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

// --- Dados do Currículo & Projetos (Baseados no PDF) ---

const projects = [
  {
    title: "FiberOptic Monitor",
    desc: "Sistema de monitoramento de atenuação de sinal em redes FTTH. Utiliza Python para análise de dados de OTDR e gera relatórios automatizados.",
    tags: ["Python", "Telecom", "Data Analysis"],
    icon: ActivityIcon
  },
  {
    title: "AutoConfig Switch",
    desc: "Script de automação para configuração em massa de Switches e Roteadores via SSH, reduzindo o tempo de implantação em 70%.",
    tags: ["Network Automation", "Bash", "Cisco CLI"],
    icon: Terminal
  },
  {
    title: "ISP Manager UI",
    desc: "Interface moderna para gestão de clientes de provedores locais, integrando dados de conexão e status financeiro.",
    tags: ["React", "Node.js", "UI/UX"],
    icon: Server
  }
];

const skills = [
  { name: "Redes de Fibra Óptica", level: 95, icon: Wifi },
  { name: "Infraestrutura & Hardware", level: 90, icon: Cpu },
  { name: "Configuração (Switch/Router)", level: 85, icon: Server },
  { name: "Python & Automação", level: 75, icon: Code2 }, // Adicionado baseado no seu interesse
];

function ActivityIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    )
}

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 tracking-wide">
              DISPONÍVEL PARA CONTRATAÇÃO
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Olá, eu sou <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Victor Gomes</span>.
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-400 mb-8 font-light">
              Técnico em Telecomunicações & <br className="md:hidden"/>Desenvolvedor de Soluções.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed md:mx-0 mx-auto">
              Especialista em conectar o mundo físico ao digital. Combino expertise em 
              <span className="text-slate-200"> Redes de Fibra Óptica</span> e 
              <span className="text-slate-200"> Infraestrutura</span> com habilidades modernas de 
              <span className="text-slate-200"> Desenvolvimento</span> para criar soluções robustas e eficientes.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Mail size={20} /> Contate-me
              </button>
              <button className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                <Download size={20} /> Baixar CV
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <ChevronDown />
        </motion.div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <Section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-emerald-400 font-medium mb-2">SOBRE MIM</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Conectividade e Inovação Técnica</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              Com base em Bom Conselho - PE, sou um profissional focado na excelência técnica. 
              Minha formação na Escola Técnica Estadual Francisco de Matos Sobrinho me deu as bases sólidas, 
              mas minha curiosidade me levou além.
            </p>
            <p>
              Tenho experiência prática em instalação e manutenção de redes (Fibra Óptica e Coaxial), 
              mas meu diferencial está na visão sistêmica: entendo não apenas como passar o cabo, 
              mas como os dados trafegam, como configurar os equipamentos (Cisco, Huawei, Mikrotik) 
              e como otimizar a performance através de lógica e software.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="text-2xl font-bold text-white mb-1">3+ Anos</h4>
              <p className="text-sm text-slate-500">Estudos em Tecnologia</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="text-2xl font-bold text-white mb-1">100%</h4>
              <p className="text-sm text-slate-500">Comprometimento</p>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Stack Tecnológica</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="flex items-center gap-2 text-slate-300">
                      <skill.icon size={16} className="text-emerald-400"/> {skill.name}
                    </span>
                    <span className="text-slate-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --- SERVICES / EXPERTISE --- */}
      <Section>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-emerald-400 font-medium mb-2">O QUE EU FAÇO</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Expertise Técnica</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            title="Telecomunicações" 
            desc="Instalação e manutenção de redes de fibra óptica, testes com OTDR e Power Meter, garantindo sinal limpo e estável."
            icon={Wifi}
          />
          <Card 
            title="Redes & Infra" 
            desc="Configuração avançada de roteadores, switches e modems. Conhecimento em protocolos IP, cabeamento estruturado e LAN/WAN."
            icon={Server}
          />
          <Card 
            title="Suporte & Diagnóstico" 
            desc="Resolução ágil de problemas (troubleshooting), interpretação de esquemas técnicos e suporte ao cliente com excelência."
            icon={ActivityIcon}
          />
        </div>
      </Section>

      {/* --- PROJECTS (PORTFOLIO) --- */}
      <Section className="bg-slate-900/30 rounded-3xl border border-white/5 my-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h3 className="text-emerald-400 font-medium mb-2">PORTFÓLIO</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Projetos Selecionados</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            Ver GitHub <Github size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              title={project.title}
              desc={project.desc}
              tags={project.tags}
              icon={project.icon}
            />
          ))}
        </div>
      </Section>

      {/* --- FORMATION TIMELINE (Curriculum Data) --- */}
      <Section>
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Formação & Certificações</h2>
        <div className="max-w-3xl mx-auto space-y-8 border-l-2 border-slate-800 pl-8 ml-4 md:ml-0">
          
          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#0a0a0a]" />
            <div className="text-sm text-emerald-400 mb-1">2021 - 2023 (Concluído)</div>
            <h3 className="text-xl font-bold text-white">Técnico em Redes de Computadores</h3>
            <p className="text-slate-400">Escola Técnica Estadual Francisco de Matos Sobrinho</p>
            <p className="text-slate-500 text-sm mt-2">Foco em infraestrutura de redes, protocolos e serviços, segurança de dados e telecomunicações.</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-700 border-4 border-[#0a0a0a]" />
            <div className="text-sm text-slate-500 mb-1">Certificações Diversas</div>
            <h3 className="text-xl font-bold text-white">Cursos Profissionalizantes</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/>Cabeamento Estruturado</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/>Configuração de Roteadores/Switches</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/>Fundamentos de Redes Ópticas</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/>IoT e Automação</li>
            </ul>
          </div>

        </div>
      </Section>

      {/* --- FOOTER / CONTACT --- */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-20 pt-20 pb-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Vamos trabalhar juntos?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
            <a href="mailto:victor140730@gmail.com" className="flex items-center justify-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail size={20} /> victor140730@gmail.com
            </a>
            <a href="tel:+5587981641911" className="flex items-center justify-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors">
              <Phone size={20} /> (87) 98164-1911
            </a>
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <MapPin size={20} /> Bom Conselho - PE
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-emerald-500 hover:text-black transition-all"><Github size={20}/></a>
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={20}/></a>
          </div>

          <p className="text-slate-600 text-sm">
            © 2025 ViictorN. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}