// Esta página satisface el requisito de Next.js 15 para exportación estática.
// Como la aplicación usa parámetros de búsqueda (?id=...), esta ruta dinámica no se utiliza en ejecución.
export function generateStaticParams() {
  return [];
}

export default function Page() {
  return null;
}
