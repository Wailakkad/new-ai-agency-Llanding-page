import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
  Variants,
} from "framer-motion";

// ── Animation Variants ────────────────────────────────────────

const charRevealVariants: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.045,
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const lineExpandVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay,
    },
  }),
};

// ── Animated Counter Component ────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2.5,
  delay = 0,
  className = "",
  shouldStart = false,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  shouldStart?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return;
    hasStarted.current = true;

    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [shouldStart, target, duration, delay]);

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}

// ── Split Text Helper ─────────────────────────────────────────
function SplitChars({
  text,
  className = "",
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={charRevealVariants}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            perspective: "600px",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Dotted World Map SVG ──────────────────────────────────────
function DottedWorldMap() {
  // Simplified dot grid representing world map continents
  const dots: { cx: number; cy: number; r?: number }[] = [];

  // Generate dot grid — continental shapes approximated
  const continentMask = (x: number, y: number): boolean => {
    const nx = x / 100;
    const ny = y / 50;

    // North America
    if (nx > 0.05 && nx < 0.28 && ny > 0.1 && ny < 0.6) return true;
    // South America
    if (nx > 0.15 && nx < 0.3 && ny > 0.55 && ny < 0.95) return true;
    // Europe
    if (nx > 0.42 && nx < 0.58 && ny > 0.08 && ny < 0.45) return true;
    // Africa
    if (nx > 0.44 && nx < 0.6 && ny > 0.4 && ny < 0.88) return true;
    // Asia
    if (nx > 0.55 && nx < 0.95 && ny > 0.05 && ny < 0.65) return true;
    // Australia
    if (nx > 0.75 && nx < 0.92 && ny > 0.65 && ny < 0.88) return true;
    // Greenland
    if (nx > 0.28 && nx < 0.42 && ny > 0.04 && ny < 0.25) return true;

    return false;
  };

  for (let x = 2; x <= 98; x += 2.2) {
    for (let y = 2; y <= 48; y += 2.2) {
      if (continentMask(x, y)) {
        dots.push({ cx: x, cy: y, r: 0.4 });
      }
    }
  }

  return (
    <svg
      viewBox="0 0 100 50"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r ?? 0.4}
          fill="#3a4a6b"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });
  const statsInView = useInView(statsRef, { once: false, margin: "-15% 0px" });
  const headlineInView = useInView(headlineRef, {
    once: false,
    margin: "-15% 0px",
  });
  const pillsInView = useInView(pillsRef, { once: false, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const mapOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.18, 0.18, 0]
  );

  const headlineY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="statistics-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── TOP BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between mb-20 gap-4"
        >
          {/* Statistics Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-white/10 bg-white/5 backdrop-blur-md
              text-white text-xs font-medium cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400
              animate-pulse" />
              Statistics
            </motion.div>
            <div className="w-6 h-6 rounded-full border border-white/10
            bg-white/5 flex items-center justify-center
            text-white/40 text-[10px]">
              ✦
            </div>
          </div>

          {/* Center text */}
          <p className="text-white/30 text-xs text-center leading-relaxed
          max-w-[180px]">
            We have significant growth
            <br />
            through the years
          </p>

          {/* Right label */}
          <p className="text-white/30 text-xs text-right flex-shrink-0">
            Updated: July 2025
          </p>
        </motion.div>

        {/* ── STATS BLOCK ── */}
        <div
          ref={statsRef}
          className="relative grid grid-cols-2 gap-0 mb-0"
        >
          {/* TOP RIGHT — 98% */}
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="col-start-2 flex flex-col items-start pl-8 pb-16"
          >
            {/* Number */}
            <div
              className="text-[8rem] md:text-[10rem] lg:text-[12rem]
              font-black text-white leading-none tracking-tighter
              overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <motion.div
                variants={charRevealVariants}
                custom={0}
                style={{ display: "inline-block" }}
              >
                <AnimatedCounter
                  target={98}
                  suffix="%"
                  duration={2.2}
                  delay={0.3}
                  shouldStart={statsInView}
                  className=""
                />
              </motion.div>
            </div>

            {/* Blue accent line */}
            <motion.div
              variants={lineExpandVariants}
              custom={0.4}
              className="w-24 h-0.5 bg-cyan-400 mb-4 origin-left"
            />

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.6}
              className="text-white/40 text-xs leading-relaxed max-w-[200px]"
            >
              Project Completed in timeline. With a various number of
              project type
            </motion.p>
          </motion.div>

          {/* BOTTOM LEFT — 28M */}
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="col-start-1 row-start-2 flex flex-col items-start
            pt-4 pb-8"
          >
            {/* Number */}
            <div
              className="text-[8rem] md:text-[10rem] lg:text-[12rem]
              font-black text-white leading-none tracking-tighter
              overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <motion.span
                variants={charRevealVariants}
                custom={2}
                style={{ display: "inline-block" }}
              >
                <AnimatedCounter
                  target={28}
                  suffix="M"
                  duration={2}
                  delay={0.5}
                  shouldStart={statsInView}
                />
              </motion.span>
            </div>

            {/* Blue accent line */}
            <motion.div
              variants={lineExpandVariants}
              custom={0.7}
              className="w-24 h-0.5 bg-cyan-400 mb-4 origin-left"
            />

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.9}
              className="text-white/40 text-xs leading-relaxed max-w-[200px]"
            >
              Fund Raised til now. We have become one of the most
              successful agency
            </motion.p>
          </motion.div>

          {/* Empty col-2 row-2 spacer */}
          <div className="col-start-2 row-start-2 h-16" />
        </div>

        {/* ── WORLD MAP + CENTER HEADLINE ── */}
        <div className="relative w-full flex items-center
        justify-center overflow-hidden" style={{ minHeight: "420px" }}>

          {/* Dotted World Map — Background */}
          <motion.div
            style={{ y: mapY, opacity: mapOpacity }}
            className="absolute inset-0 flex items-center
            justify-center pointer-events-none"
          >
            <div className="w-full h-full max-w-4xl mx-auto px-4">
              <DottedWorldMap />
            </div>
          </motion.div>

          {/* Radial vignette over map */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, " +
                "transparent 30%, #080808 100%)",
            }}
          />

          {/* Center Headline */}
          <motion.div
            ref={headlineRef}
            style={{ y: headlineY }}
            initial="hidden"
            animate={headlineInView ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center
            text-center"
          >
            {/* "For 10+" */}
            <div
              className="text-[4rem] md:text-[6rem] lg:text-[7rem]
              font-black text-white leading-tight tracking-tight"
              style={{ perspective: "800px" }}
            >
              <SplitChars text="For 10+" baseDelay={0} />
            </div>

            {/* "Experience" */}
            <div
              className="text-[4rem] md:text-[6rem] lg:text-[7rem]
              font-black text-white leading-tight tracking-tight"
              style={{ perspective: "800px" }}
            >
              <SplitChars text="Experience" baseDelay={7} />
            </div>

            {/* "YOU'LL GET" */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.8}
              className="text-white/30 text-xs tracking-[0.4em]
              uppercase mt-4 font-medium"
            >
              YOU&apos;LL GET
            </motion.p>
          </motion.div>
        </div>

        {/* ── PILL TAGS ── */}
        <motion.div
          ref={pillsRef}
          initial="hidden"
          animate={pillsInView ? "visible" : "hidden"}
          className="relative flex items-center justify-center
          gap-6 mt-16 flex-wrap"
        >
          {/* CREATIVE Pill */}
          <motion.div
            variants={pillVariants}
            custom={0}
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(255,255,255,0.4)",
              rotate: -4,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ rotate: -8 }}
            className="px-10 py-4 rounded-full border border-white/20
            bg-transparent cursor-default"
          >
            <span
              className="text-white text-lg md:text-xl font-bold
              tracking-[0.25em] uppercase"
              style={{ fontStyle: "italic" }}
            >
              CREATIVE
            </span>
          </motion.div>

          {/* DYNAMIC Pill */}
          <motion.div
            variants={pillVariants}
            custom={0.15}
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(255,255,255,0.4)",
              rotate: 4,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ rotate: 6, marginTop: "-24px" }}
            className="px-10 py-4 rounded-full border border-white/20
            bg-transparent cursor-default"
          >
            <span
              className="text-white text-lg md:text-xl font-bold
              tracking-[0.25em] uppercase"
              style={{ fontStyle: "italic" }}
            >
              DYNAMIC
            </span>
          </motion.div>

          {/* QUALITY Pill — cyan accent */}
          <motion.div
            variants={pillVariants}
            custom={0.3}
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(0,198,255,0.6)",
              rotate: -3,
              boxShadow: "0 0 30px rgba(0,198,255,0.15)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ rotate: -5, marginTop: "16px" }}
            className="px-10 py-4 rounded-full border border-cyan-400/40
            bg-transparent cursor-default relative overflow-hidden"
          >
            {/* Subtle cyan glow inner */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(0,198,255,0.08), transparent)",
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span
              className="relative z-10 text-cyan-400 text-lg md:text-xl
              font-bold tracking-[0.25em] uppercase"
              style={{ fontStyle: "italic" }}
            >
              QUALITY
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={pillsInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-[400px] h-[100px] blur-[80px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,114,255,0.12), transparent)",
          }}
        />

      </div>
    </section>
  );
}
