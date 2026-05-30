
/**
 * @fileOverview An AI assistant that suggests technical stage notes.
 * Optimized for Client-Side execution in Electron environments.
 */

import { z } from 'zod';

// We define the schemas for type safety on the client
// Using zod directly avoids top-level Genkit imports that trigger Node-only modules
const RiderSongNoteGeneratorInputSchema = z.object({
  genre: z.string().describe('The musical genre of the song.'),
});

const RiderSongNoteGeneratorOutputSchema = z.object({
  soundNotes: z.string().describe('Sound configuration notes.'),
  lightNotes: z.string().describe('Lighting configuration notes.'),
});

export type RiderSongNoteGeneratorInput = z.infer<typeof RiderSongNoteGeneratorInputSchema>;
export type RiderSongNoteGeneratorOutput = z.infer<typeof RiderSongNoteGeneratorOutputSchema>;

/**
 * Handles the technical note generation.
 * In a static Electron build, we use a lighter execution pattern to avoid Node.js dependency bloat.
 */
export async function generateRiderSongNotes(input: RiderSongNoteGeneratorInput): Promise<RiderSongNoteGeneratorOutput> {
  // We import Genkit dynamically to prevent Webpack from failing during static pre-rendering
  // and to ensure Node.js modules are only potentially loaded in the right context.
  const { ai } = await import('@/ai/genkit');
  
  const prompt = ai.definePrompt({
    name: 'riderSongNoteGeneratorPrompt',
    input: { schema: RiderSongNoteGeneratorInputSchema as any },
    output: { schema: RiderSongNoteGeneratorOutputSchema as any },
    prompt: `You are an expert stage technician. Suggest sound and light notes for: {{{genre}}}`,
  });

  const { output } = await prompt(input);
  return output!;
}
