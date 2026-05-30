'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const StageBackground = () => {
  // Buscamos la imagen configurada en placeholder-images.json
  const bgImage = PlaceHolderImages.find(img => img.id === 'stage-background');
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] no-print">
      {/* Imagen adaptada a pantalla completa y posicionada a la derecha */}
      <div className="absolute inset-0 opacity-40">
        <Image 
          src={bgImage?.imageUrl || "https://picsum.photos/seed/ridermaster-stage/1920/1080"}
          alt="RiderMaster Official Background"
          fill
          className="object-cover object-right"
          priority
          data-ai-hint="concert stage"
        />
      </div>
      
      {/* Degradado profundo a la izquierda para garantizar legibilidad de textos */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent w-full" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {/* Sutil haz de luz ámbar animado para dar vida al escenario */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M85% 0 L98% 100% L70% 100% Z" fill="url(#beam-gold)" className="animate-pulse" />
      </svg>
    </div>
  );
};