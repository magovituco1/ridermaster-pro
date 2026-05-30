
'use client';
/**
 * @fileOverview Esta ruta dinámica está obsoleta para soportar 'output: export'.
 * La lógica se ha movido a /rider/view?id=...
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirección de seguridad por si alguien accede a la ruta antigua
    router.replace('/');
  }, [router]);

  return null;
}
