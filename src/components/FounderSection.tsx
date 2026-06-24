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

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.35 + i * 0.05,
    },
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
          className="grid grid-cols-12 gap-4 items-start min-h-auto md:min-h-[70vh]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT — Badge + Info */}
          <div className="col-span-12 md:col-span-3 pt-2 flex flex-col 
          gap-4 md:gap-6 flex-row md:flex-col items-center md:items-start 
          justify-between md:justify-start">
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
                  className="text-white text-4xl md:text-5xl 
                  font-black tracking-tighter"
                >
                  2023
                </motion.p>
              </div>
            </div>
          </div>

          {/* CENTER — Photo */}
          <div className="col-span-12 md:col-span-5 relative flex 
          justify-center order-first md:order-none" ref={photoRef}>
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
              className="relative w-full max-w-[240px] sm:max-w-[280px] 
              rounded-2xl overflow-hidden mx-auto md:mx-0"
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
          <div className="col-span-12 md:col-span-4 pt-4 md:pt-12 
          flex flex-col justify-start">
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-8 h-px bg-white/30 mb-4 origin-left"
            />

            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-white/50 text-sm leading-relaxed max-w-[200px]"
            >
              {"He work with passion and creative. Over 16+ years experience. Willing to make more exceptional.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className={i >= 8 ? "text-white/80" : "text-white/50"}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </motion.div>
      </div>

      
    </section>
  );
}
