import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, Star, Instagram, Facebook, Linkedin, Play, Pause, RefreshCw, Volume2, VolumeX, HelpCircle, ArrowRight } from "lucide-react";

import Navigation from "./components/Navigation";
import StatCardsGroup from "./components/StatCard";
import RightSidebar from "./components/RightSidebar";
import PricingModal from "./components/PricingModal";
import ServicesModal from "./components/ServicesModal";
import BookingModal from "./components/BookingModal";
import ProjectsModal from "./components/ProjectsModal";
import TeamIntroSection from "./components/TeamIntroSection";
import ServicesSection from "./components/ServicesSection";
import FeaturedProjectSection from "./components/FeaturedProjectSection";
import FounderSection from "./components/FounderSection";
import AchievementsSection from "./components/AchievementsSection";
import StatisticsSection from "./components/StatisticsSection";
import CreativeTeamSection from "./components/CreativeTeamSection";
import TestimonialSection from "./components/TestimonialSection";
import PricingSection from "./components/PricingSection";

export default function App() {
  const [activeTab, setActiveTab] = useState("studio");
  
  // Interactive Modal UI Triggers
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  
  // Preselected category/service for scheduling pop
  const [bookingPreselect, setBookingPreselect] = useState("");

  // Video Background playback state manager
  const [videoPlayState, setVideoPlayState] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto play programmatically to safely bypass sandbox blockages
  useEffect(() => {
    if (videoRef.current) {
      if (videoPlayState) {
        videoRef.current.play().catch((err) => {
          // Fallback if browser security rules blocks instant autoplay
          console.log("Autoplay blocked initially, awaiting user gesture:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlayState]);

  const handleVideoPlaybackToggle = () => {
    if (videoRef.current) {
      if (videoPlayState) {
        videoRef.current.pause();
        setVideoPlayState(false);
      } else {
        videoRef.current.play().then(() => {
          setVideoPlayState(true);
        }).catch((err) => {
          console.log("Playback toggle failed:", err);
        });
      }
    }
  };

  const handleVideoVolumeToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleTabSelection = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "projects") {
      setIsProjectsOpen(true);
    } else if (tabId === "services") {
      setIsServicesOpen(true);
    } else {
      // "studio" resets any open overlays back to cinematic view
      setIsProjectsOpen(false);
      setIsServicesOpen(false);
      setIsBookingOpen(false);
      setIsPricingOpen(false);
    }
  };

  const triggerCustomServiceAlignment = (serviceTitle: string) => {
    setBookingPreselect(serviceTitle);
    setIsServicesOpen(false);
    setIsBookingOpen(true);
  };

  const triggerGenericBooking = () => {
    setBookingPreselect("");
    setIsBookingOpen(true);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-x-hidden overflow-y-auto bg-[#000005] scroll-smooth"
      id="main-agency-hero-canvas-root"
    >
      {/* 2. NAVIGATION BAR */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabSelection}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        projectsCount={12}
      />

      {/* HERO SECTION CONTAINER */}
      <section className="relative w-full h-screen overflow-hidden" id="main-hero-section">
        {/* 1. CINEMATIC VIDEO BACKGROUND LAYER */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          crossOrigin="anonymous"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 select-none pointer-events-none ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src="https://res.cloudinary.com/dhkyla1rv/video/upload/v1782211171/Robotic_hands_and_logo_animation_202606231237_1.mp4"
          id="background-cinematic-hands-video"
        />
      ) : null}

      {/* FALLBACK / LOADING BG GRADIENT */}
      {(!videoLoaded || videoError) && (
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#000005] via-[#050520] to-[#000510]"
          id="gradient-scenic-playback-fallback"
        />
      )}

      {/* SOLID / TRANSPARENT GRADIENT OVERLAY (rgba 0,0,0,0.25) to secure high text-readability */}
      <div 
        className="absolute inset-0 bg-black/25 z-10 pointer-events-none"
        id="contrast-gradient-enhancing-overlay"
      />

      {/* TECH BLUEPRINT GRAPHIC OVERLAY GRID */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] z-10 pointer-events-none"
        id="grid-tech-mesh-overlay"
      />

      {/* 3. HERO CONTENT LAYER (ABSOLUTE POSITIONED OVER VIDEO) */}
      <main className="absolute inset-0 w-full h-full z-20 pointer-events-none" id="hero-content-viewport-layout">
        
        {/* --- TOP RIGHT SMALL VERTICAL TEXT stack, rotated 90deg --- */}
        <div 
          className="absolute right-4 top-[14%] flex flex-col items-end z-20"
          id="top-right-disciplines-tag-container"
        >
          {/* Sits underneath the main menu perfectly */}
          <div 
            className="rotate-90 origin-right translate-x-[44%] flex items-center gap-5 text-[10px] tracking-[0.25em] font-mono text-white/40 uppercase whitespace-nowrap"
            id="vertical-disciplines-list"
          >
            <span className="text-zinc-500">/we do</span>
            <span className="text-[#00BFFF] font-bold shadow-xs">BRANDING</span>
            <span className="text-[#00BFFF] font-bold">AI DESIGN</span>
            <span className="text-zinc-500">CHATBOT</span>
          </div>
        </div>

        {/* --- LEFT COLUMN LAYER (starts left: 4%, top: 18%) --- */}
        <div 
          className="absolute left-[4%] top-[18%] flex flex-col gap-6 max-w-[55vw]"
          id="hero-header-textual-column"
        >
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-[195px] h-8 bg-white/8 border border-white/20 rounded-full px-3.5 flex items-center gap-2 pointer-events-auto shadow-lg select-none"
            id="creative-badge-pill"
          >
            <Sparkle size={13} className="text-cyan-400 rotate-[35deg] animate-pulse" />
            <span className="text-[13px] font-semibold text-white tracking-wide">
              AI-Design Agency
            </span>
          </motion.div>

          {/* Hero Headline */}
          <div className="flex flex-col select-none" id="hero-headline-wrapper">
            <h1 
              className="text-white text-[4rem] sm:text-[5rem] lg:text-[5.5rem] font-extrabold tracking-tight leading-[0.98] font-display flex flex-col"
              id="hero-massive-headline"
            >
              <div className="flex items-center gap-4 flex-wrap" id="headline-line-1">
                <span>Your AI</span>
                {/* Secondary idea-to-design small label block */}
                <div 
                  className="inline-flex flex-col text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 border-l border-white/15 pl-3 leading-tight mt-1.5"
                  id="swiss-accent-concept-badge"
                >
                  <span className="text-zinc-500 font-mono">From Idea</span>
                  <span className="text-cyan-400 font-bold font-mono">To Design</span>
                </div>
              </div>

              <span id="headline-line-2">Design Team</span>
              <span id="headline-line-3">On Demand</span>
            </h1>
          </div>

          {/* Subheading paragraph */}
          <p 
            className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed max-w-[320px] font-normal tracking-wide select-none"
            id="hero-subheading-faded-paragraph"
          >
            <span className="text-zinc-500 font-mono mr-1.5">/</span>
            We craft futuristic experiences where technology, emotion, and visual storytelling merge into one seamless flo...
          </p>

          {/* --- HORIZONTAL BOTTOM STAT CARDS RENDERED UNDER SUBHEADING --- */}
          <div 
            className="mt-2 z-20 pointer-events-auto"
            id="bottom-left-metrics-panel"
          >
            <StatCardsGroup onAvatarClick={triggerCustomServiceAlignment} isHorizontal={true} />
          </div>
        </div>

        {/* --- BOTTOM CENTER (bottom: 5%, left: 50%, transform: translateX(-50%)) --- */}
        <div 
          className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3.5 z-30 pointer-events-auto select-none"
          id="bottom-actions-and-ratings-hub"
        >
          {/* Stars widget block */}
          <div className="flex items-center gap-2" id="feedback-stars-row">
            <div className="flex items-center gap-0.5 text-amber-400" id="five-star-gold-icons">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 stroke-amber-500 stroke-1" />
              ))}
            </div>
            <span className="text-[13px] font-semibold text-white tracking-wide" id="stars-subtext">
              3000+ Customers
            </span>
          </div>

          {/* CTA Buttons Row */}
          <div className="flex items-center gap-3 flex-wrap justify-center font-sans" id="cta-button-horizontal-row">
            {/* CTA 1: Explore Services */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(50,50,65,0.95)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsServicesOpen(true)}
              className="bg-[#282832]/90 text-white rounded-full px-7 py-3 text-xs md:text-sm font-bold tracking-wide border border-white/20 transition-all duration-300 cursor-pointer shadow-lg outline-hidden"
              id="cta-explore-services"
            >
              Explore Services
            </motion.button>

            {/* CTA 2: View Pricing Plans (glowing cyan background) */}
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(14,165,233,0.65)"
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsPricingOpen(true)}
              className="bg-[#0EA5E9] text-white rounded-full px-7 py-3 text-xs md:text-sm font-extrabold tracking-wide cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.4)] outline-hidden"
              id="cta-view-pricing-plans"
            >
              View Pricing Plans
            </motion.button>
          </div>
        </div>

        {/* --- FAR RIGHT CARDS & SOCIAL PRESENCE CONTROL LAYER (right: 3%, top: 28%) --- */}
        <div 
          className="absolute right-[3%] top-[28%] flex flex-row items-center gap-6 z-20 pointer-events-auto"
          id="right-widgets-floating-layer"
        >
          <RightSidebar 
            onBookCallClick={triggerGenericBooking}
            onSelectProject={(proj) => {
              setIsProjectsOpen(true);
            }}
          />

          {/* Social Presence block in right of the cards */}
          <div 
            className="flex flex-col items-center gap-4"
            id="center-right-socials-block"
          >
            {/* Label vertically stacked */}
            <div className="rotate-90 origin-center translate-y-[-14px] whitespace-nowrap mb-4 select-none" id="social-stack-label">
              <span className="text-[10px] font-mono font-medium tracking-[0.25em] text-white/40 uppercase">
                Social Presence
              </span>
            </div>

            {/* Interactive icons group */}
            <div className="flex flex-col gap-3.5 mt-2" id="social-presence-icons-stack">
              {[
                { id: "ig", icon: <Instagram size={18} />, href: "https://instagram.com" },
                { id: "fb", icon: <span className="font-extrabold text-sm font-mono lowercase">f</span>, href: "https://facebook.com" },
                { id: "ln", icon: <Linkedin size={17} />, href: "https://linkedin.com" },
              ].map((soc) => (
                <motion.a
                  key={soc.id}
                  whileHover={{ scale: 1.2, color: "#00BFFF" }}
                  whileTap={{ scale: 0.9 }}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 flex items-center justify-center text-white transition-colors cursor-pointer"
                  id={`social-link-icon-${soc.id}`}
                >
                  {soc.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* --- FAR RIGHT EDGE VERTICAL SCROLL INDICATOR (right: 6px, top: 50%, transform: translateY(-50%) rotate(90deg)) --- */}
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 origin-right translate-x-[44%] flex items-center gap-3.5 z-20 select-none"
          id="scroll-vert-indicator-parent"
        >
          <span className="text-[10px] text-white/50 font-mono font-bold tracking-[0.2em] uppercase">
            Scroll down
          </span>
          <div className="w-12 h-[1px] bg-white/15 relative overflow-hidden" id="scroll-bar-line-animation">
            <motion.div
              animate={{ x: [-48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-4 h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"
            />
          </div>
        </div>

      </main>

      {/* 4. UTILITY FLOATING PLAYBACK CONTROLS FOR VIDEO CORES (Bottom Left) */}
      <div 
        className="absolute bottom-4 left-4 z-40 flex items-center gap-2 pointer-events-auto select-none"
        id="video-runtime-controllers"
      >
        {/* Toggle video background */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleVideoPlaybackToggle}
          title={videoPlayState ? "Pause back-video" : "Play back-video"}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          id="play-pause-ambient-trigger"
        >
          {videoPlayState ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
        </motion.button>

        {/* Toggle audio if video has a sound loop */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleVideoVolumeToggle}
          title={isVideoMuted ? "Unmute background audio" : "Mute background audio"}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          id="sound-unmute-toggle-trigger"
        >
          {isVideoMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-cyan-404" />}
        </motion.button>
      </div>
      </section>

      {/* ABOUT US / TEAM INTRO SECTION */}
      <TeamIntroSection />

      <ServicesSection />
      <FeaturedProjectSection />
      <FounderSection />
      <AchievementsSection />
      <StatisticsSection />
      <CreativeTeamSection />
      <TestimonialSection />
      <PricingSection />

      {/* 5. PORTAL SIDE MENU OVERLAY (SLIDES IN WHEN CLICKING "MENU" TOP-RIGHT) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 pointer-events-auto" id="portal-menu-super-wrapper">
            {/* Backdrop click away */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-zoom-out"
            />

            {/* Menu Slide pane */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#08080f] border-l border-white/15 p-6 md:p-8 flex flex-col justify-between"
              id="sliding-menu-pane"
            >
              {/* Spacer matching top height */}
              <div className="h-16 flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
                  AGENCY COMMAND
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">CORE_V4_ONLINE</span>
              </div>

              {/* Menu Directory links */}
              <div className="space-y-5" id="menu-directory-stack">
                <div className="space-y-1">
                  <span className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                    RESOURCES
                  </span>
                  {[
                    { id: "projects", title: "Browse 12 Projects", click: () => { setIsMenuOpen(false); setIsProjectsOpen(true); } },
                    { id: "services", title: "Review Capabilities", click: () => { setIsMenuOpen(false); setIsServicesOpen(true); } },
                    { id: "pricing", title: "Subscription Plans", click: () => { setIsMenuOpen(false); setIsPricingOpen(true); } },
                    { id: "book", title: "Schedule Briefing Loop", click: () => { setIsMenuOpen(false); setIsBookingOpen(true); } },
                  ].map((link) => (
                    <button
                      key={link.id}
                      onClick={link.click}
                      className="w-full text-left py-2.5 text-base font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer border-b border-white/5 flex items-center justify-between group"
                    >
                      <span>{link.title}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-cyan-400" />
                    </button>
                  ))}
                </div>

                {/* Micro agency pitch */}
                <div className="p-4 bg-white/2 border border-white/5 rounded-xl space-y-1.5" id="menu-interactive-stat-block">
                  <p className="text-[11px] text-cyan-400 font-mono uppercase tracking-wider">ACTIVE STUDIO HOURS</p>
                  <p className="text-[12px] text-white font-medium">Monday — Friday, 09:00 — 18:00 UTC</p>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Real-time @google/genai prototype deployments deliver standard outputs directly inside user iframe sandboxes.
                  </p>
                </div>
              </div>

              {/* Footer Contacts details */}
              <div className="pt-4 border-t border-white/5 space-y-2" id="menu-contact-channels">
                <span className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                  DIRECT CHANNELS
                </span>
                <p className="text-xs text-white/80">
                  Briefs: <strong className="text-white">sync@aiagency-design.studio</strong>
                </p>
                <div className="flex gap-2 text-[10px] text-zinc-500" id="copyright-notices">
                  <span>© 2026 AI Studio Build</span>
                  <span>•</span>
                  <span>All rights synchronized</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. MODALS OVERLAYS */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <ServicesModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onSelectServiceToBook={triggerCustomServiceAlignment}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={bookingPreselect}
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        onSelectProject={(selectedItem) => {
          // prefill service option based on category selected
          const mapping: { [key: string]: string } = {
            "BRANDING": "Neural Brand Strategy",
            "AI DESIGN": "AI Identity Design",
            "CHATBOT": "Cognitive Interfaces & Chatbots",
          };
          triggerCustomServiceAlignment(mapping[selectedItem.discipline] || "");
        }}
      />
    </div>
  );
}
