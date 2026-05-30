// Ruta dinámica neutralizada para permitir exportación estática en Next.js 15
// Se utiliza navegación por searchParams (?id=...) en las rutas estables /rider/view/
export function generateStaticParams() {
  return [];
}

export default function Page() {
  return null;
}
