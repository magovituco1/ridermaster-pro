'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Direct browser print call
    if (typeof window !== 'undefined') {
      try {
        window.print();
      } catch (err) {
        console.error("Print failed:", err);
      }
    }
  };

  return (
    <Button 
      onClick={handlePrint} 
      type="button"
      className="bg-primary text-primary-foreground font-black tracking-widest uppercase text-xs hover:bg-primary/90 shadow-lg relative z-[100]"
    >
      <Printer className="w-4 h-4 mr-2" /> PRINT LANDSCAPE / PDF
    </Button>
  );
};
