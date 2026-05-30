import React from 'react';

export const RiderMasterLogo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#0D0D0D" />
        <rect x="2" y="2" width="96" height="96" rx="10" stroke="#D4AF37" strokeWidth="2" />
        
        {/* Clipboard Design */}
        <path d="M30 25C30 22.8 31.8 21 34 21H66C68.2 21 70 22.8 70 25V75C70 77.2 68.2 79 66 79H34C31.8 79 30 77.2 30 75V25Z" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="1.5" />
        <rect x="42" y="17" width="16" height="6" rx="1" fill="#D4AF37" />
        
        {/* Spotlight Icon Overlay */}
        <circle cx="70" cy="70" r="16" fill="#0D0D0D" stroke="#D4AF37" strokeWidth="2" />
        <g transform="translate(62, 62) scale(0.5)">
          <path d="M16 4L28 28H4L16 4Z" fill="#D4AF37" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        <g stroke="#D4AF37" strokeWidth="1" opacity="0.4">
          <line x1="38" y1="35" x2="62" y2="35" />
          <line x1="38" y1="45" x2="55" y2="45" />
          <line x1="38" y1="55" x2="60" y2="55" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter text-primary">RIDER<span className="text-foreground">MASTER</span></span>
        <span className="text-[9px] font-bold tracking-[0.4em] text-accent uppercase">TECHNICAL PRO</span>
      </div>
    </div>
  );
};