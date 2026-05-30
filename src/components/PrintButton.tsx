
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.print();
      }, 50);
    }
  };

  return (
    <Button 
      type="button"
      onClick={handlePrint} 
      className="bg-primary text-primary-foreground font-black tracking-widest uppercase text-xs hover:bg-primary/90 shadow-lg px-6"
    >
      <Printer className="w-4 h-4 mr-2" /> PDF / PRINT A4
    </Button>
  );
};
