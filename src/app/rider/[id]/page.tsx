
/**
 * @fileOverview Esta ruta dinámica está obsoleta para soportar 'output: export'.
 * Proporcionamos generateStaticParams vacío para que el compilador de Next.js ignore esta ruta.
 */
export function generateStaticParams() {
  return [];
}

export default function DeprecatedPage() {
  return null;
}
