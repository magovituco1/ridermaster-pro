// Esta página neutraliza el error de compilación en Next.js 15 con output: export
// La aplicación utiliza /rider/view/?id=... por lo que esta ruta dinámica no es necesaria
export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function Page() {
  return null;
}
