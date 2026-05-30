
// Archivo neutralizado para permitir export: output en Next.js 15
// Esta ruta no se utiliza activamente, el app usa /rider/view/?id=...

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
