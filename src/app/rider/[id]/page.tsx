// Ruta dinamica neutralizada para permitir exportacion estatica en Next.js 15
// Se utiliza navigation por searchParams (?id=...) en su lugar.
export function generateStaticParams() {
  return [];
}

export default function Page() {
  return null;
}
