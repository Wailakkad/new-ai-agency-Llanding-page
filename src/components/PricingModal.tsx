import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, CreditCard, Sparkles, AlertCircle } from "lucide-react";
import { PricingPlan } from "../types";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"tier" | "form" | "done">("tier");

  const plans: PricingPlan[] = [
    {
      id: "lite",
      name: "Essential Core",
      price: "$1,499",
      badge: "Fast Launch",
      description: "Perfect for high-speed MVPs, start-ups, and targeted prompt-to-SVG design cycles.",
      features: [
        "1 active request at a time",
        "Dedicated UI/UX Slack channel",
        "3-day delivery avg turnaround",
        "SVG assets & Figma source files",
        "Unlimited revisions",
      ],
    },
    {
      id: "pro",
      name: "Pro Studio Core",
      price: "$3,899",
      badge: "Popular Core",
      description: "Our signature agency engine. Infinite design pipelines, neural assets, and premium UX.",
      features: [
        "2 active requests simultaneously",
        "Dedicated Art Director support",
        "24-48hr turnaround cycles",
        "Exclusive Lottie / motion files",
        "AI model custom visual exports",
        "Unlimited team members",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Quantum",
      price: "$8,500",
      badge: "Full Custom",
      description: "Built for massive global scale, custom fine-tuned LORAs, and physical-virtual designs.",
      features: [
        "Unlimited active parallel pipelines",
        "Dedicated 24/7 technical lead",
        "Same-day emergency deliverables",
        "Tailored model fine-tuning (FLUX/SD)",
        "NDA & strict intellectual ownership",
        "Enterprise API proxy integrations",
      ],
    },
  ];

  const handleSubscribeClick = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutStep("form");
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      return;
    }
    setCheckoutStep("done");
  };

  const resetModal = () => {
    setSelectedPlan(null);
    setEmailInput("");
    setCheckoutStep("tier");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Main container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-5xl bg-[#0b0b14]/95 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] pointer-events-auto"
          id="pricing-plans-modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5" id="pricing-header">
            <div>
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">STUDIO INVESTMENT</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 font-display">
                Flexible Design Subscriptions
              </h2>
            </div>
            <button
              onClick={resetModal}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white cursor-pointer"
              aria-label="Close pricing modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stepper Logic */}
          {checkoutStep === "tier" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="pricing-cards-grid">
              {plans.map((p) => {
                const isPro = p.id === "pro";
                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4, borderColor: isPro ? "rgba(14,165,233,0.4)" : "rgba(255,255,255,0.18)" }}
                    className={`relative rounded-xl p-5 border flex flex-col justify-between transition-colors h-full ${
                      isPro
                        ? "bg-cyan-950/20 border-cyan-500/25 shadow-[0_0_20px_rgba(14,165,233,0.05)]"
                        : "bg-white/2 border-white/5"
                    }`}
                    id={`plan-card-${p.id}`}
                  >
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase bg-cyan-950/40 px-2 py-0.5 rounded-sm border border-cyan-500/10">
                        {p.badge}
                      </span>
                      {isPro && (
                        <span className="text-[10px] font-bold text-white uppercase bg-cyan-500 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                          <Sparkles size={8} /> Best Value
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight mb-1">{p.name}</h3>
                      <p className="text-xs text-zinc-400 leading-normal mb-4 min-h-[44px]">
                        {p.description}
                      </p>

                      {/* Pricing Tag */}
                      <div className="flex items-baseline gap-1.5 mb-5 border-b border-white/5 pb-4">
                        <span className="text-3xl font-extrabold text-white font-display">{p.price}</span>
                        <span className="text-xs text-zinc-500">/ month</span>
                      </div>

                      {/* Feature list */}
                      <ul className="space-y-2.5 mb-6 text-zinc-300 text-xs" id={`features-for-plan-${p.id}`}>
                        {p.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-start gap-2">
                            <span className="bg-emerald-500/10 text-emerald-400 p-0.5 rounded-full mt-0.5 border border-emerald-500/20">
                              <Check size={8} className="stroke-[3]" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SELECT BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubscribeClick(p.id)}
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isPro
                          ? "bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_4px_12px_rgba(14,165,233,0.25)]"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      }`}
                      id={`subscribe-btn-${p.id}`}
                    >
                      Subscribe {p.name}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {checkoutStep === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto py-4"
              id="subscription-details-checkout-form"
            >
              <div className="bg-[#10101c]/80 border border-white/10 rounded-xl p-5 mb-5">
                <span className="text-[10px] tracking-widest text-cyan-400 font-mono uppercase block mb-1">
                  SECURE CHECKOUT
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Confirm Subscription: {plans.find((p) => p.id === selectedPlan)?.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  No real payments executed. Create your mock design dashboard alignment slot now.
                </p>

                <div className="flex justify-between items-center bg-white/3 border border-white/5 rounded-lg p-3 mt-3">
                  <span className="text-xs text-white/70">Selected Pipeline tier fee</span>
                  <span className="font-bold text-cyan-400 text-md">
                    {plans.find((p) => p.id === selectedPlan)?.price} / mo
                  </span>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="subscription-mock-checkout-form">
                <div>
                  <label className="block text-xs text-zinc-400 font-mono uppercase mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@corporatebrand.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 focus:border-cyan-400 text-white placeholder-zinc-600 rounded-lg p-3 text-xs outline-hidden transition-colors"
                  />
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-lg p-3 flex gap-2.5 text-zinc-400 text-[11px] leading-relaxed">
                  <AlertCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Your 3-day startup window initiates immediately upon profile alignment. Cancel, upgrade, or pause pipeline slots anytime.
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("tier")}
                    className="w-1/3 py-2.5 rounded-lg border border-white/10 text-white/70 text-xs hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-2/3 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(14,165,233,0.3)]"
                  >
                    <CreditCard size={13} />
                    <span>Authorize Pipeline Core</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {checkoutStep === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 max-w-sm mx-auto"
              id="subscription-checkout-done-success"
            >
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-400/35 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check size={26} className="stroke-[3]" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">Workspace Aligned Successfully!</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Verification welcome packet is flying to <strong>{emailInput}</strong>. We've booked your Slack launch kick-off loop!
              </p>

              <button
                onClick={resetModal}
                className="px-6 py-2 bg-white text-black font-semibold text-xs rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close Portal
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
