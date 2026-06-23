import { useRef } from "react";
import { motion } from "motion/react";

export default function ServicesSection() {
  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="services-section"
      className="relative w-full bg-[#080808] overflow-hidden py-32 px-6"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-16 text-xs text-gray-400">
        <span>[Over 30+ Skillset]</span>

        <motion.div
          ref={badgeRef}
          whileHover={{ scale: 1.08 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full border 
          border-white/10 bg-white/5 backdrop-blur-md text-white text-sm 
          font-medium cursor-pointer select-none"
        >
          Services
          <span className="bg-cyan-400 text-black text-xs font-bold 
          px-2 py-0.5 rounded-full">
            01
          </span>
        </motion.div>

        <span>[Crafted with passion]</span>
      </div>

      <div className="relative flex flex-col items-center justify-center 
      text-center w-full max-w-7xl mx-auto select-none">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12, y: -40 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-[8vw] md:text-[7rem] font-black text-white 
          opacity-0 tracking-widest leading-none mb-[-2rem] z-0 
          pointer-events-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
        >
          MOTION
        </motion.div>

        <div className="flex items-center gap-4 z-10 relative">
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.8, ease: "backOut", delay: 0.6 }}
            className="text-cyan-400 text-2xl md:text-3xl font-bold inline-block"
          >
            [02]
          </motion.span>

          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[10vw] md:text-[8rem] font-black text-white 
            leading-none tracking-tight"
          >
            Branding
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12, y: 40 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-[8vw] md:text-[7rem] font-black text-white 
          opacity-0 tracking-widest leading-none mt-[-2rem] z-0 
          pointer-events-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
        >
          GRAPHIC
        </motion.div>
      </div>
    </section>
  );
}
