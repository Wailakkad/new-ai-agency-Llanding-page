import { useRef, useState } from "react";
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
      delay: i * 0.05,
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const formCardVariants: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

const inputLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const budgetOptions = [
  "< $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $15,000",
];

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
      style={{ transition: "transform 0.1s ease" }}
    >
      {children}
    </motion.button>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-8% 0px" });
  const headlineInView = useInView(headlineRef, {
    once: false,
    margin: "-10% 0px",
  });
  const formInView = useInView(formRef, { once: false, margin: "-10% 0px" });

  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative w-full bg-[#080808] overflow-hidden py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">

          <div className="col-span-12 md:col-span-5 flex flex-col
          justify-between min-h-auto md:min-h-[400px]">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                className="flex items-center gap-2 px-4 py-1.5
                rounded-full border border-white/10 bg-white/5
                backdrop-blur-md text-white text-xs font-medium
                cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full
                bg-cyan-400 animate-pulse" />
                Get in Touch
              </motion.div>
              <div className="w-6 h-6 rounded-full border
              border-white/10 bg-white/5 flex items-center
              justify-center text-white/40 text-[10px]">
                ✦
              </div>
            </motion.div>

            <motion.div
              ref={headlineRef}
              initial="hidden"
              animate={headlineInView ? "visible" : "hidden"}
              className="flex-1"
            >
              <div
                className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] 
                lg:text-[6.5rem] font-black text-white leading-[0.9] 
                tracking-tighter"
                style={{ perspective: "800px" }}
              >
                <div style={{ overflow: "hidden" }}>
                  {"Contact".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={charVariants}
                      style={{
                        display: "inline-block",
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div style={{ overflow: "hidden" }}>
                  {"Form".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={7 + i}
                      variants={charVariants}
                      style={{
                        display: "inline-block",
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate={headlineInView ? "visible" : "hidden"}
              custom={1.0}
              className="text-white/30 text-xs italic leading-relaxed
              max-w-[200px] mt-6 md:mt-8"
            >
              Drop us a line, we&apos;ll response you in 24 hours.
            </motion.p>
          </div>

          <motion.div
            ref={formRef}
            variants={formCardVariants}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-7"
          >
            <div
              className="rounded-2xl border border-white/8
              bg-[#0d0d0d] p-5 sm:p-8"
            >

              <div className="mb-6">
                <motion.label
                  variants={fadeUpVariants}
                  custom={0.3}
                  className="block text-white/60 text-xs
                  font-medium mb-2 tracking-wide"
                >
                  Your Email
                </motion.label>
                <input
                  type="email"
                  placeholder="Enter the Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent text-white text-sm
                  placeholder-white/20 outline-none pb-2
                  border-b border-white/10 focus:border-white/30
                  transition-colors duration-300"
                />
                <motion.div
                  variants={inputLineVariants}
                  custom={0.35}
                  className="h-px origin-left"
                  animate={{
                    backgroundColor:
                      focusedField === "email"
                        ? "#00c6ff"
                        : "transparent",
                    scaleX: focusedField === "email" ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-white/60 text-xs
                font-medium mb-2 tracking-wide">
                  Your Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent text-white text-sm
                  placeholder-white/20 outline-none pb-2
                  border-b border-white/10 focus:border-white/30
                  transition-colors duration-300"
                />
                <motion.div
                  className="h-px origin-left"
                  animate={{
                    backgroundColor:
                      focusedField === "phone"
                        ? "#00c6ff"
                        : "transparent",
                    scaleX: focusedField === "phone" ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="mb-8">
                <label className="block text-white/60 text-xs
                font-medium mb-2 tracking-wide">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent text-white text-sm
                  placeholder-white/20 outline-none resize-none
                  border-b border-white/10 focus:border-white/30
                  transition-colors duration-300 pb-2"
                />
                <motion.div
                  className="h-px origin-left"
                  animate={{
                    backgroundColor:
                      focusedField === "message"
                        ? "#00c6ff"
                        : "transparent",
                    scaleX: focusedField === "message" ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <motion.div
                variants={fadeUpVariants}
                custom={0.6}
                className="flex flex-wrap gap-2 mb-6 md:mb-8"
              >
                {budgetOptions.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() =>
                      setSelectedBudget(
                        selectedBudget === option ? null : option
                      )
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    animate={{
                      backgroundColor:
                        selectedBudget === option
                          ? "#ffffff"
                          : "rgba(255,255,255,0.04)",
                      color:
                        selectedBudget === option
                          ? "#000000"
                          : "rgba(255,255,255,0.4)",
                      borderColor:
                        selectedBudget === option
                          ? "#ffffff"
                          : "rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.25 }}
                    className="px-4 py-1.5 rounded-full border
                    text-xs font-medium cursor-pointer"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  onClick={handleSubmit}
                  className="w-full sm:flex-1 flex items-center justify-between
                  px-6 py-3.5 rounded-full bg-white/8 border
                  border-white/10 text-white text-sm font-semibold
                  hover:bg-white/15 transition-colors duration-200
                  cursor-pointer"
                >
                  <motion.span
                    animate={
                      submitted
                        ? { color: "#00c6ff" }
                        : { color: "#ffffff" }
                    }
                  >
                    {submitted ? "Sent! ✓" : "Send Request"}
                  </motion.span>
                  <motion.span
                    animate={{ x: submitted ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </MagneticButton>

                <MagneticButton
                  className="w-full sm:flex-1 flex items-center justify-between
                  px-6 py-3.5 rounded-full bg-white/5 border
                  border-white/10 text-white text-sm font-semibold
                  hover:bg-white/10 transition-colors duration-200
                  cursor-pointer"
                >
                  View Our Works
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </MagneticButton>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-1/4 w-[300px] h-[150px]
        blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,114,255,0.06), transparent)",
        }}
      />
    </section>
  );
}
