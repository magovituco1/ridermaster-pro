
// This route is deprecated. App uses /rider/view/?id=...
// Neutralized for static export compatibility in Next.js 15.

export const dynamicParams = false;

export function generateStaticParams() {
  // Providing a placeholder to satisfy the 'output: export' requirement
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
