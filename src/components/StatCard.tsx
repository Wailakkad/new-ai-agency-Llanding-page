import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, TrendingUp, CheckCircle2, UserCheck } from "lucide-react";

interface StatCardProps {
  onAvatarClick?: (name: string) => void;
  isHorizontal?: boolean;
}

export default function StatCardsGroup({ onAvatarClick, isHorizontal = false }: StatCardProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<string | null>(null);

  const avatars = [
    {
      id: "u1",
      name: "Sophia Martinez",
      role: "VP @ BrandTech",
      initial: "SM",
      color: "from-cyan-400 to-blue-500",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
    },
    {
      id: "u2",
      name: "Marcus Sterling",
      role: "Founder, NeoLab",
      initial: "MS",
      color: "from-purple-500 to-indigo-600",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
    },
    {
      id: "u3",
      name: "Elena Rostova",
      role: "Creative @ Voxel",
      initial: "ER",
      color: "from-emerald-400 to-teal-600",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    },
  ];

  const handleAvatarSelect = (name: string) => {
    if (onAvatarClick) {
      onAvatarClick(name);
    }
    setCopiedSuccess(name);
    setTimeout(() => setCopiedSuccess(null), 2500);
  };

  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-3 pointer-events-auto select-none`} id="stats-cards-vertical-stack">
      {/* CARD 1: Happy people */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(25, 25, 40, 0.85)" }}
        className="w-[155px] bg-[#14141e]/75 backdrop-blur-[12px] border border-white/8 rounded-xl p-3.5 shadow-xl transition-all duration-300"
        id="stat-card-happy-people"
      >
        <div className="flex items-center justify-between mb-1" id="happy-people-[header-info]">
          <span className="text-[11px] text-white/50 tracking-wider font-mono">HAPPY PEOPLE</span>
          <Users size={12} className="text-cyan-400 opacity-70" />
        </div>
        
        <h3 className="text-3xl font-extrabold text-white tracking-tight leading-none" id="happy-people-count">
          3M+
        </h3>

        {/* Overlapping avatars row */}
        <div className="flex items-center -space-x-2 mt-3 relative h-8" id="avatars-overlapping-row">
          {avatars.map((av) => (
            <div
              key={av.id}
              className="relative cursor-pointer"
              onMouseEnter={() => setActiveHoverId(av.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              onClick={() => handleAvatarSelect(av.name)}
              id={`avatar-container-${av.id}`}
            >
              <motion.div
                whileHover={{ scale: 1.25, zIndex: 10, y: -2 }}
                className="w-7 h-7 rounded-full border border-[#14141e] overflow-hidden bg-gradient-to-tr shadow-sm"
              >
                {av.img ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={av.img}
                    alt={av.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br ${av.color}`}>
                    {av.initial}
                  </div>
                )}
              </motion.div>

              {/* Avatar tooltips showing premium micro details */}
              <AnimatePresence>
                {activeHoverId === av.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: -38 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 border border-white/10 rounded-md text-nowrap z-30 shadow-2xl pointer-events-none"
                  >
                    <p className="text-[10px] font-semibold text-white leading-tight">{av.name}</p>
                    <p className="text-[8px] text-neutral-400 leading-none mt-0.5">{av.role}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {/* Decorative indicator dots */}
          <span className="text-[10px] text-zinc-500 pl-3 font-mono">+12k</span>
        </div>
      </motion.div>

      {/* CARD 2: ROI Improvement */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(25, 25, 40, 0.85)" }}
        className="w-[155px] bg-[#14141e]/75 backdrop-blur-[12px] border border-white/8 rounded-xl p-3.5 shadow-xl transition-all duration-300"
        id="stat-card-roi-improvement"
      >
        <div className="flex items-center justify-between mb-1" id="roi-[header-info]">
          <span className="text-[11px] text-white/50 tracking-wider font-mono">ROI IMPROVE</span>
          <TrendingUp size={12} className="text-emerald-400 opacity-80" />
        </div>
        
        <h3 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-1" id="roi-[percentage]">
          95%
        </h3>
        
        <p className="text-[10px] text-zinc-400 leading-snug mt-1.5 font-normal" id="roi-explanatory-subtext">
          Clients reported better ROI within 1 month.
        </p>
      </motion.div>

      {/* Micro-toast confirmation for clicking avatar */}
      <AnimatePresence>
        {copiedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-zinc-900/95 border border-emerald-500/35 rounded-lg shadow-2xl z-50 text-xs text-emerald-300"
            id="toast-avatar-info"
          >
            <UserCheck size={14} />
            <span>Connection verified: <strong>{copiedSuccess}</strong></span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
