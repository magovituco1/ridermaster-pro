
// This route is legacy. App uses /rider/edit/?id=...
// Optimized for static export in Next.js 15.
// We maintain this as a Server Component with empty params to satisfy the 'output: export' build requirement.

export const dynamicParams = false;

export function generateStaticParams() {
  // We provide a dummy param to satisfy NextJS build requirements for dynamic routes in static export mode
  return [{ id: 'legacy-placeholder' }];
}

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-primary font-bold uppercase tracking-widest text-xs">Syncing production data...</p>
    </div>
  );
}
