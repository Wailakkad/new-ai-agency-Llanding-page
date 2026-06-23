import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";

// ── Animation Variants ──────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const maskRevealVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay },
  }),
};

const charVariants: Variants = {
  hidden: { y: "110%", opacity: 0, rotateX: 90 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.04,
    },
  }),
};

const glowPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 40px rgba(0,198,255,0.3)",
      "0 0 80px rgba(0,198,255,0.6)",
      "0 0 40px rgba(0,198,255,0.3)",
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ── Split Text Helper ────────────────────────────────────────
function SplitText({
  text,
  className,
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + baseDelay / 0.04}
          variants={charVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: false, margin: "-15% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="founder-section"
      className="relative w-full bg-[#080808] overflow-hidden"
    >
      {/* ── TOP PART: Founder Info + Photo ── */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-0">
        <motion.div
          className="grid grid-cols-12 gap-4 items-start min-h-[70vh]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT — Badge + Info */}
          <div className="col-span-3 pt-2 flex flex-col gap-6">
            {/* Founder Badge */}
            <motion.div
              variants={fadeUpVariants}
              custom={0}
              className="flex items-center gap-2 w-fit"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                border border-white/10 bg-white/5 backdrop-blur-md 
                text-white text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 
                animate-pulse" />
                Founder
              </div>
              <span className="text-white/30 text-xs">✦</span>
            </motion.div>

            {/* Founded Text */}
            <div className="flex flex-col gap-1">
              <motion.p
                variants={fadeUpVariants}
                custom={0.15}
                className="text-white/40 text-xs tracking-widest uppercase"
              >
                Founded Agency
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.p
                  variants={charVariants}
                  custom={4}
                  className="text-white text-5xl font-black tracking-tighter"
                >
                  2023
                </motion.p>
              </div>
            </div>
          </div>

          {/* CENTER — Photo */}
          <div className="col-span-5 relative flex justify-center" ref={photoRef}>
            {/* Curved "AGENCY" text top */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.2}
              className="absolute -top-6 right-0 z-20"
            >
              <svg viewBox="0 0 120 60" className="w-32 h-16 opacity-60">
                <defs>
                  <path id="agencyCurve" d="M 10,50 Q 60,-10 110,50" />
                </defs>
                <text className="fill-white text-[8px]" fontSize="9" 
                  letterSpacing="4" fontWeight="700" fill="white">
                  <textPath href="#agencyCurve">AGENCY</textPath>
                </text>
              </svg>
            </motion.div>

            {/* Photo Card */}
            <motion.div
              style={{ scale: photoScale }}
              className="relative w-full max-w-[280px] rounded-2xl overflow-hidden"
            >
              <motion.div
                variants={maskRevealVariants}
                custom={0.1}
                className="relative"
              >
                <div>
                {/* Founder image */}
                  <img
                    src="https://res.cloudinary.com/dhkyla1rv/image/upload/v1782222146/founder.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover object-top 
                    opacity-90 mix-blend-luminosity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Fallback silhouette */}
                  <div className="absolute inset-0 flex items-end 
                  justify-center pb-8 z-20">
                    <div
                      className="w-28 h-40 rounded-full opacity-30"
                      style={{
                        background:
                          "radial-gradient(ellipse, #00c6ff44, transparent)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* "SINCE 2022" curved text right side */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.4}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
              style={{ writingMode: "vertical-rl" }}
            >
              <svg viewBox="0 0 40 160" className="w-10 h-40 opacity-40">
                <defs>
                  <path id="sinceCurve" d="M 20,10 Q 35,80 20,150" />
                </defs>
                <text fontSize="8" letterSpacing="3" fontWeight="600" 
                  fill="white">
                  <textPath href="#sinceCurve">SINCE 2022</textPath>
                </text>
              </svg>
            </motion.div>

            {/* Vertical decorative line */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={photoInView ? { scaleY: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="absolute left-1/2 bottom-0 w-px h-20 bg-white 
              origin-top"
            />
          </div>

          {/* RIGHT — Bio Text */}
          <div className="col-span-4 pt-12 flex flex-col justify-start">
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-8 h-px bg-white/30 mb-4 origin-left"
            />

            <motion.p
              variants={fadeUpVariants}
              custom={0.35}
              className="text-white/50 text-sm leading-relaxed max-w-[200px]"
            >
              He work with passion and creative. Over 16+ years experience.{" "}
              <span className="text-white/80">
                Willing to make more exceptional.
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM PART: Glow Visual + Play Button ── */}
      <div className="relative flex flex-col items-center justify-center 
      py-20 mt-8 overflow-hidden">

        {/* Ambient background glow */}
        <motion.div
          style={{ y: glowY }}
          className="absolute inset-0 flex items-center justify-center 
          pointer-events-none"
        >
          <div
            className="w-[500px] h-[300px] rounded-full blur-[120px] opacity-20"
            style={{
              background:
                "radial-gradient(ellipse, #00c6ff 0%, #0072ff 50%, transparent 80%)",
            }}
          />
        </motion.div>

        {/* Glowing 3D Logo */}
        <motion.div
          style={{ y: glowY }}
          variants={glowPulse}
          animate="animate"
          className="relative z-10 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5,
            }}
            className="relative w-48 h-48 md:w-64 md:h-64 flex items-center 
            justify-center"
          >
            {/* Glow layers */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, #00c6ff 0%, #0072ff 40%, transparent 70%)",
              }}
            />
            {/* Geometric cross/logo shape */}
            <svg
              viewBox="0 0 120 120"
              className="relative z-10 w-full h-full drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="glowGrad" x1="0%" y1="0%" 
                  x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7df9ff" />
                  <stop offset="50%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0040ff" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Four quadrant shapes like PlayStation cross */}
              <rect x="10" y="10" width="45" height="45" rx="8"
                fill="url(#glowGrad)" opacity="0.9" filter="url(#glow)" />
              <rect x="65" y="10" width="45" height="45" rx="8"
                fill="url(#glowGrad)" opacity="0.7" filter="url(#glow)" />
              <rect x="10" y="65" width="45" height="45" rx="8"
                fill="url(#glowGrad)" opacity="0.7" filter="url(#glow)" />
              <rect x="65" y="65" width="45" height="45" rx="8"
                fill="url(#glowGrad)" opacity="0.5" filter="url(#glow)" />
              {/* Center cross bars */}
              <rect x="52" y="10" width="16" height="100" rx="4"
                fill="url(#glowGrad)" opacity="0.4" />
              <rect x="10" y="52" width="100" height="16" rx="4"
                fill="url(#glowGrad)" opacity="0.4" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Play Button */}
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          whileHover={{
            scale: 1.08,
            backgroundColor: "#00c6ff",
            color: "#000",
            transition: { duration: 0.25 },
          }}
          whileTap={{ scale: 0.95 }}
          className="relative z-20 flex items-center gap-2 px-6 py-3 
          rounded-full bg-white text-black text-sm font-semibold 
          shadow-2xl cursor-pointer border-0 outline-none"
        >
          <span className="w-0 h-0 border-t-4 border-b-4 border-l-8 
          border-transparent border-l-current" />
          Play
        </motion.button>
      </div>
    </section>
  );
}
