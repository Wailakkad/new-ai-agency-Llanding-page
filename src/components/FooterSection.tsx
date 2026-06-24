import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

const charVariants: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.06,
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

const linkHoverVariants = {
  rest: { x: 0, color: "rgba(255,255,255,0.35)" as const },
  hover: {
    x: 6,
    color: "rgba(255,255,255,1)" as const,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      delay,
    },
  }),
};

function NavLink({
  label,
  active = false,
  delay = 0,
  isInView,
}: {
  label: string;
  active?: boolean;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.a
        href="#"
        initial="rest"
        whileHover="hover"
        variants={linkHoverVariants}
        className={`block font-black uppercase tracking-tight
        cursor-pointer leading-tight
        ${active
          ? "text-white text-2xl md:text-3xl"
          : "text-white/35 text-lg md:text-xl"
        }`}
        onClick={(e) => e.preventDefault()}
      >
        {label}
      </motion.a>
    </motion.div>
  );
}

function SocialIcon({
  icon,
  delay,
  isInView,
}: {
  icon: React.ReactNode;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href="#"
      custom={delay}
      variants={socialVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.2,
        backgroundColor: "rgba(0,198,255,0.15)",
        borderColor: "rgba(0,198,255,0.4)",
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => e.preventDefault()}
      className="w-9 h-9 rounded-full border border-white/10
      bg-white/5 flex items-center justify-center
      text-white/60 text-sm cursor-pointer"
    >
      {icon}
    </motion.a>
  );
}

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-5% 0px" });
  const topInView = useInView(topRef, { once: false, margin: "-10% 0px" });
  const bottomInView = useInView(bottomRef, {
    once: false,
    margin: "-10% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <footer
      ref={sectionRef}
      id="footer-section"
      className="relative w-full bg-[#080808] overflow-hidden pt-20 pb-12 px-6"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px bg-white/8 mb-16 origin-left"
      />

      <div className="max-w-6xl mx-auto">

        <div
          ref={topRef}
          className="grid grid-cols-12 gap-6 mb-20 items-start"
        >

          <motion.div
            style={{ y: photoY }}
            className="col-span-3"
          >
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.92 }}
              animate={topInView
                ? { opacity: 1, x: 0, scale: 1 }
                : {}}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative w-full aspect-[3/4] rounded-2xl
              overflow-hidden border border-white/8 cursor-pointer"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #0d1b3e 0%, " +
                    "#050510 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 30%, " +
                    "rgba(0,100,255,0.4), transparent 65%)",
                }}
              />
              <img
                src="https://res.cloudinary.com/dhkyla1rv/image/upload/v1782222146/founder.jpg"
                alt="Team"
                className="absolute inset-0 w-full h-full
                object-cover object-top opacity-75
                mix-blend-luminosity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,100,255,0.1)",
                }}
              />
            </motion.div>
          </motion.div>

          <div className="col-span-4 col-start-5 pt-2">
            <motion.p
              variants={fadeUpVariants}
              custom={0.1}
              initial="hidden"
              animate={topInView ? "visible" : "hidden"}
              className="text-white/25 text-[10px] tracking-widest
              uppercase mb-5 font-medium"
            >
              [ Menu ]
            </motion.p>
            <div className="flex flex-col gap-3">
              <NavLink
                label="HOME"
                active={true}
                delay={0.15}
                isInView={topInView}
              />
              <NavLink
                label="ABOUT US"
                delay={0.22}
                isInView={topInView}
              />
              <NavLink
                label="PORTFOLIO"
                delay={0.29}
                isInView={topInView}
              />
              <NavLink
                label="MEMBERS"
                delay={0.36}
                isInView={topInView}
              />
            </div>
          </div>

          <div className="col-span-4 col-start-9 pt-2 flex
          justify-between items-start">

            <div>
              <motion.p
                variants={fadeUpVariants}
                custom={0.2}
                initial="hidden"
                animate={topInView ? "visible" : "hidden"}
                className="text-white/25 text-[10px] tracking-widest
                uppercase mb-5 font-medium"
              >
                [ More Pages ]
              </motion.p>
              <div className="flex flex-col gap-3">
                <NavLink
                  label="PRIVACY POLICIES"
                  delay={0.28}
                  isInView={topInView}
                />
                <NavLink
                  label="ABOUT US"
                  delay={0.35}
                  isInView={topInView}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-8">
              <SocialIcon icon={<span className="font-extrabold text-sm">X</span>} delay={0.3} isInView={topInView} />
              <SocialIcon icon={<Linkedin size={16} />} delay={0.4} isInView={topInView} />
              <SocialIcon icon={<Instagram size={16} />} delay={0.5} isInView={topInView} />
            </div>
          </div>

        </div>

        <div
          ref={bottomRef}
          className="relative flex items-end justify-between"
        >

          <motion.div
            initial="hidden"
            animate={bottomInView ? "visible" : "hidden"}
            className="flex-1 overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            <div
              className="text-[4.5rem] sm:text-[6rem] md:text-[8rem]
              lg:text-[10rem] font-black text-white leading-none
              tracking-tighter select-none"
            >
              {"LOREM".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                custom={7}
                variants={charVariants}
                className="text-[2rem] sm:text-[3rem] md:text-[4rem]
                align-super text-white/60"
                style={{ display: "inline-block" }}
              >
                {"\u00A9"}
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={
              bottomInView
                ? { opacity: 1, scale: 1, rotate: 0 }
                : {}
            }
            transition={{
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.5,
            }}
            className="flex-shrink-0 ml-4 mb-2"
          >
            <motion.div
              style={{ rotate: badgeRotate }}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full
              border border-white/15 bg-[#111111]
              flex items-center justify-center cursor-pointer
              relative overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, #00c6ff, transparent 70%)",
                }}
              />
              <span
                className="relative z-10 text-3xl md:text-4xl
                font-black text-white"
              >
                26
              </span>
            </motion.div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={bottomInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-between mt-8
          pt-6 border-t border-white/5"
        >
          <p className="text-white/20 text-xs">
            {"\u00A9"} 2026 Lorem Agency. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with passion & precision
          </p>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-0 right-0 h-[200px]
        pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, " +
            "rgba(0,72,255,0.05), transparent)",
        }}
      />
    </footer>
  );
}
