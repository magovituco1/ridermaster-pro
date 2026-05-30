
import React from 'react';

/**
 * NEUTRALIZED ROUTE for static export.
 * This file satisfies Next.js 15 static export rules for dynamic folders.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Return at least one static param to satisfy the compiler
  return [{ id: 'placeholder' }];
}

export default function NeutralizedRiderPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-primary font-black uppercase tracking-widest text-xs">
        REDIRECTING TO TECHNICAL ENGINE...
      </p>
    </div>
  );
}
