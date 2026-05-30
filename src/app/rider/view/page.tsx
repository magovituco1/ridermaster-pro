'use client';

import React, { useMemo, Suspense } from 'react';
import { useDoc, useFirestore } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { StageBackground } from '@/components/StageBackground';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import { Button } from '@/components/ui/button';
import { PrintButton } from '@/components/PrintButton';
import Link from 'next/link';
import { 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users,
  LayoutGrid,
  Music
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function RiderViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const db = useFirestore();

  const riderRef = useMemo(() => {
    if (!db || !id) return null;
    return doc(db, 'riders', id);
  }, [db, id]);

  const { data: rider, loading } = useDoc(riderRef);

  const pageChunks = useMemo(() => {
    if (!rider) return [[]];
    const songs = rider.songs || [];
    const itemsPerPage = 10;
    if (songs.length === 0) return [[]];
    const chunks = [];
    for (let i = 0; i < songs.length; i += itemsPerPage) {
      chunks.push(songs.slice(i, i + itemsPerPage));
    }
    return chunks;
  }, [rider]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <StageBackground />
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <StageBackground />
        <h1 className="text-2xl font-black mb-4 uppercase text-white tracking-widest">RIDER NOT FOUND</h1>
        <Link href="/">
          <Button variant="outline" className="uppercase font-bold tracking-widest text-xs">BACK TO DASHBOARD</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!db || !id) return;
    await deleteDoc(doc(db, 'riders', id));
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 overflow-x-hidden">
      <StageBackground />
      
      <header className="no-print border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <RiderMasterLogo />
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> DASHBOARD
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 uppercase font-bold tracking-widest text-[10px]">
                <Trash2 className="w-4 h-4 mr-2" /> DELETE PROJECT
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-primary tracking-widest uppercase font-black">CONFIRM DELETION</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground font-medium">
                  This technical rider will be permanently deleted from production records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-secondary uppercase font-bold text-xs tracking-widest">CANCEL</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground uppercase font-bold text-xs tracking-widest">DELETE FOREVER</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Link href={`/rider/edit/?id=${id}`}>
            <Button variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest text-[10px]">
              <Edit className="w-4 h-4 mr-2" /> MODIFY SPECS
            </Button>
          </Link>
          
          <PrintButton />
        </div>
      </header>

      <main className="flex flex-col items-center py-12 print:p-0 print:py-0">
        {pageChunks.map((chunk, pageIndex) => (
          <div key={pageIndex} className="a4-landscape-page">
            <div className="mb-1 flex justify-between items-end">
              <p className="text-[7px] font-black tracking-[0.5em] uppercase text-gray-400">OFFICIAL TECHNICAL RIDER</p>
              <p className="text-[7px] font-bold text-gray-300">PAGE {pageIndex + 1} / {pageChunks.length}</p>
            </div>

            <div className="bg-black text-white px-4 py-2 flex items-center justify-between gap-6 mb-4 border-b-2 border-primary shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-[6px] font-black uppercase text-gray-500 tracking-tighter">ARTIST:</span>
                <span className="text-[9px] font-black uppercase truncate">{rider.artistName}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Music className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-[6px] font-black uppercase text-gray-500 tracking-tighter">SHOW:</span>
                <span className="text-[9px] font-black uppercase truncate">{rider.showName}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-[6px] font-black uppercase text-gray-500 tracking-tighter">VENUE:</span>
                <span className="text-[9px] font-black uppercase truncate">{rider.venue}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Calendar className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-[6px] font-black uppercase text-gray-500 tracking-tighter">DATE:</span>
                <span className="text-[9px] font-black uppercase">{rider.showDate}</span>
              </div>
            </div>

            <h2 className="text-[10px] font-black flex items-center gap-2 uppercase border-b-2 border-black pb-1 mb-2 shrink-0">
              <LayoutGrid className="w-3 h-3" /> STAGE CONFIGURATION & CUE LIST
            </h2>
            
            <div className="flex-grow flex flex-col overflow-hidden">
              <table className="w-full text-left border-collapse table-fixed border-2 border-black h-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-black text-[8px] font-black uppercase tracking-widest h-8">
                    <th className="px-2 w-10 text-center border-r border-black">#</th>
                    <th className="px-2 w-[18%] border-r border-black">SONG / ACT</th>
                    <th className="px-2 w-[27%] border-r border-black">SOUND SPECIFICATIONS</th>
                    <th className="px-2 w-[27%] border-r border-black">LIGHTING & CUES</th>
                    <th className="px-2 border-r border-black">TECHNICAL NOTES / FX</th>
                  </tr>
                </thead>
                <tbody className="text-[8px] uppercase font-bold">
                  {chunk.map((song: any) => (
                    <tr key={song.id} className="border-b border-black h-[calc(100%/10.5)]">
                      <td className="px-2 text-center border-r border-black bg-gray-50">{song.orderNum}</td>
                      <td className="px-2 font-black border-r border-black leading-tight py-1">{song.songName || 'UNTITLED ACT'}</td>
                      <td className="px-2 border-r border-black whitespace-pre-wrap leading-tight py-1 overflow-hidden">{song.soundNotes || '-'}</td>
                      <td className="px-2 border-r border-black whitespace-pre-wrap leading-tight py-1 overflow-hidden">{song.lightNotes || '-'}</td>
                      <td className="px-2 border-r border-black whitespace-pre-wrap leading-tight py-1 overflow-hidden">{song.extraNotes || '-'}</td>
                    </tr>
                  ))}
                  {/* Fills empty space if fewer than 10 rows */}
                  {Array.from({ length: Math.max(0, 10 - chunk.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} className="border-b border-black h-[calc(100%/10.5)] opacity-20">
                      <td className="border-r border-black">&nbsp;</td>
                      <td className="border-r border-black">&nbsp;</td>
                      <td className="border-r border-black">&nbsp;</td>
                      <td className="border-r border-black">&nbsp;</td>
                      <td className="border-r border-black">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default function RiderViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-primary font-bold uppercase tracking-widest">SYNCING DATA...</div>}>
      <RiderViewContent />
    </Suspense>
  );
}
