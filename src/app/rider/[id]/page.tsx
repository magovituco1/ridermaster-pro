// Esta página satisface el requisito de exportación estática de Next.js 15.
// No se usa en la aplicación real, ya que usamos /rider/view/?id=...
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
