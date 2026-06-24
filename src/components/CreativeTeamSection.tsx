import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};


function SplitChars({
  text,
  baseDelay = 0,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  className?: string;
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
    </span>
  );
}

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "The Creative",
    tags: ["Art Direction", "Visual"],
    socials: ["\uD835\uDD4F", "in", "\u25CE"],
    photo: "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221228/Art_Director.jpg",
    color: "from-purple-900/60 to-blue-900/40",
  },
  {
    id: 2,
    name: "Lewis Adam",
    role: "The Dynamic",
    tags: ["UI Design", "Graphic"],
    socials: ["\uD835\uDD4F", "in", "\u25CE"],
    photo: "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221228/UIUX_Designer.jpg",
    color: "from-blue-900/60 to-cyan-900/40",
  },
  {
    id: 3,
    name: "Marcus Roy",
    role: "The Builder",
    tags: ["Dev", "Motion"],
    socials: ["\uD835\uDD4F", "in", "\u25CE"],
    photo: "https://res.cloudinary.com/dhkyla1rv/image/upload/v1782221232/Motion_Designer.jpg",
    color: "from-indigo-900/60 to-blue-900/40",
  },
];

function TeamCard({
  member,
  isActive,
  index,
  onClick,
}: {
  member: (typeof teamMembers)[0];
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, margin: "-8% 0px" }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15 * index,
      }}
    >
      <motion.div
        onClick={onClick}
        whileHover={{ scale: isActive ? 1 : 1.02 }}
        animate={{
          scale: isActive ? 1 : 0.95,
          opacity: isActive ? 1 : 0.6,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative flex rounded-2xl overflow-hidden cursor-pointer
        border border-white/5"
        style={{
          height: isActive ? "clamp(140px, 20vw, 180px)" : "clamp(100px, 15vw, 130px)",
          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
      <div
        className={`relative w-28 sm:w-36 md:w-40 flex-shrink-0 
        bg-gradient-to-br
        ${member.color} overflow-hidden`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, " +
              "rgba(0,100,255,0.3), transparent 70%)",
          }}
        />
        <img
          src={member.photo}
          alt={member.name}
          crossOrigin="anonymous"
          loading="lazy"
          className="w-full h-full object-cover object-top
          opacity-90"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center
        justify-center opacity-30">
          <div
            className="w-16 h-24 rounded-full"
            style={{
              background: "radial-gradient(ellipse, #00c6ff44, transparent)",
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-between p-4
            bg-[#0f0f0f]"
          >
            <p className="text-white/40 text-[10px] tracking-widest
            uppercase font-medium">
              [{member.role}]
            </p>

            <div>
              <h3 className="text-white text-xl font-black
              tracking-tight mb-2">
                {member.name}
              </h3>
              <div className="flex gap-3 mb-3">
                {member.socials.map((s, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.3, color: "#00c6ff" }}
                    className="text-white/40 text-xs cursor-pointer"
                    style={{ transition: "color 0.2s" }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-2">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full
                    bg-white/5 border border-white/10
                    text-white/60 text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && (
        <div className="w-px bg-white/10 self-stretch" />
      )}
      </motion.div>
    </motion.div>
  );
}

export default function CreativeTeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });
  const [activeCard, setActiveCard] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ghostNumY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const leftTextY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="creative-team"
      className="relative w-full bg-[#080808] overflow-hidden py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 0.3, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-white/30 text-xs italic mb-12 max-w-[180px]
          leading-relaxed"
        >
          / We focus on quality products that drive result
        </motion.p>

        <div className="grid grid-cols-12 gap-5 md:gap-6 items-start">

          <motion.div
            style={{ y: leftTextY }}
            className="col-span-12 md:col-span-5 relative"
          >
            <motion.div
              style={{ y: ghostNumY }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.06 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute -bottom-4 -left-2 text-[8rem] 
              sm:text-[12rem] md:text-[16rem] font-black text-white 
              leading-none select-none pointer-events-none z-0"
            >
              25
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5
                rounded-full border border-white/10 bg-white/5
                backdrop-blur-md text-white text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full
                bg-cyan-400 animate-pulse" />
                Team Members
              </div>
              <span className="w-6 h-6 rounded-full border
              border-white/10 bg-white/5 flex items-center
              justify-center text-white/40 text-[10px]">
                ✦
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <div
                className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] 
                lg:text-[8rem] font-black text-white leading-[0.88] 
                tracking-tighter"
                style={{ perspective: "800px" }}
              >
                <div style={{ overflow: "hidden" }}>
                  <SplitChars text="Creative" baseDelay={0} />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <SplitChars text="Team" baseDelay={8} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex items-center gap-2 mt-12"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5
                rounded-full border border-white/10 bg-white/5
                text-white text-xs font-medium"
              >
                Playground
              </div>
              <span className="w-6 h-6 rounded-full border
              border-white/10 bg-white/5 flex items-center
              justify-center text-white/40 text-[10px]">
                ✦
              </span>
            </motion.div>
          </motion.div>

          <div
            className="col-span-12 md:col-span-7 flex flex-col gap-3"
          >
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                isActive={activeCard === index}
                index={index}
                onClick={() => setActiveCard(index)}
              />
            ))}

            <motion.div
              variants={fadeUpVariants}
              custom={0.8}
              className="mt-4"
            >
              <p className="text-white text-2xl sm:text-3xl md:text-4xl 
              font-black tracking-tight leading-tight">
                Agencia&apos;s
                <br />
                playground
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
