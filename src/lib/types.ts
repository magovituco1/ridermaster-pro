export interface Song {
  id: string;
  orderNum: number;
  songName: string;
  soundNotes: string;
  lightNotes: string;
  extraNotes: string;
}

export interface Rider {
  id: string;
  showName: string;
  artistName: string;
  showDate: string;
  venue: string;
  createdAt: string;
  updatedAt: string;
  songs: Song[];
}

export interface RiderSummary extends Omit<Rider, 'songs'> {
  songCount: number;
}
