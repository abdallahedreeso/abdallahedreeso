import React, { useState } from "react";
import { Mail, Send, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

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
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 px-4 max-w-6xl mx-auto pb-24">
      <div className="pixel-box-gold p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-amber-400" />
          <h2 className="font-pixel text-lg sm:text-xl text-amber-400 pixel-text-shadow">
            GUILD DISPATCH [SEND TRANSMISSION]
          </h2>
        </div>
        <span className="font-dialogue text-lg text-slate-300">
          LOCATION: TAVERN MAILBOX
        </span>
      </div>

      <div className="pixel-box p-6 sm:p-8">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-pixel text-xs text-amber-400 block">
                  CHARACTER / ADVENTURER NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sir Frontend"
                  className="w-full bg-slate-950 border-2 border-slate-700 px-4 py-3 font-dialogue text-xl text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-pixel text-xs text-amber-400 block">
                  COURIER EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="adventurer@guild.com"
                  className="w-full bg-slate-950 border-2 border-slate-700 px-4 py-3 font-dialogue text-xl text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-pixel text-xs text-amber-400 block">
                QUEST BRIEF / MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project quest specifications..."
                className="w-full bg-slate-950 border-2 border-slate-700 px-4 py-3 font-dialogue text-xl text-slate-100 focus:outline-none focus:border-amber-400 pixel-box"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="pixel-box-gold w-full py-4 font-pixel text-sm text-amber-400 hover:text-white flex items-center justify-center gap-3 transition-transform hover:scale-[1.01]"
            >
              <Send className="w-5 h-5" /> DISPATCH QUEST REQUEST
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
