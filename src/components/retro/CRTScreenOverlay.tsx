import React, { useState } from "react";
import { Monitor, Tv } from "lucide-react";

export const CRTScreenOverlay: React.FC = () => {
  const [crtEnabled, setCrtEnabled] = useState(true);

  return (
    <>
      {crtEnabled && <div className="crt-overlay" aria-hidden="true" />}
      
      {/* Toggle floating widget in corner */}
      <button
        onClick={() => setCrtEnabled((prev) => !prev)}
        className="fixed bottom-4 right-4 z-[100] pixel-box p-2 text-xs font-pixel text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        title="Toggle CRT Scanline Effect"
      >
        {crtEnabled ? <Tv className="w-4 h-4 text-amber-400" /> : <Monitor className="w-4 h-4 text-slate-400" />}
        <span className="hidden sm:inline">{crtEnabled ? "CRT: ON" : "CRT: OFF"}</span>
      </button>
    </>
  );
};
