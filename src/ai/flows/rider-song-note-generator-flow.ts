
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

export async function generateRiderSongNotes(input: RiderSongNoteGeneratorInput): Promise<RiderSongNoteGeneratorOutput> {
  try {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      return getOfflineFallback();
    }

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
