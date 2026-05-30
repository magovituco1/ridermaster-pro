// Ruta neutralizada para compatibilidad con Next.js 15 static export
// La aplicación utiliza /rider/edit/?id=... para la edición dinámica
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
