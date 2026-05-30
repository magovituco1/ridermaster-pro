
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
 * AI logic adapted for Electron / Static Export.
 * Uses dynamic import to prevent bundling server-side Genkit into the client bundle.
 */
export async function generateRiderSongNotes(input: RiderSongNoteGeneratorInput): Promise<RiderSongNoteGeneratorOutput> {
  try {
    // Check if offline
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      return getOfflineFallback();
    }

    // Dynamic import to isolate Genkit Node-side modules from Webpack bundle
    const genkitModule = await import('@/ai/genkit').catch(() => null);
    
    if (!genkitModule || !genkitModule.ai) {
      return getOfflineFallback();
    }

    const { ai } = genkitModule;
    
    const { output } = await ai.generate({
      prompt: `Suggest technical sound and lighting notes for a stage act of genre: ${input.genre}. Be professional and specific.`,
      output: { schema: RiderSongNoteGeneratorOutputSchema as any },
    });

    return (output as any) || getOfflineFallback();
  } catch (error) {
    console.warn('AI Flow encountered a module resolution error, using fallback:', error);
    return getOfflineFallback();
  }
}

function getOfflineFallback(): RiderSongNoteGeneratorOutput {
  return {
    soundNotes: "Standard sound check: 48kHz, Main LR + Subs. Monitor levels at 60%.",
    lightNotes: "General front wash (Warm). Backlight: Cold Blue. Haze: 20%."
  };
}
