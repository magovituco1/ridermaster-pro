
// This route is legacy. App uses /rider/edit/?id=...
// Optimized for static export in Next.js 15.

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'legacy' }];
}

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-primary font-bold uppercase tracking-widest text-xs">Redirecting to production data...</p>
    </div>
  );
}
