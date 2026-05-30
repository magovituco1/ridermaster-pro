
'use client';

/**
 * @fileOverview Esta ruta dinámica está obsoleta para soportar 'output: export'.
 * Se usa generateStaticParams() con un array vacío para evitar errores de compilación.
 */
export async function generateStaticParams() {
  return [];
}

export default function ObsoleteRiderPage() {
  return null;
}
