// Esta página neutraliza el error de compilación en Next.js 15 con output: export
// La aplicación utiliza /rider/edit/?id=... por lo que esta ruta dinámica no es necesaria
export const dynamicParams = false;

export function generateStaticParams() {
  // Devolvemos al menos un ID de marcador para satisfacer al compilador de Next.js
  return [{ id: 'placeholder' }];
}

export default function Page() {
  return null;
}
