import React from 'react';

/**
 * NEUTRALIZED ROUTE for static export.
 * Satisfies Next.js 15 static export rules for dynamic folders by providing generateStaticParams.
 * Standardized path in this app is /rider/edit/?id=[id]
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Satisfies the compiler by pre-defining at least one path
  return [{ id: 'placeholder' }];
}

export default function NeutralizedEditPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-primary font-black uppercase tracking-widest text-xs">
        REDIRECTING TO PRODUCTION EDITOR...
      </p>
    </div>
  );
}
