
/**
 * Neutralized dynamic route to satisfy Next.js 15 static export.
 * Redirects to the search-param based route in the client.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Required for 'output: export' build
  return [{ id: 'production' }];
}

export default function Page() {
  return null;
}
