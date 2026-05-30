
/**
 * @fileOverview Esta ruta dinámica está obsoleta para soportar 'output: export'.
 * Se mantiene como Server Component para evitar conflictos con generateStaticParams.
 */
export async function generateStaticParams() {
  return [];
}

export default function ObsoleteRiderPage() {
  return null;
}
