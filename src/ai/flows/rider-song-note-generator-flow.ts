
/**
 * @fileOverview An AI assistant that suggests sound and lighting configurations for a song based on its genre.
 *
 * - generateRiderSongNotes - A function that handles the generation of technical notes.
 * - RiderSongNoteGeneratorInput - The input type for the generateRiderSongNotes function.
 * - RiderSongNoteGeneratorOutput - The return type for the generateRiderSongNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Removed 'use server' because it is not supported in static export builds.
// The flow now runs in the client/renderer process of Electron.

const RiderSongNoteGeneratorInputSchema = z.object({
  genre: z
    .string()
    .describe('The musical genre of the song (e.g., Rock, Pop, Jazz, Electronic).'),
});
export type RiderSongNoteGeneratorInput = z.infer<
  typeof RiderSongNoteGeneratorInputSchema
>;

const RiderSongNoteGeneratorOutputSchema = z.object({
  soundNotes: z
    .string()
    .describe('Suggested sound configuration notes for the song.'),
  lightNotes: z
    .string()
    .describe('Suggested lighting configuration notes for the song.'),
});
export type RiderSongNoteGeneratorOutput = z.infer<
  typeof RiderSongNoteGeneratorOutputSchema
>;

export async function generateRiderSongNotes(
  input: RiderSongNoteGeneratorInput
): Promise<RiderSongNoteGeneratorOutput> {
  return riderSongNoteGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riderSongNoteGeneratorPrompt',
  input: {schema: RiderSongNoteGeneratorInputSchema},
  output: {schema: RiderSongNoteGeneratorOutputSchema},
  prompt: `You are an expert stage technician and sound/lighting engineer.
Your task is to analyze a song's genre and suggest detailed, professional technical notes for sound and lighting configuration.
Provide actionable and clear instructions suitable for a live performance setup.

Song Genre: {{{genre}}}

---

Based on the genre, provide specific recommendations for:
1. Sound configuration (e.g., EQ settings, reverb, mic placement, instrument specific mixing).
2. Lighting configuration (e.g., color schemes, movement, intensity, special effects, timing).`,
});

const riderSongNoteGeneratorFlow = ai.defineFlow(
  {
    name: 'riderSongNoteGeneratorFlow',
    inputSchema: RiderSongNoteGeneratorInputSchema,
    outputSchema: RiderSongNoteGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
