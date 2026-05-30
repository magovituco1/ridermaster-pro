import { Rider, RiderSummary } from './types';

// Persist database in memory across module reloads in development
// Note: In static export / Electron, this will reset on refresh.
// The app primarily uses Firestore for persistent data.
const globalForDb = global as unknown as { riders: Rider[] };

if (!globalForDb.riders) {
  globalForDb.riders = [
    {
      id: 'demo-1',
      showName: 'GIRA MÁGICA 2025',
      artistName: 'MAGO VITUCO',
      showDate: '2025-05-20',
      venue: 'GRAN TEATRO CENTRAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      songs: [
        { id: 's1', orderNum: 1, songName: 'APERTURA: EL DESPERTAR', soundNotes: 'Fade in orquestal progresivo. Sub-graves potentes.', lightNotes: 'Wash azul oscuro a cenital blanco frío.', extraNotes: 'Humo bajo al inicio.' },
        { id: 's10', orderNum: 10, songName: 'EL ESCAPE FINAL', soundNotes: 'In crescendo épico. Metales potentes.', lightNotes: 'Todo el rig al 100% en movimiento.', extraNotes: 'Pirotecnia final.' }
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
  const index = riders.findIndex(r => r.id === id);
  if (index !== -1) {
    riders.splice(index, 1);
  }
}
