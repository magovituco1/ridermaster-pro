
import { Rider, RiderSummary } from './types';

// Persist database in memory / local context
const getGlobal = () => {
  if (typeof window !== 'undefined') return window as any;
  if (typeof global !== 'undefined') return global as any;
  return {} as any;
};

const g = getGlobal();

if (!g.riders) {
  g.riders = [
    {
      id: 'demo-1',
      showName: 'MAGIC TOUR 2025',
      artistName: 'WIZARD VITUCO',
      showDate: '2025-05-20',
      venue: 'GRAND CENTRAL THEATRE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      songs: [
        { id: 's1', orderNum: 1, songName: 'OPENING: THE AWAKENING', soundNotes: 'Progressive orchestral fade in. Powerful sub-bass.', lightNotes: 'Deep blue wash to cold white cenital.', extraNotes: 'Low fog at start.' },
        { id: 's10', orderNum: 10, songName: 'THE FINAL ESCAPE', soundNotes: 'Epic in crescendo. Powerful brass.', lightNotes: 'All rig at 100% in movement.', extraNotes: 'Final pyrotechnics.' }
      ]
    }
  ];
}

const riders = g.riders;

export async function getRiders(): Promise<RiderSummary[]> {
  return riders.map(({ songs, ...rest }: any) => ({
    ...rest,
    songCount: songs.length
  }));
}

export async function getRider(id: string): Promise<Rider | null> {
  const rider = riders.find((r: any) => r.id === id);
  if (!rider) return null;
  return JSON.parse(JSON.stringify(rider));
}

export async function saveRider(riderData: Partial<Rider>): Promise<Rider> {
  const now = new Date().toISOString();
  
  if (riderData.id) {
    const index = riders.findIndex((r: any) => r.id === riderData.id);
    if (index !== -1) {
      riders[index] = {
        ...riders[index],
        ...riderData,
        updatedAt: now,
      } as Rider;
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
  return JSON.parse(JSON.stringify(newRider));
}

export async function deleteRider(id: string): Promise<void> {
  const index = riders.findIndex((r: any) => r.id === id);
  if (index !== -1) {
    riders.splice(index, 1);
  }
}
