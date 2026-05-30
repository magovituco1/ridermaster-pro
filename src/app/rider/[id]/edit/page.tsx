
'use client';
/**
 * @fileOverview Esta ruta dinámica está obsoleta para soportar 'output: export'.
 * La lógica se ha movido a /rider/edit?id=...
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedEditPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
