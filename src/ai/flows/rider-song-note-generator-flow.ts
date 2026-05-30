
/**
 * @fileOverview An AI assistant that suggests technical stage notes.
 * Optimized for Client-Side execution in Electron environments with Offline support.
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
 * Handles technical note generation.
 * Includes a robust fallback for offline scenarios (e.g. touring on a pendrive).
 */
export async function generateRiderSongNotes(input: RiderSongNoteGeneratorInput): Promise<RiderSongNoteGeneratorOutput> {
  try {
    // Check for internet connection before attempting AI call
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      return getOfflineFallback();
    }

    // Dynamic import to isolate Node.js dependencies during the build
    // This prevents build-time failures for static exports.
    const { ai } = await import('@/ai/genkit');
    
    const { output } = await ai.generate({
      prompt: `Suggest technical sound and lighting notes for a stage act of genre: ${input.genre}. Be professional and specific.`,
      output: { schema: RiderSongNoteGeneratorOutputSchema as any },
    });

    return output || getOfflineFallback();
  } catch (error) {
    return getOfflineFallback();
  }
}

function getOfflineFallback(): RiderSongNoteGeneratorOutput {
  return {
    soundNotes: "Standard sound check: 48kHz, Main LR + Subs. Monitor levels at 60%.",
    lightNotes: "General front wash (Warm). Backlight: Cold Blue. Haze: 20%."
  };
}
