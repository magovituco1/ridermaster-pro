
'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 text-center">
      <RiderMasterLogo className="h-12 mb-12" />
      
      <div className="max-w-md space-y-6">
        <div className="p-6 bg-destructive/10 border border-destructive/50 rounded-lg">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">TECHNICAL FAILURE</h1>
          <p className="text-muted-foreground text-sm font-medium">
            Stage lights have failed. The application encountered a critical error processing your technical data.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()} 
            className="bg-primary text-primary-foreground font-black tracking-widest uppercase py-6"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> REBOOT SYSTEMS
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="text-muted-foreground font-bold tracking-widest uppercase"
          >
            RETURN TO RIDERS
          </Button>
        </div>
        
        {error.digest && (
          <p className="text-[10px] font-mono text-muted-foreground opacity-50">
            ERROR_DIGEST: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
