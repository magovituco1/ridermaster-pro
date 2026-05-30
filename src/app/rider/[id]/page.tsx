// Ruta neutralizada para compatibilidad con Next.js 15 static export
// La aplicación utiliza /rider/view/?id=... para la visualización dinámica
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
