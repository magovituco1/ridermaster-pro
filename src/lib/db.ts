'use server';

import { Rider, RiderSummary } from './types';
import { revalidatePath } from 'next/cache';

// Persist database in memory across module reloads in development
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
        { id: 's2', orderNum: 2, songName: 'LAS CARTAS VOLADORAS', soundNotes: 'Música rítmica tempo 120bpm. Reverb hall.', lightNotes: 'Chases rápidos ámbar y blanco.', extraNotes: 'Cañón de seguimiento al artista.' },
        { id: 's3', orderNum: 3, songName: 'DESAPARICIÓN EN EL AIRE', soundNotes: 'Silencio dramático. Golpe de timbal final.', lightNotes: 'Blackout total excepto puntual en centro.', extraNotes: 'Flash de magnesio.' },
        { id: 's4', orderNum: 4, songName: 'MANTALISMO EXTREMO', soundNotes: 'Ambiente de misterio. Pads de sintetizador.', lightNotes: 'Luz roja suave lateral.', extraNotes: '' },
        { id: 's5', orderNum: 5, songName: 'EL COFRE DE LOS DESEOS', soundNotes: 'Piano solo melódico.', lightNotes: 'Filtros cálidos (rosas/ámbares).', extraNotes: '' },
        { id: 's6', orderNum: 6, songName: 'INTERMEDIO CÓMICO', soundNotes: 'Música jazz alegre.', lightNotes: 'Luz general de sala al 50%.', extraNotes: '' },
        { id: 's7', orderNum: 7, songName: 'LA GRAN ILUSIÓN', soundNotes: 'Staccato de cuerdas. Mucha compresión.', lightNotes: 'Estrobos en momentos de impacto.', extraNotes: 'CO2 Jets activos.' },
        { id: 's8', orderNum: 8, songName: 'LECTURA DE PENSAMIENTO', soundNotes: 'Micrófono con delay corto.', lightNotes: 'Punto de luz cenital cerrado.', extraNotes: '' },
        { id: 's9', orderNum: 9, songName: 'SUEÑO ORIENTAL', soundNotes: 'Cítaras y percusión exótica.', lightNotes: 'Ciclorama en verde y oro.', extraNotes: 'Incienso/Aroma opcional.' },
        { id: 's10', orderNum: 10, songName: 'EL ESCAPE FINAL', soundNotes: 'In crescendo épico. Metales potentes.', lightNotes: 'Todo el rig al 100% en movimiento.', extraNotes: 'Pirotecnia final.' },
        { id: 's11', orderNum: 11, songName: 'DESPEDIDA Y CIERRE', soundNotes: 'Música de salida. Fade out suave.', lightNotes: 'Bajos a azul noche.', extraNotes: '' },
        { id: 's12', orderNum: 12, songName: 'BIS / CRÉDITOS', soundNotes: 'Mix de los temas principales.', lightNotes: 'Luz de trabajo para salida de público.', extraNotes: '' }
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
