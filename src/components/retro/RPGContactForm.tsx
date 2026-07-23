import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { retroAudio } from "@/utils/retroAudio";

export const RPGContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    retroAudio.playSelectSound();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center px-4 py-2 overflow-y-auto">
      <div className="pixel-box-gold p-3 sm:p-4 mb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-amber-400" />
          <h2 className="font-pixel text-base sm:text-xl text-amber-400 pixel-text-shadow">
            GUILD DISPATCH [SEND TRANSMISSION]
          </h2>
        </div>
        <span className="font-dialogue text-base sm:text-lg text-slate-300">
          LOCATION: TAVERN MAILBOX
        </span>
      </div>

      <div className="pixel-box p-4 sm:p-6 overflow-y-auto">
        {submitted ? (
          <div className="pixel-box-emerald p-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-pixel text-base text-emerald-400">
              TRANSMISSION RECEIVED!
            </h3>
            <p className="font-dialogue text-xl text-slate-200">
              Your quest request has been dispatched to Abdallah Edrees. Expect a reply via courier within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
              }}
              className="pixel-box-gold px-4 py-2 font-pixel text-xs text-amber-400 hover:text-white"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-pixel text-[11px] text-amber-400 block">
                  CHARACTER / ADVENTURER NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sir Frontend"
                  className="w-full bg-slate-950 border-2 border-slate-700 px-3 py-2 sm:py-2.5 font-dialogue text-lg text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-pixel text-[11px] text-amber-400 block">
                  COURIER EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="adventurer@guild.com"
                  className="w-full bg-slate-950 border-2 border-slate-700 px-3 py-2 sm:py-2.5 font-dialogue text-lg text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="font-pixel text-[11px] text-amber-400 block">
                QUEST BRIEF / MESSAGE
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project quest specifications..."
                className="w-full bg-slate-950 border-2 border-slate-700 px-3 py-2 font-dialogue text-lg text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="pixel-box-gold w-full py-3 font-pixel text-xs sm:text-sm text-amber-400 hover:text-white flex items-center justify-center gap-3 transition-transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" /> DISPATCH QUEST REQUEST
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RPGContactForm;
