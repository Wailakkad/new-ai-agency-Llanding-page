import { useRef } from "react";
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";

const charVariants: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.04,
    },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const plans = [
  {
    id: "01",
    label: "Best for Personal",
    name: "STANDARD PLAN",
    desc: "Have design ready to build with small budget?",
    cta: "Get This Plan",
    price: "$399",
    priceSuffix: "/project",
    featured: false,
    features: [
      "Wireframe for project scope",
      "Design using Figma",
      "Implementation with Webflow",
      "Remote / Online collaboration",
      "Delivery within business days only (no weekends)",
      "3 months support after launch",
      "Weekly Quality Check",
    ],
  },
  {
    id: "02",
    label: "Popular Plan",
    name: "PREMIUM PLAN",
    desc: "Have design ready to build with average budget",
    cta: "Get This Plan",
    price: "$1200",
    priceSuffix: "/project",
    featured: true,
    features: [
      "Wireframe & Art Direction",
      "Design with Figma, Framer",
      "Implementation with Webflow, React",
      "Remote / Online collaboration",
      "Delivery within business days only",
      "6 months support after launch",
      "Daily Quality Check",
    ],
  },
  {
    id: "03",
    label: "Specialized Plan",
    name: "CUSTOM PLAN",
    desc: "Have design ready to build something customized by your plan",
    cta: "Contact Us",
    price: "CONTACT",
    priceSuffix: "",
    featured: false,
    features: [
      "Detailed Wireframe & Prototyping",
      "Advanced Design with Figma, Framer",
      "Full-stack: Webflow, React, WordPress, Laravel/PHP",
      "Remote / Online collaboration",
      "Priority delivery within business days only",
      "Daily Quality Check + Monthly Performance Review",
    ],
  },
];

function PricingCard({
  plan,
  index,
  isInView,
}: {
  plan: (typeof plans)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index * 0.15}
      variants={cardVariants}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className={`relative flex flex-col rounded-2xl p-5 md:p-6 cursor-pointer
      border transition-all duration-300
      ${
        plan.featured
          ? "border-cyan-400/40 bg-[#0d1520]"
          : "border-white/8 bg-[#0d0d0d]"
      }`}
      style={
        plan.featured
          ? {
              boxShadow:
                "0 0 40px rgba(0,198,255,0.08), " +
                "inset 0 0 40px rgba(0,100,255,0.03)",
            }
          : {}
      }
    >
      {plan.featured && (
        <motion.div
          className="absolute top-0 left-4 right-4 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, " +
              "#00c6ff, transparent)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs font-mono">
            [{plan.id}]
          </span>
          <span className="text-white/40 text-xs">
            {plan.label}
          </span>
        </div>
        <motion.div
          animate={{
            backgroundColor: plan.featured
              ? "#00c6ff"
              : "rgba(255,255,255,0.2)",
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          className="w-2 h-2 rounded-full"
        />
      </div>

      <h3 className="text-white text-lg md:text-xl font-black 
      uppercase tracking-tight mb-2">
        {plan.name}
      </h3>

      <p className="text-white/40 text-xs leading-relaxed mb-5">
        {plan.desc}
      </p>

      <motion.button
        whileHover={{
          scale: 1.04,
          backgroundColor: plan.featured ? "#00b8e6" : "#1a1a1a",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.97 }}
        className={`w-full flex items-center justify-between
        px-5 py-3 rounded-xl text-sm font-semibold mb-5
        transition-colors duration-200
        ${
          plan.featured
            ? "bg-cyan-400 text-black"
            : "bg-white/5 text-white border border-white/10"
        }`}
      >
        {plan.cta}
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </motion.button>

      <div className="w-full h-px bg-white/8 mb-5" />

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map((feat, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1 + i * 0.05,
            }}
            className="flex items-start gap-2 text-white/50 text-xs
            leading-relaxed"
          >
            <span className="text-cyan-400 mt-0.5 flex-shrink-0 text-[10px]">
              •
            </span>
            {feat}
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
        className="mt-auto pt-4 border-t border-white/8"
      >
        <span
          className={`font-black leading-none tracking-tighter
          ${
            plan.price === "CONTACT"
              ? "text-3xl md:text-4xl text-white/80"
              : "text-4xl md:text-5xl text-white"
          }`}
        >
          {plan.price}
        </span>
        {plan.priceSuffix && (
          <span className="text-white/30 text-sm ml-1">
            {plan.priceSuffix}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-5% 0px" });
  const headlineInView = useInView(headlineRef, {
    once: false,
    margin: "-10% 0px",
  });
  const cardsInView = useInView(cardsRef, { once: false, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      id="pricing-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 mb-8"
        >
          <div
            className="flex items-center gap-2 px-4 py-1.5
            rounded-full border border-white/10 bg-white/5
            text-white text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400
            animate-pulse" />
            Pricing
          </div>
          <span className="w-6 h-6 rounded-full border
          border-white/10 bg-white/5 flex items-center
          justify-center text-white/40 text-[10px]">
            ✦
          </span>
        </motion.div>

        <motion.div
          ref={headlineRef}
          initial="hidden"
          animate={headlineInView ? "visible" : "hidden"}
          className="mb-16 overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <div
            className="text-[3rem] sm:text-[5rem] md:text-[8rem] 
            lg:text-[10rem] font-black text-white leading-none 
            tracking-tighter"
          >
            {"Pricing ".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  perspective: "800px",
                }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {"Plan".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={8 + i}
                variants={charVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  perspective: "800px",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              isInView={cardsInView}
            />
          ))}
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-[600px] h-[150px] blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,114,255,0.08), transparent)",
        }}
      />
    </section>
  );
}
