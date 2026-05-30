'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = () => {
    // Orden directa al sistema para imprimir o guardar como PDF
    if (typeof window !== 'undefined') {
      window.print();
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
