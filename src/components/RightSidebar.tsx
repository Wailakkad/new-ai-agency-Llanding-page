import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck, AppWindow, Sparkles } from "lucide-react";

interface RightSidebarProps {
  onBookCallClick: () => void;
  onSelectProject?: (projIndex: number) => void;
}

export default function RightSidebar({ onBookCallClick, onSelectProject }: RightSidebarProps) {
  const [activeCircleIndex, setActiveCircleIndex] = useState(0);

  // Orbits pattern simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCircleIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const trustPartners = ["thavo", "Leafo", "hues", "flavor", "Crona", "Mercury"];

  return (
    <div className="flex flex-col gap-3 w-[220px] pointer-events-auto select-none" id="far-right-sidebar-stack">
      {/* CARD 1: AgentAi */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
        className="bg-[#0f0f19]/85 backdrop-blur-[12px] rounded-2xl p-3.5 border border-white/8 shadow-2xl relative overflow-hidden transition-all duration-300"
        id="right-card-agent-ai"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2.5" id="agent-ai-card-title-row">
          <span className="text-[13px] font-bold text-white tracking-wide flex items-center gap-1.5">
            <Sparkles size={11} className="text-cyan-400 mt-0.5 animate-pulse" />
            AgentAi
          </span>
          <span className="text-[11px] font-mono text-zinc-500 tracking-tight">01/04</span>
        </div>

        {/* Middle: 3D logo graphic - dark placeholder with blue glow and styled orbits */}
        <div 
          onClick={() => onSelectProject?.(0)}
          className="relative h-[80px] w-full bg-[#07070f] border border-white/5 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer group mb-3"
          id="orbiting-glowing-3d-placeholder"
        >
          {/* Inner futuristic glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.15)_0%,transparent_70%)]" />
          
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute w-12 h-12 border border-dotted border-cyan-400/30 rounded-full flex items-center justify-center"
          >
            {/* Spinning orbit node */}
            <div className="absolute -top-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,191,255,1)]" />
          </motion.div>

          {/* Core Glowing 3D structures */}
          <div className="relative flex items-center justify-center">
            {/* Horizontal glowing ellipse */}
            <motion.div
              animate={{ rotateX: [60, 60], rotateY: [0, 360], scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute w-14 h-[24px] border border-cyan-500/40 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]"
              style={{ transformStyle: "preserve-3d" }}
            />
            {/* Vertical glowing ellipse */}
            <motion.div
              animate={{ rotateX: [60, 60], rotateY: [180, -180], scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute w-14 h-[24px] border border-cyan-300/40 rounded-full shadow-[0_0_15px_rgba(0,191,255,0.15)]"
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* Glowing blue core sphere */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.9),inset_0_0_4px_white] z-10"
            />
          </div>

          {/* Corner scanlines decoration */}
          <div className="absolute top-1 left-1.5 text-[7px] text-cyan-400/40 font-mono">3D_CORE_OK</div>
          <div className="absolute bottom-1 right-1.5 text-[7px] text-cyan-500/40 font-mono">NODE_01</div>
        </div>

        {/* Metrics info */}
        <div id="ai-launches-count-section">
          <div className="text-[36px] font-extrabold text-white font-display tracking-tight leading-none">
            100+
          </div>
          <div className="text-[11px] text-zinc-400 font-normal leading-normal mt-1">
            Projects successfully launched worldwide
          </div>
        </div>
      </motion.div>

      {/* CARD 2: Trusted Partner */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
        className="bg-[#0f0f19]/85 backdrop-blur-[12px] rounded-2xl p-3.5 border border-white/8 shadow-2xl transition-all duration-300"
        id="right-card-trusted-partners"
      >
        <div id="trusted-partner-headers-row">
          <div className="text-[36px] font-extrabold text-white font-display tracking-tight leading-none">
            250+
          </div>
          <div className="text-[13px] text-zinc-400 font-medium leading-normal mt-0.5 mb-3">
            Trusted Partner
          </div>
        </div>

        {/* Grid of 6 partner logos / micro placeholders */}
        <div className="grid grid-cols-3 gap-1.5 mb-4" id="partners-logos-grid-3x2">
          {trustPartners.map((p, idx) => (
            <div
              key={idx}
              className="h-7 border border-white/5 rounded-md bg-white/2 flex items-center justify-center hover:bg-white/8 hover:border-white/10 transition-colors duration-200 cursor-help group/p relative"
              title={`Enterprise Partner ${p}`}
              id={`partner-placeholder-${p}`}
            >
              <span className="text-[9px] font-semibold text-zinc-400 group-hover/p:text-cyan-400 transition-colors duration-300 font-display">
                {p}
              </span>

              {/* Verified partner badge hover pop */}
              <div className="absolute scale-0 group-hover/p:scale-100 transition-transform duration-200 -top-1 -right-1 bg-cyan-500 rounded-full p-0.5 shadow-md">
                <ShieldCheck size={6} className="text-black" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button "Book a call" */}
        <motion.button
          whileHover={{ scale: 1.03, backgroundColor: "#0284c7" }}
          whileTap={{ scale: 0.97 }}
          onClick={onBookCallClick}
          className="w-full flex items-center justify-center gap-1.5 bg-[#0ea5e9] text-white py-2.5 rounded-lg text-[13px] font-semibold relative overflow-hidden cursor-pointer shadow-[0_4px_12px_rgba(14,165,233,0.3)] transition-colors duration-200 outline-hidden"
          id="book-call-cta-button"
        >
          <span>Book a call</span>
          <ArrowUpRight size={13} className="stroke-[2.5]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
