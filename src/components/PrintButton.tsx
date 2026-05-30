'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Button 
      onClick={handlePrint} 
      className="bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs"
    >
      <Printer className="w-4 h-4 mr-2" /> PRINT LANDSCAPE
    </Button>
  );
};
