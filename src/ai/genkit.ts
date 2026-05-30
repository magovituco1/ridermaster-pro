
/**
 * Isolated Genkit initialization.
 * The use of dynamic imports in flows prevents this from breaking the client-side Webpack build.
 */
let ai: any = null;

if (typeof window === 'undefined') {
  // We are on server-side or build-time node context
  const { genkit } = require('genkit');
  const { googleAI } = require('@genkit-ai/google-genai');

  ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });
}

export { ai };
