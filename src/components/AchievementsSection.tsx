import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";

// ── Variants ─────────────────────────────────────────────────
const headlineCharVariants: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -80 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.035,
    },
  }),
};

const ghostLineVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 0.13,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
  },
};

const cardSlideVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
  },
};

const floatingCardVariants: Variants = {
  hidden: { opacity: 0, rotate: -12, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    rotate: -6,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 },
  },
};

// ── Split Word Component ──────────────────────────────────────
function AnimatedWord({
  word,
  baseDelay = 0,
  className = "",
}: {
  word: string;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={headlineCharVariants}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            perspective: "800px",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, margin: "-15% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ghostParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
    <section
      ref={sectionRef}
      id="achievements-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Top Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-12"
        >
          {/* Awards Badge */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full 
              border border-white/10 bg-white/5 backdrop-blur-md 
              text-white text-xs font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Awards
            </div>
            <div
              className="w-7 h-7 rounded-full border border-white/10 
              bg-white/5 flex items-center justify-center 
              text-white text-xs font-bold"
            >
              ✦
            </div>
          </div>

          {/* Right label */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 0.5, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-xs italic text-right max-w-[180px]"
          >
            / We focus on quality products that drive result
          </motion.p>
        </motion.div>

        {/* ── Massive Headline Block ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mb-16"
        >
          {/* Line 1: "We've Achieved" */}
          <div
            className="text-[11vw] md:text-[8rem] lg:text-[9rem] font-black 
            text-white leading-[0.9] tracking-tighter mb-2"
            style={{ perspective: "1000px" }}
          >
            <AnimatedWord word="We've " baseDelay={0} />
            <AnimatedWord word="Achieved" baseDelay={6} />
          </div>

          {/* Line 2: "Through" + Floating Card + "'24" */}
          <div
            className="flex items-center gap-4 md:gap-6 
            text-[11vw] md:text-[8rem] lg:text-[9rem] font-black 
            text-white leading-[0.9] tracking-tighter mb-2 flex-wrap"
            style={{ perspective: "1000px" }}
          >
            <AnimatedWord word="Through" baseDelay={14} />

            {/* Floating Inline Project Card */}
            <motion.div
              variants={floatingCardVariants}
              className="relative inline-flex flex-col rounded-xl 
              overflow-hidden border border-white/10 
              bg-[#111111] shadow-2xl cursor-pointer flex-shrink-0"
              style={{ width: "140px", height: "80px" }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Card image area */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dhkyla1rv/image/upload/v1782232466/58118ac26e00488a36b8ab8dce44dcdb.jpg"
                  alt="designolis"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Card label */}
              <div className="px-2 py-1 bg-[#0a0a0a] border-t border-white/5">
                <p className="text-white/60 text-[9px] font-medium 
                tracking-widest">
                  designolis
                </p>
              </div>
            </motion.div>

            <AnimatedWord word="'24" baseDelay={20} />
          </div>

          {/* Line 3: "Is The Massive" — Ghost/muted */}
          <motion.div
            variants={ghostLineVariants}
            style={{ y: ghostParallax }}
            className="text-[11vw] md:text-[8rem] lg:text-[9rem] font-black 
            text-white leading-[0.9] tracking-tighter select-none 
            pointer-events-none"
          >
            Is The Massive
          </motion.div>
        </motion.div>

        {/* ── Award Showcase Card ── */}
        <motion.div
          ref={cardRef}
          variants={cardSlideVariants}
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          className="relative w-full max-w-2xl"
          whileHover={{
            y: -6,
            transition: { duration: 0.35, ease: "easeOut" },
          }}
        >
          <div
            className="flex rounded-2xl overflow-hidden border border-white/8 
            shadow-2xl cursor-pointer"
            style={{ minHeight: "140px" }}
          >
            {/* LEFT — Blue gradient award badge area */}
            <motion.div
              className="relative flex items-center justify-center 
              flex-shrink-0 w-36 md:w-44"
              style={{
                background:
                  "linear-gradient(135deg, #00c6ff 0%, #0072ff 60%, #0040cc 100%)",
              }}
              whileHover={{
                background:
                  "linear-gradient(135deg, #00d4ff 0%, #0085ff 60%, #0050dd 100%)",
              }}
            >
              {/* Award Badge SVG */}
              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 80 80"
                  className="w-20 h-20 drop-shadow-xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Laurel wreath circle */}
                  <circle cx="40" cy="40" r="32" fill="none"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                    strokeDasharray="4 3" />
                  {/* Inner circle */}
                  <circle cx="40" cy="40" r="22" fill="rgba(0,0,0,0.25)"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  {/* Trophy icon center */}
                  <text x="40" y="46" textAnchor="middle" fontSize="20"
                    fill="white" opacity="0.9">
                    🏆
                  </text>
                  {/* "ULTIMATE WINNER" arc text */}
                  <defs>
                    <path id="arcTop"
                      d="M 12,40 A 28,28 0 0,1 68,40" />
                    <path id="arcBottom"
                      d="M 68,40 A 28,28 0 0,1 12,40" />
                  </defs>
                  <text fontSize="5.5" letterSpacing="2"
                    fontWeight="700" fill="white" opacity="0.8">
                    <textPath href="#arcTop">ULTIMATE</textPath>
                  </text>
                  <text fontSize="5.5" letterSpacing="2"
                    fontWeight="700" fill="white" opacity="0.8">
                    <textPath href="#arcBottom" startOffset="15%">
                      WINNER
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </motion.div>

            {/* RIGHT — Award details */}
            <div
              className="flex-1 flex flex-col justify-between p-5 
              bg-[#0f0f0f] border-l border-white/5"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5,
                  }}
                  className="text-white text-sm md:text-base font-black 
                  uppercase tracking-wide leading-tight"
                >
                  SOTD FOR E-COMMERCE
                  <br />
                  WEBSITE
                </motion.h3>

                {/* Number tag */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={cardInView ? { opacity: 0.4, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                    delay: 0.7,
                  }}
                  className="text-white/40 text-xs font-mono flex-shrink-0"
                >
                  [001]
                </motion.span>
              </div>

              {/* Body text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65 }}
              >
                <p className="text-white/40 text-xs leading-relaxed mb-3">
                  Every decision ties to KPIs
                  <br />
                  (conversion, leads, ARPU, SEO)
                </p>

                {/* Progress bars */}
                <div className="flex flex-col gap-1.5">
                  {[
                    { w: "75%", color: "#00c6ff" },
                    { w: "55%", color: "#0072ff" },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="w-full h-0.5 rounded-full bg-white/10"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={cardInView ? { width: bar.w } : {}}
                        transition={{
                          duration: 1.2,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.8 + i * 0.15,
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Card bottom glow */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 
            w-3/4 h-8 blur-xl opacity-20 pointer-events-none rounded-full"
            style={{ background: "#0072ff" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
