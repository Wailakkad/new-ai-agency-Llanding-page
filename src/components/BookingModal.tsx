import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Check, Sparkles, AlertCircle } from "lucide-react";
import { BookingLead } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService = "",
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingLead>({
    name: "",
    email: "",
    service: preselectedService || "AI Identity Design",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    notes: "",
  });

  const [bookingStep, setBookingStep] = useState<"form" | "done">("form");
  const [createdTicket, setCreatedTicket] = useState<BookingLead | null>(null);

  const servicesList = [
    "Neural Brand Strategy",
    "AI Identity Design",
    "Cognitive Interfaces & Chatbots",
    "General AI Exploration Consultation",
  ];

  const availableHours = ["09:00", "10:30", "11:00", "13:30", "14:00", "15:30", "17:00"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectTime = (hour: string) => {
    setFormData((prev) => ({ ...prev, time: hour }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return;
    }
    
    // Save locally
    const savedBookings = JSON.parse(localStorage.getItem("ai_studio_bookings") || "[]");
    savedBookings.push(formData);
    localStorage.setItem("ai_studio_bookings", JSON.stringify(savedBookings));

    setCreatedTicket(formData);
    setBookingStep("done");
  };

  const resetModal = () => {
    setFormData({
      name: "",
      email: "",
      service: preselectedService || "AI Identity Design",
      date: new Date().toISOString().split("T")[0],
      time: "14:00",
      notes: "",
    });
    setBookingStep("form");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetModal}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-xl bg-[#0a0a12]/95 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] pointer-events-auto"
          id="booking-lead-scheduler-modal"
        >
          {/* Close button */}
          <button
            onClick={resetModal}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white cursor-pointer"
            aria-label="Close scheduling modal"
          >
            <X size={18} />
          </button>

          {bookingStep === "form" ? (
            <div id="booking-step-form-parent">
              <div className="mb-5 pb-3 border-b border-white/5">
                <span className="text-cyan-404 font-mono text-[10px] tracking-widest uppercase block text-cyan-400">
                  BOOK APPOINTMENT
                </span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5 font-display">
                  Initiate Design Alignment
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-normal">
                  Lock down a custom 15-minute briefing session on our high-performance AI roadmap.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" id="appointment-booking-form">
                {/* Name & Email Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="booking-personal-info-row">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/8 focus:border-cyan-400 focus:bg-black/80 text-white placeholder-zinc-600 rounded-lg p-2.5 text-xs outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="jane@enterprise.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/8 focus:border-cyan-400 focus:bg-black/80 text-white placeholder-zinc-600 rounded-lg p-2.5 text-xs outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Service Choice */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1">
                    Select Target Discipline
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/8 focus:border-cyan-400 focus:bg-black text-white rounded-lg p-2.5 text-xs outline-hidden cursor-pointer"
                    id="booking-service-dropdown"
                  >
                    {servicesList.map((srv, index) => (
                      <option key={index} value={srv} className="bg-zinc-950 text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="booking-date-hours-container">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar size={11} className="text-cyan-400" /> Choose Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/8 focus:border-cyan-400 text-white rounded-lg p-2.5 text-xs outline-hidden cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock size={11} className="text-cyan-400" /> Selected Hour
                    </label>
                    <div className="grid grid-cols-4 gap-1 max-h-[100px] overflow-y-auto pr-1 border border-white/5 rounded-lg p-1.5 bg-black/40" id="booking-hours-grid">
                      {availableHours.map((hr) => {
                        const isCurHr = formData.time === hr;
                        return (
                          <button
                            key={hr}
                            type="button"
                            onClick={() => handleSelectTime(hr)}
                            className={`p-1 text-[10px] font-semibold font-mono rounded-md text-center transition-all ${
                              isCurHr
                                ? "bg-cyan-500 text-white shadow-md font-bold"
                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {hr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Additional notes/guidelines */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-1">
                    Describe your prompt ideas / scope (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="We want to create a synthetic design system for our financial platform..."
                    value={formData.notes || ""}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/8 focus:border-cyan-400 focus:bg-black/80 text-white placeholder-zinc-650 rounded-lg p-2.5 text-xs outline-hidden transition-all resize-none"
                  />
                </div>

                {/* CTA Action button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs tracking-wider uppercase py-3 rounded-lg cursor-pointer shadow-[0_4px_16px_rgba(14,165,233,0.3)] flex items-center justify-center gap-1.5 outline-hidden"
                  id="final-appointment-schedule-submit"
                >
                  <Sparkles size={13} className="text-white/80" />
                  <span>Lock In Briefing Slot</span>
                </motion.button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
              id="booking-step-success-screen"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-400/35 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Check size={32} className="stroke-[3]" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-1 font-display">Briefing Slot Reserved!</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Congratulations, <strong>{createdTicket?.name}</strong>. Your agency workspace profile is authorized and ready for synchronization.
              </p>

              {/* Summary card visual */}
              <div className="my-5 bg-[#12121e]/80 border border-white/5 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5" id="confirmation-details-service-row">
                  <span className="text-zinc-500">Selected Service:</span>
                  <span className="text-white font-semibold truncate max-w-[170px]">{createdTicket?.service}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5" id="confirmation-details-date-row">
                  <span className="text-zinc-500">Date Loop:</span>
                  <span className="text-white font-mono font-bold">{createdTicket?.date}</span>
                </div>
                <div className="flex justify-between" id="confirmation-details-hour-row">
                  <span className="text-zinc-500">Schedule Time:</span>
                  <span className="text-cyan-405 font-mono font-bold text-cyan-400">{createdTicket?.time} (UTC)</span>
                </div>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/15 p-2 px-3 rounded-lg text-[10px] text-yellow-300 max-w-xs mx-auto mb-6 flex gap-1.5 text-left leading-normal">
                <AlertCircle size={12} className="shrink-0 mt-0.5" />
                <span>A Google Meet link was simulated and flying straight to your inbox: <strong>{createdTicket?.email}</strong></span>
              </div>

              <button
                onClick={resetModal}
                className="px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Return to Studio
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
