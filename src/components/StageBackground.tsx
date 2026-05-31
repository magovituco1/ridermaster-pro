'use client';

import React from 'react';

export const StageBackground = () => {
  return (
    <>
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-[-2]"
        style={{
          backgroundImage: "url('/images/background-main.jpg')"
        }}
      />
      
      {/* Overlay oscuro (ajustable) */}
      <div 
        className="absolute inset-0 bg-black/60 pointer-events-none z-[-1]"
      />
    </>
  );
};