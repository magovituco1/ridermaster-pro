
// Este archivo debe ser eliminado manualmente o ignorado. 
// Las rutas dinámicas con [id] no son compatibles con 'output: export' sin generateStaticParams.
// La lógica ha sido movida a src/app/rider/view/page.tsx y src/app/rider/edit/page.tsx usando searchParams (?id=...).

export const dynamic = 'force-static';
export async function generateStaticParams() {
  return []; // Devuelve un array vacío para evitar errores durante el build si el archivo persiste.
}

export default function DeprecatedPage() {
  return null;
}
