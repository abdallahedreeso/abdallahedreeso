import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, User, MessageSquare, Terminal } from 'lucide-react';
import { toast } from 'sonner';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all terminal fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate high-speed quantum dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Transmission sent successfully to Abdallah!');
  };

  return (
    <div className="p-4 sm:p-6 text-slate-100 font-sans space-y-5">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Direct Transmission Channel</h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
          ENCRYPTED: RSA-4096
        </span>
      </div>

      {isSuccess ? (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-white">Transmission Delivered!</h3>
          <p className="text-xs text-slate-300">
            Thank you, {formData.name}. Your message has been routed directly to Abdallah's inbox.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', email: '', message: '' });
            }}
            className="text-xs font-mono px-4 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-all"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name / Organization
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Jenkins (Tech Recruiter)"
              className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. sarah@techcorp.com"
              className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Message / Project Brief
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your project, role, or collaboration request..."
              className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> DISPATCH QUANTUM TRANSMISSION
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
