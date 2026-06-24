import { motion } from "motion/react";

export default function FeaturedProjectSection() {
  return (
    <section
      id="featured-project"
      className="relative w-full bg-[#080808] overflow-hidden py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between w-full mb-12 
        text-xs text-gray-400">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full 
            border border-white/10 bg-white/5 text-white text-xs font-medium"
          >
            Projects
            <span className="bg-cyan-400 text-black font-bold 
            px-1.5 py-0.5 rounded-full text-[10px]">
              01
            </span>
          </motion.div>
          <span>Project Type: UI Design</span>
          <span>Date: July 2025</span>
        </div>

        <div className="relative flex items-stretch min-h-[500px] md:min-h-[580px]">

          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="absolute right-0 top-0 w-[65%] h-full rounded-2xl 
            flex flex-col justify-between p-8 z-0 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
            }}
          >
            <div />
            <div className="flex flex-col items-end">
              <h3 className="text-white text-4xl md:text-5xl font-bold 
              tracking-tight mb-auto mt-8">
                Levi Colwill
              </h3>
            </div>
            <div className="mt-auto pt-6 border-t border-white/30">
              <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">
                [About This Project]
              </p>
              <p className="text-white text-sm leading-relaxed max-w-xs">
                Levi Colwill Website Portfolio is a project build branding 
                and web design for visionary brands clarity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 30px 80px rgba(0,198,255,0.15)",
            }}
            className="relative w-[55%] h-full min-h-[420px] rounded-2xl 
            bg-[#111111] border border-white/5 flex flex-col 
            justify-between p-6 z-10 cursor-pointer"
            style={{ marginRight: "-80px" }}
          >
            <motion.button
              whileHover={{ rotate: 45, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white flex items-center 
              justify-center text-black font-bold text-lg shadow-lg"
            >
              ↗
            </motion.button>

            <div className="flex items-center justify-center flex-1 py-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00c6ff" />
                      <stop offset="100%" stopColor="#0072ff" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="60,10 110,100 10,100"
                    fill="url(#triGrad)"
                    opacity="0.9"
                  />
                  <polygon
                    points="60,35 88,85 32,85"
                    fill="#111111"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 cursor-default"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-baseline gap-3">
            <span className="text-white text-4xl md:text-5xl font-black 
            tracking-tight">
              Levi Colwill
            </span>
            <span className="text-cyan-400 text-2xl font-bold">[01]</span>
          </div>

          <div className="mt-1">
            <span className="text-white text-4xl md:text-5xl font-black 
            tracking-tight">
              Modeling 3d graphic
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
