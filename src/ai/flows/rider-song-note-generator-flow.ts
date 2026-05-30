
/**
 * @fileOverview An AI assistant that suggests technical stage notes.
 * Optimized for Client-Side execution in Electron environments.
 */

import { z } from 'zod';

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
 * In a static Electron build, we avoid top-level Genkit imports to prevent build errors.
 */
export async function generateRiderSongNotes(input: RiderSongNoteGeneratorInput): Promise<RiderSongNoteGeneratorOutput> {
  try {
    // Dynamic import to isolate Node.js dependencies from the main bundle
    const { ai } = await import('@/ai/genkit');
    
    const prompt = ai.definePrompt({
      name: 'riderSongNoteGeneratorPrompt',
      input: { schema: RiderSongNoteGeneratorInputSchema as any },
      output: { schema: RiderSongNoteGeneratorOutputSchema as any },
      prompt: `You are an expert stage technician. Suggest sound and light notes for: {{{genre}}}`,
    });

    const { output } = await prompt(input);
    return output || { 
      soundNotes: "Standard technical sound check required.", 
      lightNotes: "General wash lighting." 
    };
  } catch (error) {
    console.warn("AI Generation failed locally:", error);
    return {
      soundNotes: "Please configure sound manually for this act.",
      lightNotes: "Please configure lighting manually for this act."
    };
  }
}
