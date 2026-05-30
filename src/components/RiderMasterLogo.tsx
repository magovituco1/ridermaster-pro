import React from 'react';

export const RiderMasterLogo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="4" fill="#D4AF37" />
        <path d="M25 25L75 25M25 50L75 50M25 75L50 75" stroke="#0D0D0D" strokeWidth="12" strokeLinecap="square" />
        <circle cx="75" cy="75" r="10" fill="#B35F37" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tighter text-primary">RIDER<span className="text-foreground">MASTER</span></span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">Technical v2.0</span>
      </div>
    </div>
  );
};
