
/**
 * @fileOverview An AI assistant that suggests technical stage notes.
 * Optimized for Client-Side execution in Electron environments.
 */

import { z } from 'genkit';

// We define the schemas for type safety on the client
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
  const { ai } = await import('@/ai/genkit');
  
  const prompt = ai.definePrompt({
    name: 'riderSongNoteGeneratorPrompt',
    input: { schema: RiderSongNoteGeneratorInputSchema },
    output: { schema: RiderSongNoteGeneratorOutputSchema },
    prompt: `You are an expert stage technician. Suggest sound and light notes for: {{{genre}}}`,
  });

  const { output } = await prompt(input);
  return output!;
}
