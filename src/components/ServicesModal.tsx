import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cpu, Eye, Activity, Sparkle, ArrowRight } from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceToBook: (serviceTitle: string) => void;
}

export default function ServicesModal({ isOpen, onClose, onSelectServiceToBook }: ServicesModalProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>("branding");

  const services: ServiceItem[] = [
    {
      id: "branding",
      title: "Neural Brand Strategy",
      description: "We merge classic brand frameworks with synthetic neural analytics to explore unprecedented territory, establishing brand voice, color vectors, and audience alignments in mere hours, not months.",
      specs: [
        "LLM-Augmented competitive analysis",
        "Semantic search & positioning maps",
        "Prompt-engineered tone manuals",
        "Social identity target matrix",
        "Interactive brand books"
      ],
      duration: "1-2 Weeks SLA",
    },
    {
      id: "aidesign",
      title: "AI Identity Design",
      description: "Generative UI/UX, responsive layouts, customizable vector icons, and customized stable diffusion fine-tunings (LORAs) trained on your specific identity files. Never worry about consistency again.",
      specs: [
        "Custom Stable Diffusion LORA weights",
        "Responsive React & Tailwind components",
        "3D abstract asset generation",
        "Figma design system alignments",
        "High-fidelity responsive UI layouts"
      ],
      duration: "2-3 Weeks SLA",
    },
    {
      id: "chatbot",
      title: "Cognitive Interfaces & Chatbots",
      description: "We build gorgeous, human-grade wrappers and front-ends for conversational pipelines, incorporating vector memories, multi-agent frameworks, realistic voice overlays, and interactive avatar mechanics.",
      specs: [
        "Gemini API model orchestrations",
        "Embeddings & vectorized context memories",
        "Real-time audio/voice pipelines",
        "Visual feedback state trackers",
        "Self-healing API connector proxies"
      ],
      duration: "3-4 Weeks SLA",
    },
  ];

  const currentService = services.find((s) => s.id === activeServiceId) || services[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-4xl bg-[#080810]/95 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden max-h-[85vh] pointer-events-auto"
          id="services-dashboard-modal"
        >
          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white cursor-pointer z-20"
            aria-label="Close services modal"
          >
            <X size={18} />
          </button>

          {/* Left panel: Vertical selector lists */}
          <div className="w-full md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6" id="services-selector-pane">
            <div>
              <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase block mb-1">
                DISCIPLINE CORE
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-5 font-display">
                Creative Capabilities
              </h2>

              <div className="space-y-2" id="services-tabs-stack">
                {services.map((item) => {
                  const isCur = item.id === activeServiceId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveServiceId(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 cursor-pointer border ${
                        isCur
                          ? "bg-cyan-500/10 border-cyan-400/30 text-white shadow-md shadow-cyan-400/5"
                          : "bg-white/2 border-transparent text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                      id={`services-tab-select-${item.id}`}
                    >
                      <span className="text-xs font-bold tracking-wide">{item.title}</span>
                      <ArrowRight
                        size={12}
                        className={`transition-transform duration-300 ${isCur ? "translate-x-1 text-cyan-404" : "opacity-30"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro badge indicator */}
            <div className="mt-6 hidden md:flex items-center gap-2 text-zinc-500 text-[11px] font-mono" id="neural-matrix-status">
              <Activity size={12} className="text-cyan-500/70 animate-pulse" />
              <span>CORE_ENGINE: ACTIVE</span>
            </div>
          </div>

          {/* Right panel: Active Service Specifications overview */}
          <div className="w-full md:w-2/3 flex flex-col justify-between" id="active-service-specification-details">
            <motion.div
              key={activeServiceId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
              id="active-service-details-parent"
            >
              {/* Header metrics */}
              <div className="flex items-center justify-between" id="service-metadata-strip">
                <span className="text-[11px] bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-2.5 py-0.5 rounded-full font-mono">
                  {currentService.duration}
                </span>
                <span className="text-zinc-500 text-[11px] font-mono flex items-center gap-1">
                  <Cpu size={12} /> ENGINE_LORA_V4
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Sparkle size={16} className="text-cyan-400" />
                  {currentService.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 p-3 bg-white/2 rounded-lg border border-white/5">
                  {currentService.description}
                </p>
              </div>

              {/* Specifications Deliverables list */}
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">
                  PRESCRIBED DELIVERABLES & SPECS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id={`specs-grid-for-${currentService.id}`}>
                  {currentService.specs.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-black/40 border border-white/5 px-2.5 py-2 rounded-md hover:border-cyan-400/20 transition-colors"
                    >
                      <Eye size={12} className="text-cyan-400 shrink-0" />
                      <span className="text-[11px] text-zinc-300 truncate">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Launch Call Action anchor */}
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
              <div id="service-engagement-advisory">
                <p className="text-[10px] text-zinc-400 font-mono">LAUNCH PIPELINE</p>
                <p className="text-[11px] text-white font-semibold">Integrate this capability into your project scope.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectServiceToBook(currentService.title)}
                className="bg-[#0ea5e9] hover:bg-sky-400 text-white font-bold text-xs tracking-wide px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-lg outline-hidden"
                id="select-capability-booking-trigger"
              >
                <span>Book call</span>
                <ArrowRight size={12} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
