'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = () => {
    // Explicitly check for window and call print
    if (typeof window !== 'undefined') {
      window.focus();
      window.print();
    }
  };

  return (
    <Button 
      onClick={handlePrint} 
      type="button"
      className="bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs hover:bg-primary/90"
    >
      <Printer className="w-4 h-4 mr-2" /> PRINT LANDSCAPE
    </Button>
  );
};
