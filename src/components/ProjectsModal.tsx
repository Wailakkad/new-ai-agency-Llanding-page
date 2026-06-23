import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Compass, ArrowUpRight, Check } from "lucide-react";
import { ProjectItem } from "../types";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (proj: ProjectItem) => void;
}

export default function ProjectsModal({ isOpen, onClose, onSelectProject }: ProjectsModalProps) {
  const [filter, setFilter] = useState<string>("all");

  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "SynthFace Identity v4",
      discipline: "AI DESIGN",
      year: "2026",
      metric: "+120% engagement",
      image: "synthface",
    },
    {
      id: "p2",
      title: "Zephyr Conversational Core",
      discipline: "CHATBOT",
      year: "2025",
      metric: "98.2% accuracy score",
      image: "zephyr",
    },
    {
      id: "p3",
      title: "Looming Vector Logos",
      discipline: "BRANDING",
      year: "2026",
      metric: "6 premium sub-brands",
      image: "looming",
    },
    {
      id: "p4",
      title: "Neural Nexus Dashboard",
      discipline: "AI DESIGN",
      year: "2025",
      metric: "30ms render speed",
      image: "nexus",
    },
    {
      id: "p5",
      title: "Thavo Enterprise Portal",
      discipline: "BRANDING",
      year: "2026",
      metric: "$4.5M seed funding",
      image: "thavo",
    },
    {
      id: "p6",
      title: "Leafo Custom Fine-tunings",
      discipline: "AI DESIGN",
      year: "2025",
      metric: "80,000 graphics gen",
      image: "leafo",
    },
    {
      id: "p7",
      title: "Mercury Conversational Hub",
      discipline: "CHATBOT",
      year: "2026",
      metric: "450,000 queries/day",
      image: "mercury",
    },
    {
      id: "p8",
      title: "Hues Chroma Generative Kits",
      discipline: "BRANDING",
      year: "2025",
      metric: "99% satisfaction rate",
      image: "hues",
    },
    {
      id: "p9",
      title: "Flavor AI Assistant UI",
      discipline: "CHATBOT",
      year: "2026",
      metric: "42s avg resolution time",
      image: "flavor",
    },
    {
      id: "p10",
      title: "Crona Flow Graphics Matrix",
      discipline: "AI DESIGN",
      year: "2026",
      metric: "12 parallel nodes",
      image: "crona",
    },
    {
      id: "p11",
      title: "Core Aether Interaction Space",
      discipline: "BRANDING",
      year: "2026",
      metric: "10M physical touchpoints",
      image: "aether",
    },
    {
      id: "p12",
      title: "Nova Chat Orchestrator",
      discipline: "CHATBOT",
      year: "2025",
      metric: "Zero database lag",
      image: "nova",
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.discipline.toLowerCase() === filter.toLowerCase()
  );

  const getCardColorGradient = (imageName: string) => {
    switch (imageName) {
      case "synthface":
        return "from-cyan-950 via-cyan-900/50 to-[#0c0c16]";
      case "zephyr":
        return "from-purple-950 via-purple-900/50 to-[#0c0c16]";
      case "looming":
        return "from-emerald-950 via-emerald-900/50 to-[#0c0c16]";
      case "nexus":
        return "from-blue-950 via-blue-900/50 to-[#0c0c16]";
      case "thavo":
        return "from-pink-950 via-pink-900/50 to-[#0c0c16]";
      case "leafo":
        return "from-teal-950 via-teal-900/50 to-[#0c0c16]";
      case "mercury":
        return "from-sky-950 via-sky-900/50 to-[#0c0c16]";
      case "hues":
        return "from-fuchsia-950 via-fuchsia-900/50 to-[#0c0c16]";
      case "flavor":
        return "from-rose-950 via-rose-900/50 to-[#0c0c16]";
      case "crona":
        return "from-indigo-950 via-indigo-900/50 to-[#0c0c16]";
      case "aether":
        return "from-violet-950 via-violet-900/50 to-[#0c0c16]";
      case "nova":
        return "from-amber-950 via-amber-900/50 to-[#0c0c16]";
      default:
        return "from-zinc-950 via-zinc-900/50 to-[#0c0c16]";
    }
  };

  const getAccentBgAndText = (discipline: string) => {
    switch (discipline) {
      case "BRANDING":
        return "bg-amber-400/10 text-amber-300 border-amber-500/20";
      case "AI DESIGN":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
      case "CHATBOT":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-300 border-zinc-500/20";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter overlay screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-6xl bg-[#090912]/95 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col overflow-hidden max-h-[85vh] pointer-events-auto"
          id="portfolio-projects-modal"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/5" id="projects-header-strip">
            <div className="mb-3 md:mb-0">
              <span className="text-cyan-404 font-mono text-[10px] tracking-widest uppercase block text-cyan-400">
                OUR SHOWCASE
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-0.5 font-display">
                Studio Projects <span className="text-white/40 font-normal">({projects.length})</span>
              </h2>
            </div>

            {/* Project Filter tabs */}
            <div className="flex items-center gap-1.5 flex-wrap" id="project-filter-buttons-panel">
              {["all", "branding", "ai design", "chatbot"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-1 text-[11px] font-mono rounded-full border text-center transition-all cursor-pointer uppercase ${
                    filter === item
                      ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                      : "bg-white/2 hover:bg-white/5 text-white/50 border-transparent hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white cursor-pointer"
              aria-label="Close portfolio modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Grid list container (scrollable) */}
          <div className="flex-1 overflow-y-auto py-5 pr-2 mt-2" id="portfolio-projects-scroller">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              id="portfolio-projects-layout-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.18)" }}
                    className="group border border-white/5 bg-zinc-950/40 rounded-xl p-4 flex flex-col justify-between h-[180px] relative overflow-hidden transition-all duration-300"
                    id={`project-item-card-${p.id}`}
                  >
                    {/* Glowing contextual card back-vector */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none -z-10 ${getCardColorGradient(p.image)}`} />

                    {/* Top Row: Year and Tag */}
                    <div className="flex justify-between items-center" id={`project-header-${p.id}`}>
                      <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-md border ${getAccentBgAndText(p.discipline)}`}>
                        {p.discipline}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{p.year}</span>
                    </div>

                    {/* Mid Section: Design Title */}
                    <div className="mt-4" id={`project-[middle]-${p.id}`}>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight font-display line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                        <Check size={8} className="stroke-[3]" /> {p.metric}
                      </p>
                    </div>

                    {/* Bottom Row action trigger */}
                    <div 
                      onClick={() => onSelectProject?.(p)}
                      className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-zinc-500 group-hover:text-white transition-colors cursor-pointer text-[11px]"
                      id={`project-footer-trigger-${p.id}`}
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider">Inspect Deliverable</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Prompt footer info banner */}
          <div className="pt-4 border-t border-white/5 mt-2 flex flex-col sm:flex-row justify-between items-center bg-white/1 text-xs gap-3 p-3 rounded-lg border border-white/5" id="projects-consultation-lead-banner">
            <span className="text-zinc-400 leading-relaxed max-w-xl text-center sm:text-left">
              Each workspace product above represents custom pipeline outputs constructed entirely through our <strong>@google/genai</strong> microservice stack.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-400 transition-colors text-nowrap cursor-pointer shadow-lg outline-hidden"
              id="dismiss-projects-modal-cta"
            >
              Explore Hero
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
