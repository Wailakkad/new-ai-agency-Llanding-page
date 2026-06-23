import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.06,
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const quoteMarkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay,
    },
  }),
};

function AnimatedQuote({
  text,
  highlightWords,
  isInView,
}: {
  text: string;
  highlightWords: number;
  isInView: boolean;
}) {
  const words = text.split(" ");
  return (
    <p className="text-lg md:text-xl lg:text-2xl font-black
    uppercase tracking-wide leading-tight">
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={
            i < highlightWords
              ? "text-white"
              : "text-white/20"
          }
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const mapOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.12, 0.12, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="testimonial-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      {/* World map background */}
      <motion.div
        style={{ opacity: mapOpacity }}
        className="absolute inset-0 flex items-center
        justify-center pointer-events-none overflow-hidden"
      >
        <div className="w-full h-full max-w-4xl mx-auto opacity-30">
          <svg viewBox="0 0 100 50" className="w-full h-full"
            preserveAspectRatio="xMidYMid meet">
            {Array.from({ length: 800 }, (_, i) => {
              const x = (i % 40) * 2.5 + 1;
              const y = Math.floor(i / 40) * 2.5 + 1;
              return (
                <circle key={i} cx={x} cy={y} r={0.3}
                  fill="#3a4a6b" opacity={0.4} />
              );
            })}
          </svg>
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start">

          {/* LEFT — Person Card */}
          <motion.div
            style={{ y: cardY }}
            className="col-span-5"
          >
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.92 }}
              animate={isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : {}}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="relative rounded-2xl overflow-hidden
              border border-white/8 cursor-pointer"
              style={{ minHeight: "380px" }}
            >
              {/* Photo bg */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #0d1b2a 0%, #050505 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 35% 30%, " +
                    "rgba(0,100,220,0.35), transparent 65%)",
                }}
              />

              {/* Curved text top */}
              <div className="absolute top-4 left-0 right-0
              flex justify-center z-20">
                <svg viewBox="0 0 160 50" className="w-40 h-12 opacity-50">
                  <defs>
                    <path id="topArc"
                      d="M 10,40 Q 80,-10 150,40" />
                  </defs>
                  <text fontSize="8" letterSpacing="4"
                    fontWeight="700" fill="white">
                    <textPath href="#topArc">
                      BRANDING AGENCY
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Since text vertical */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2
              z-20" style={{ writingMode: "vertical-rl" }}>
                <svg viewBox="0 0 20 100" className="w-5 h-24 opacity-30">
                  <defs>
                    <path id="sinceArc2"
                      d="M 10,5 Q 18,50 10,95" />
                  </defs>
                  <text fontSize="5" letterSpacing="2"
                    fontWeight="600" fill="white">
                    <textPath href="#sinceArc2">SINCE 2022</textPath>
                  </text>
                </svg>
              </div>

              {/* Photo */}
              <img
                src="/testimonial-person.jpg"
                alt="Adam Levine"
                className="absolute inset-0 w-full h-full
                object-cover object-top opacity-70
                mix-blend-luminosity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0
              p-5 z-20"
                style={{
                  background:
                    "linear-gradient(to top, #080808 0%, " +
                    "transparent 100%)",
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-white text-2xl font-black
                  tracking-tight"
                >
                  Adam Levine
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 0.4, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="text-white/40 text-xs mt-1"
                >
                  CEO of Next
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Quote Block */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-7 pt-4"
          >
            {/* Testimonials badge */}
            <motion.div
              variants={fadeUpVariants}
              custom={0}
              className="flex items-center gap-2 mb-8"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5
                rounded-full border border-white/10 bg-white/5
                text-white text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full
                bg-cyan-400 animate-pulse" />
                Testimonials
              </div>
              <span className="w-6 h-6 rounded-full border
              border-white/10 bg-white/5 flex items-center
              justify-center text-white/40 text-[10px]">
                ✦
              </span>
            </motion.div>

            {/* Opening quote mark */}
            <motion.div
              variants={quoteMarkVariants}
              custom={0.15}
              className="text-[6rem] leading-none text-cyan-400
              font-black mb-2 select-none"
            >
              "
            </motion.div>

            {/* Quote text */}
            <div className="mb-8">
              <AnimatedQuote
                text="DREATIV IS A CREATIVE STUDIO BUILD BRANDING AND WEB DESIGN FOR VISIONARY BRANDS CLARITY. VISUALIZE THE BEST PRODUCTS"
                highlightWords={10}
                isInView={isInView}
              />
            </div>

            {/* Avatar row */}
            <motion.div
              variants={fadeUpVariants}
              custom={1.2}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["A", "B"].map((letter, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    className="w-10 h-10 rounded-full border-2
                    border-[#080808] flex items-center
                    justify-center text-white text-xs font-bold"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #0072ff, #00c6ff)"
                          : "linear-gradient(135deg, #7b2ff7, #00c6ff)",
                    }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <p className="text-white/30 text-xs">
                Verified clients
              </p>
            </motion.div>

            {/* Closing quote mark */}
            <motion.div
              variants={quoteMarkVariants}
              custom={0.4}
              className="text-[5rem] leading-none text-cyan-400
              font-black mt-4 text-right select-none"
            >
              "
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
