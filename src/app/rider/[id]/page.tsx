
// This route is neutralized to satisfy Next.js 15 static export.
// The actual app uses /rider/view/?id=...

export const dynamicParams = false;

export function generateStaticParams() {
  // We provide a dummy param so the build doesn't fail.
  return [{ id: 'production' }];
}

export default function Page() {
  return null;
}
