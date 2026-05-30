
import React from 'react';
import { RiderEditor } from '@/components/RiderEditor';
import { StageBackground } from '@/components/StageBackground';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewRiderPage() {
  return (
    <div className="relative min-h-screen pb-20">
      <StageBackground />
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <RiderMasterLogo />
        <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO RIDERS
        </Link>
      </header>

      <main className="max-w-5xl mx-auto p-6 mt-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-2">NEW RIDER ARCHITECT</h1>
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm">INITIALIZING TECHNICAL DOCUMENTATION</p>
        </div>
        
        <RiderEditor />
      </main>
    </div>
  );
}
