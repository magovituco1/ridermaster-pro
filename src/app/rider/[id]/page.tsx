
// This route is deprecated. App uses /rider/view/?id=...
// Neutralized for static export compatibility.

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'default' }];
}

export default function Page() {
  return null;
}
