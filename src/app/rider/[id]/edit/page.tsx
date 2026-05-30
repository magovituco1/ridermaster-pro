
import React from 'react';

/**
 * NEUTRALIZED ROUTE for static export.
 * This file satisfies Next.js 15 static export rules for dynamic folders.
 * It does not use "use client" so generateStaticParams is allowed.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default function NeutralizedEditPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-primary font-black uppercase tracking-widest text-xs">
        REDIRECTING TO EDITOR...
      </p>
    </div>
  );
}
