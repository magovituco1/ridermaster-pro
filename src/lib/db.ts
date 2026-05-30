'use server';

import { Rider, RiderSummary } from './types';
import { revalidatePath } from 'next/cache';

// Persist database in memory across module reloads in development
const globalForDb = global as unknown as { riders: Rider[] };

if (!globalForDb.riders) {
  globalForDb.riders = [
    {
      id: '1',
      showName: 'Neon Nights Tour',
      artistName: 'The Electro-Vibe',
      showDate: '2024-08-15',
      venue: 'Starlight Stadium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      songs: [
        { id: 's1', orderNum: 1, songName: 'Intro Beam', soundNotes: 'Heavy sub bass', lightNotes: 'Slow pulse', extraNotes: '' },
        { id: 's2', orderNum: 2, songName: 'Electric Heart', soundNotes: 'Bright vocals', lightNotes: 'Fast strobe', extraNotes: 'Pyrotechnics ready' }
      ]
    }
  ];
}

const riders = globalForDb.riders;

export async function getRiders(): Promise<RiderSummary[]> {
  return riders.map(({ songs, ...rest }) => ({
    ...rest,
    songCount: songs.length
  }));
}

export async function getRider(id: string): Promise<Rider | null> {
  const rider = riders.find(r => r.id === id);
  if (!rider) return null;
  return JSON.parse(JSON.stringify(rider));
}

export async function saveRider(riderData: Partial<Rider>): Promise<Rider> {
  const now = new Date().toISOString();
  
  if (riderData.id) {
    const index = riders.findIndex(r => r.id === riderData.id);
    if (index !== -1) {
      riders[index] = {
        ...riders[index],
        ...riderData,
        updatedAt: now,
      } as Rider;
      revalidatePath('/');
      revalidatePath(`/rider/${riderData.id}`);
      return JSON.parse(JSON.stringify(riders[index]));
    }
  }

  const newRider: Rider = {
    id: Math.random().toString(36).substring(7),
    showName: riderData.showName || 'Untitled Show',
    artistName: riderData.artistName || 'Unknown Artist',
    showDate: riderData.showDate || now.split('T')[0],
    venue: riderData.venue || 'Unknown Venue',
    createdAt: now,
    updatedAt: now,
    songs: riderData.songs || []
  };
  
  riders.push(newRider);
  revalidatePath('/');
  return JSON.parse(JSON.stringify(newRider));
}

export async function deleteRider(id: string): Promise<void> {
  const index = riders.findIndex(r => r.id === id);
  if (index !== -1) {
    riders.splice(index, 1);
  }
  revalidatePath('/');
}
