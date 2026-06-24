import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";

interface Client {
  id: number;
  name: string;
  role: string;
  photo: string;
  quote: string;
  highlightWords: number;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Startup Founder",
    photo:
      "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221228/Startup_Founder_Female.jpg",
    quote:
      "DREATIV IS A CREATIVE STUDIO BUILD BRANDING AND WEB DESIGN FOR VISIONARY BRANDS CLARITY. VISUALIZE THE BEST PRODUCTS",
    highlightWords: 10,
  },
  {
    id: 2,
    name: "Jasmine Okafor",
    role: "Tech Entrepreneur",
    photo:
      "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221228/Tech_Entrepreneur.jpg",
    quote:
      "WORKING WITH DREATIV TRANSFORMED OUR DIGITAL PRESENCE COMPLETELY. THEIR TEAM DELIVERS EXCEPTIONAL RESULTS THAT EXCEED EVERY EXPECTATION WE HAD.",
    highlightWords: 8,
  },
  {
    id: 3,
    name: "Marcus Wellington",
    role: "Tech CEO",
    photo:
      "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221228/Tech_CEO.jpg",
    quote:
      "THE QUALITY OF THEIR DESIGN WORK IS UNMATCHED. DREATIV BROUGHT OUR BRAND TO LIFE WITH PRECISION AND CREATIVITY THAT DRIVES REAL BUSINESS RESULTS.",
    highlightWords: 9,
  },
  {
    id: 4,
    name: "Adam Levine",
    role: "Agency Director",
    photo:
      "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221232/Agency_Director.jpg",
    quote:
      "DREATIV DELIVERED A WORLD CLASS WEB EXPERIENCE FOR OUR AGENCY. THEIR ATTENTION TO DETAIL AND STRATEGIC DESIGN THINKING IS TRULY OUTSTANDING.",
    highlightWords: 7,
  },
];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.05,
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const photoSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function AnimatedQuote({
  text,
  highlightWords,
  isInView,
  slideKey,
}: {
  text: string;
  highlightWords: number;
  isInView: boolean;
  slideKey: number;
}) {
  const words = text.split(" ");
  return (
    <p
      key={slideKey}
      className="text-sm sm:text-base md:text-lg lg:text-xl 
      font-black uppercase tracking-wide leading-snug"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${slideKey}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={i < highlightWords ? "text-white" : "text-white/20"}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function SlideDots({
  total,
  active,
  onChange,
  isMobile,
}: {
  total: number;
  active: number;
  onChange: (i: number) => void;
  isMobile: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          animate={{
            width: i === active
              ? isMobile ? 14 : 24
              : isMobile ? 5 : 8,
            backgroundColor:
              i === active
                ? "#00c6ff"
                : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="h-1 md:h-2 rounded-full cursor-pointer
          border-0 outline-none flex-shrink-0"
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const activeClient = clients[activeIndex];

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goNext = () => {
    const next = (activeIndex + 1) % clients.length;
    setDirection(1);
    setActiveIndex(next);
  };

  const goPrev = () => {
    const prev = (activeIndex - 1 + clients.length) % clients.length;
    setDirection(-1);
    setActiveIndex(prev);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonial-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      <motion.div
        style={{ opacity: mapOpacity }}
        className="absolute inset-0 flex items-center
        justify-center pointer-events-none overflow-hidden"
      >
        <div className="w-full h-full max-w-4xl mx-auto opacity-30">
          <svg
            viewBox="0 0 100 50"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {Array.from({ length: 800 }, (_, i) => {
              const x = (i % 40) * 2.5 + 1;
              const y = Math.floor(i / 40) * 2.5 + 1;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={0.3}
                  fill="#3a4a6b"
                  opacity={0.4}
                />
              );
            })}
          </svg>
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">

          <motion.div
            style={{ y: cardY }}
            className="col-span-12 md:col-span-5"
          >
            <div
              className="relative rounded-2xl overflow-hidden
              border border-white/8"
              style={{ minHeight: "clamp(300px, 60vw, 420px)" }}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeClient.id}
                  custom={direction}
                  variants={photoSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                  style={{ minHeight: "clamp(300px, 60vw, 420px)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #0d1b2a 0%, #050505 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background:
                        "radial-gradient(ellipse at 35% 30%, " +
                        "rgba(0,100,220,0.35), transparent 65%)",
                    }}
                  />

                  <div
                    className="absolute top-4 left-0 right-0
                    flex justify-center z-20"
                  >
                    <svg
                      viewBox="0 0 160 50"
                      className="w-40 h-12 opacity-50"
                    >
                      <defs>
                        <path
                          id="topArc"
                          d="M 10,40 Q 80,-10 150,40"
                        />
                      </defs>
                      <text
                        fontSize="8"
                        letterSpacing="4"
                        fontWeight="700"
                        fill="white"
                      >
                        <textPath href="#topArc">
                          BRANDING AGENCY
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2
                    z-20"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    <svg
                      viewBox="0 0 20 100"
                      className="w-5 h-24 opacity-30"
                    >
                      <defs>
                        <path
                          id="sinceArc2"
                          d="M 10,5 Q 18,50 10,95"
                        />
                      </defs>
                      <text
                        fontSize="5"
                        letterSpacing="2"
                        fontWeight="600"
                        fill="white"
                      >
                        <textPath href="#sinceArc2">
                          SINCE 2022
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  <img
                    src={activeClient.photo}
                    alt={activeClient.name}
                    crossOrigin="anonymous"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full
                    object-cover object-top opacity-80
                    mix-blend-luminosity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display =
                        "none";
                    }}
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0
                    h-40 z-20"
                    style={{
                      background:
                        "linear-gradient(to top, #080808 0%, " +
                        "transparent 100%)",
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0
                  p-6 z-30">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeClient.id + "-name"}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <h3
                          className="text-white text-2xl font-black
                          tracking-tight"
                        >
                          {activeClient.name}
                        </h3>
                        <p className="text-white/40 text-xs mt-1">
                          {activeClient.role}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2
                z-40 w-8 h-8 rounded-full bg-black/40 border
                border-white/10 flex items-center justify-center
                text-white/60 hover:text-white hover:bg-black/70
                transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                className="absolute right-8 top-1/2 -translate-y-1/2
                z-40 w-8 h-8 rounded-full bg-black/40 border
                border-white/10 flex items-center justify-center
                text-white/60 hover:text-white hover:bg-black/70
                transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                ›
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 md:mt-4 px-1">
              <SlideDots
                total={clients.length}
                active={activeIndex}
                onChange={goToSlide}
                isMobile={isMobile}
              />
              <span className="text-white/20 text-[10px] md:text-xs font-mono">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(clients.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-7 pt-4"
          >
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
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400
                  animate-pulse"
                />
                Testimonials
              </div>
              <span
                className="w-6 h-6 rounded-full border border-white/10
                bg-white/5 flex items-center justify-center
                text-white/40 text-[10px]"
              >
                ✦
              </span>
            </motion.div>

            <motion.div
              variants={quoteMarkVariants}
              custom={0.15}
              className="text-[3.5rem] sm:text-[5rem] leading-none 
              text-cyan-400 font-black mb-2 select-none"
            >
              "
            </motion.div>

            <div className="mb-6 md:mb-8 min-h-[120px] sm:min-h-[140px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeClient.id + "-quote"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <AnimatedQuote
                    text={activeClient.quote}
                    highlightWords={activeClient.highlightWords}
                    isInView={isInView}
                    slideKey={activeClient.id}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              variants={fadeUpVariants}
              custom={0.8}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2">
                {clients.map((client, i) => (
                  <motion.button
                    key={client.id}
                    onClick={() => goToSlide(i)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    animate={{
                      scale: i === activeIndex ? 1.1 : 1,
                      zIndex: i === activeIndex ? 10 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative cursor-pointer border-0
                    outline-none bg-transparent p-0"
                    aria-label={`View ${client.name} testimonial`}
                  >
                    <motion.div
                      animate={{
                        opacity: i === activeIndex ? 1 : 0,
                        scale: i === activeIndex ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute -inset-0.5 rounded-full
                      border-2 border-cyan-400 z-10"
                    />
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden
                      border-2 border-[#080808] relative"
                    >
                      <img
                        src={client.photo}
                        alt={client.name}
                        crossOrigin="anonymous"
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          if (target.parentElement) {
                            target.parentElement.style.background =
                              "linear-gradient(135deg, #0072ff, #00c6ff)";
                          }
                        }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClient.id + "-label"}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col"
                >
                  <span className="text-white text-xs font-semibold">
                    {activeClient.name}
                  </span>
                  <span className="text-white/35 text-[10px]">
                    {activeClient.role} · Verified client
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={quoteMarkVariants}
              custom={0.4}
              className="text-[2.5rem] sm:text-[4rem] leading-none 
              text-cyan-400 font-black mt-2 text-right select-none"
            >
              "
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
