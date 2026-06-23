import { motion } from "motion/react";
import { Sparkle, Globe, Atom, Layers, Orbit, Cpu, Compass } from "lucide-react";

export default function TeamIntroSection() {
  const partnerLogos = [
    { id: 1, name: "archin", icon: <Compass className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" /> },
    { id: 2, name: "logoipsum", icon: <Globe className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />, hasLogoBadge: true },
    { id: 3, name: "Logoipsum", icon: <Atom className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />, hasLogoDot: true },
    { id: 4, name: "orion", icon: <Orbit className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" /> },
    { id: 5, name: "layers", icon: <Layers className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" /> },
    { id: 6, name: "neural", icon: <Cpu className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" /> },
  ];

  return (
    <section 
      className="relative w-full bg-[#0a0a0a] border-t border-white/5 py-24 md:py-32 overflow-hidden z-30" 
      id="about-team-intro-section"
    >
      {/* Background Graphic Lines */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" 
        id="about-grid-overlay" 
      />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-white/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-white/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* 1. SMALL BADGE/LABEL at top center */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
          id="about-section-badge-wrapper"
        >
          <div className="flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-white/10 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="text-[12px] font-semibold tracking-wider text-white">About</span>
            <span className="bg-white text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full font-mono">01</span>
          </div>
        </motion.div>

        {/* 2. HEADLINE (center-aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-16"
          id="about-section-headline-wrapper"
        >
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white select-none">
            As a tight-knit team of experts,<br />
            we create memorable and<br />
            emotional websites,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              digital experiences, and native apps.
            </span>
          </h2>
        </motion.div>

        {/* 3. IMAGE GRID */}
        {/* Desktop Asymmetric Layout (hidden on mobile, shown on laptop+) */}
        <div 
          className="hidden md:block relative w-full h-[580px] mt-4 mb-20 select-none" 
          id="about-images-asymmetric-desktop-grid"
        >
          {/* Image 1: Left tall member portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[2%] top-[5%] w-[270px] h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 group shadow-2xl cursor-pointer"
            id="about-card-left-member"
          >
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:bg-transparent transition-colors duration-500 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-15 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
            <img 
              src="/src/assets/images/team_portrait_left_1782212786175.jpg"
              alt="Person silhouette at desk"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Soft tech detail labels */}
            <div className="absolute bottom-5 left-5 z-20">
              <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">CO-FOUNDER / DEV</p>
              <h4 className="text-white text-base font-bold mt-0.5">Alex Rivers</h4>
            </div>
          </motion.div>

          {/* Image 2: Top Right smaller card with custom cyan-blue outline frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[2%] top-[12%] w-[290px] h-[290px] p-1.5 rounded-2xl border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.1)] hover:border-cyan-400/40 transition-colors duration-500 cursor-pointer"
            id="about-card-right-tech"
          >
            <div className="w-full h-full overflow-hidden rounded-xl bg-zinc-900 relative group">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-color group-hover:bg-transparent transition-colors duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent z-15 opacity-70" />
              <img 
                src="/src/assets/images/tech_abstract_right_1782212802211.jpg"
                alt="Abstract sports car dark tech"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">NEURAL BRAND CORES</p>
                <h4 className="text-white text-sm font-bold mt-0.5">Sleek Identity Systems</h4>
              </div>
            </div>
          </motion.div>

          {/* Image 3: Bottom Center-Right medium card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[36%] top-[34%] w-[300px] h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 group shadow-2xl cursor-pointer"
            id="about-card-center-product"
          >
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:bg-transparent transition-colors duration-500 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-15 opacity-70" />
            <img 
              src="/src/assets/images/product_blueprint_mid_1782212818747.jpg"
              alt="Futuristic glowing product object"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-5 left-5 z-20">
              <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">PRODUCT DESIGN</p>
              <h4 className="text-white text-base font-bold mt-0.5">Interactive Sculptures</h4>
            </div>
          </motion.div>
        </div>

        {/* Mobile & Tablet Image List (rendered only on sm/md screen ports) */}
        <div className="md:hidden flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch gap-6 w-full mt-4 mb-16 px-2 select-none" id="about-images-responsive-stack">
          {/* Card 1 */}
          <div className="flex-1 min-w-[260px] h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 relative group">
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color z-10" />
            <img 
              src="/src/assets/images/team_portrait_left_1782212786175.jpg"
              alt="Person silhouette at desk"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[9px] font-mono text-cyan-400 uppercase">CO-FOUNDER / DEV</p>
              <h4 className="text-white text-sm font-bold">Alex Rivers</h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 min-w-[260px] h-[320px] rounded-2xl overflow-hidden p-1 border border-cyan-500/20 bg-[#0c0c0c] relative group">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-color z-10" />
              <img 
                src="/src/assets/images/tech_abstract_right_1782212802211.jpg"
                alt="Abstract sports car dark tech"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">NEURAL CORES</p>
                <h4 className="text-white text-sm font-bold">Sleek Identity Systems</h4>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 min-w-[260px] h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 relative group">
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color z-10" />
            <img 
              src="/src/assets/images/product_blueprint_mid_1782212818747.jpg"
              alt="Futuristic glowing product object"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[9px] font-mono text-cyan-400 uppercase">PRODUCT DESIGN</p>
              <h4 className="text-white text-sm font-bold">Interactive Sculptures</h4>
            </div>
          </div>
        </div>

        {/* 4. LOGO TICKER / PARTNER LOGOS */}
        <div className="w-full mt-6" id="about-logo-marquee-row">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase">
              CREDITED COLLABORATIONS & SYSTEMS
            </span>
          </div>

          {/* Static Pill-based Logo Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 px-4" id="logo-badges-list">
            {partnerLogos.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#121212] border border-white/5 hover:bg-white/10 transition-all duration-300 shadow-md cursor-help"
                id={`partner-logo-${p.id}`}
              >
                {/* Logo graphics */}
                {p.icon}

                {/* Highly readable text labeling matching font system */}
                <span className="text-sm font-semibold text-zinc-300 font-sans tracking-tight group-hover:text-white transition-colors">
                  {p.name}
                </span>

                {/* Stylized custom indicator flags reminiscent of tech logos */}
                {p.hasLogoBadge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
                {p.hasLogoDot && (
                  <span className="text-[8px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1 rounded-sm">AI</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
