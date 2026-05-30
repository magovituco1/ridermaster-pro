
/**
 * Neutralized dynamic route to satisfy Next.js 15 static export.
 * This route is now inert. The app uses search-param based routes (?id=...).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Required for 'output: export' build to pass
  return [{ id: 'production' }];
}

export default function Page() {
  return null;
}
