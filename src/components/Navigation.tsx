import { useState } from "react";
import { motion } from "motion/react";
import { LayoutGrid, Sparkles, Sliders } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  projectsCount: number;
}

export default function Navigation({
  activeTab,
  onTabChange,
  onToggleMenu,
  isMenuOpen,
  projectsCount,
}: NavigationProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tabs = [
    { id: "studio", label: "Studio" },
    { id: "projects", label: `Project (${projectsCount})` },
    { id: "services", label: "Service" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full h-20 px-4 md:px-10 flex items-center justify-between z-50 pointer-events-auto select-none"
      id="main-navigation-header"
    >
      {/* Left side: Navigation links */}
      <nav className="flex items-center gap-1 md:gap-2" id="nav-links-container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative px-3 py-1.5 text-[12px] md:text-[13px] font-medium transition-colors cursor-pointer rounded-full outline-hidden"
              style={{
                color: isActive ? "#000000" : "#ffffff",
              }}
              id={`nav-tab-${tab.id}`}
            >
              {/* Hover highlight background */}
              {hoveredTab === tab.id && !isActive && (
                <motion.span
                  layoutId="navHoverBg"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Active Tab Background Pill */}
              {isActive && (
                <motion.span
                  layoutId="navActiveBg"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Center: Tech-style grid/cross logo */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
        onClick={() => onTabChange("studio")}
        title="AI Studio Home"
        id="nav-center-logo"
      >
        <motion.div
          animate={{ rotate: [0, 90, 90, 180, 180, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="relative text-white"
        >
          <LayoutGrid size={28} className="stroke-[1.5] filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-[11px] left-[11px] w-1.5 h-1.5 bg-cyan-400 rounded-xs"
          />
        </motion.div>
      </div>

      {/* Right side: Frosted Menu button with circular animated dot icon */}
      <div className="flex items-center gap-3" id="nav-right-actions">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onToggleMenu}
          className="flex items-center gap-2.5 px-4 py-1.5 bg-black/45 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-colors duration-300 group cursor-pointer"
          id="menu-toggle-button"
        >
          <span className="text-[12px] md:text-[13px] font-medium text-white tracking-wide">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          
          {/* Circular Animated Grid Icon (dots matrix) */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            {isMenuOpen ? (
              <motion.div 
                initial={{ rotate: -90, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <div className="absolute w-full h-[1.5px] bg-white rotate-45" />
                  <div className="absolute w-full h-[1.5px] bg-white -rotate-45" />
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-1 w-3 h-3 group-hover:rotate-90 transition-transform duration-300">
                <motion.div 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                  className="w-1 h-1 bg-white rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
                  className="w-1 h-1 bg-cyan-400 rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }}
                  className="w-1 h-1 bg-white rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.9 }}
                  className="w-1 h-1 bg-white rounded-full" 
                />
              </div>
            )}
          </div>
        </motion.button>
      </div>
    </motion.header>
  );
}
