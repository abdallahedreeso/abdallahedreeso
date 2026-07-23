import React, { useState } from "react";

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Architectural Inquiry / Project Proposal",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-3xl space-y-6 font-sans">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-xl backdrop-blur-md">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-purple-950/70 border border-purple-500/40 rounded-full text-purple-300 font-mono text-xs mb-2">
          <span>ENVIRONMENT CONFIG Contact.env</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Initialize Communication Stream
        </h1>
        <p className="text-sm font-mono text-slate-400 mt-1">
          Direct dispatch channel for project consultations, technical architecture audits, and leadership inquiries.
        </p>
      </div>

      {/* Form Container */}
      <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-md font-mono text-xs space-y-6">
        <div className="text-slate-400 border-b border-slate-800 pb-3 flex items-center justify-between">
          <span># Contact.env — System Environment Credentials</span>
          <span className="text-purple-400 font-semibold">ENCRYPTED PORT: 443</span>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 space-y-3">
            <div className="flex items-center space-x-2 text-base font-bold">
              <span>✓ MESSAGE DISPATCHED SUCCESSFULLY</span>
            </div>
            <p className="text-xs text-emerald-200/80">
              Thank you for reaching out. Transmission logged under variable DISPATCH_QUEUE. I will respond within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "Architectural Inquiry", message: "" });
              }}
              className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 rounded border border-emerald-500/50"
            >
              Reset Environment State
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-purple-400 font-semibold block">CLIENT_NAME=</label>
              <input
                type="text"
                required
                placeholder="e.g. Satoshi Nakamoto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-400 rounded px-3 py-2 text-slate-200 font-mono outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-purple-400 font-semibold block">CLIENT_EMAIL=</label>
              <input
                type="email"
                required
                placeholder="e.g. satoshi@bitcoin.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-400 rounded px-3 py-2 text-slate-200 font-mono outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-purple-400 font-semibold block">INQUIRY_SUBJECT=</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-400 rounded px-3 py-2 text-slate-200 font-mono outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-purple-400 font-semibold block">MESSAGE_BODY=</label>
              <textarea
                rows={5}
                required
                placeholder="Describe project requirements, tech stack preferences, or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-400 rounded px-3 py-2 text-slate-200 font-mono outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-purple-500/20 text-sm tracking-wide"
              >
                {loading ? "TRANSMITTING ENCRYPTED PAYLOAD..." : "EXECUTE: SEND_MESSAGE()"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactView;
