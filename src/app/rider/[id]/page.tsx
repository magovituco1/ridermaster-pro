'use client';

import React, { useMemo } from 'react';
import { useDoc, useFirestore } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
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
  Mic2
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

export default function RiderViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const db = useFirestore();

  const riderRef = useMemo(() => {
    if (!db || !id) return null;
    return doc(db, 'riders', id);
  }, [db, id]);

  const { data: rider, loading } = useDoc(riderRef);

  // Lógica de segmentación: 10 entradas por página A4 horizontal
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
        <h1 className="text-2xl font-black mb-4 uppercase text-white">RIDER NOT FOUND</h1>
        <Link href="/">
          <Button variant="outline">BACK TO REGISTRY</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!db) return;
    deleteDoc(doc(db, 'riders', id));
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 overflow-x-hidden">
      <StageBackground />
      
      <header className="no-print border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <RiderMasterLogo />
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> REGISTRY
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 uppercase font-bold tracking-widest text-xs">
                <Trash2 className="w-4 h-4 mr-2" /> DELETE
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-primary tracking-widest uppercase">DATA REMOVAL</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Permanently remove this Technical Rider? This action is irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-secondary">ABORT</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">CONFIRM</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Link href={`/rider/${id}/edit`}>
            <Button variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest text-xs">
              <Edit className="w-4 h-4 mr-2" /> MODIFY
            </Button>
          </Link>
          
          <PrintButton />
        </div>
      </header>

      <main className="flex flex-col items-center py-12 print:p-0 print:py-0">
        {pageChunks.map((chunk, pageIndex) => (
          <div key={pageIndex} className="a4-landscape-page flex flex-col">
            
            {/* Cabecera superior mínima */}
            <div className="mb-1 flex justify-between items-end">
              <p className="text-[8px] font-black tracking-[0.4em] uppercase text-gray-400">TECHNICAL RIDER</p>
              <p className="text-[8px] font-bold text-gray-300">PAGE {pageIndex + 1} / {pageChunks.length}</p>
            </div>

            {/* Franja negra técnica unificada */}
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between gap-4 mb-6 border-b-4 border-primary">
              <div className="flex items-center gap-1.5 min-w-0">
                <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-[8px] font-black uppercase text-gray-500 tracking-tighter">ARTIST:</span>
                <span className="text-[10px] font-black uppercase truncate">{rider.artistName}</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <Mic2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-[8px] font-black uppercase text-gray-500 tracking-tighter">SHOW:</span>
                <span className="text-[10px] font-black uppercase truncate">{rider.showName}</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-[8px] font-black uppercase text-gray-500 tracking-tighter">VENUE:</span>
                <span className="text-[10px] font-black uppercase truncate">{rider.venue}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-[8px] font-black uppercase text-gray-500 tracking-tighter">DATE:</span>
                <span className="text-[10px] font-black uppercase">{rider.showDate}</span>
              </div>
            </div>

            {/* Cuerpo del Rider */}
            <div className="flex-grow">
              <h2 className="text-sm font-black flex items-center gap-2 uppercase border-b-2 border-black pb-1 mb-4">
                <LayoutGrid className="w-4 h-4" /> TECHNICAL RIDER
              </h2>
              
              <div className="overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed border-2 border-black">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-black text-[9px] font-black uppercase tracking-widest">
                      <th className="px-2 py-3 w-10 text-center border-r border-black">#</th>
                      <th className="px-3 py-3 w-1/5 border-r border-black">SONG TITLE</th>
                      <th className="px-3 py-3 w-1/4 border-r border-black">SOUND SPEC</th>
                      <th className="px-3 py-3 w-1/4 border-r border-black">LIGHTING CUES</th>
                      <th className="px-3 py-3 border-r border-black">NOTES / FX</th>
                    </tr>
                  </thead>
                  <tbody className="text-[9px] uppercase font-medium">
                    {chunk.length > 0 ? (
                      chunk.map((song: any) => (
                        <tr key={song.id} className="border-b border-black">
                          <td className="px-2 py-3 text-center font-bold border-r border-black bg-gray-50">{song.orderNum}</td>
                          <td className="px-3 py-3 font-black border-r border-black leading-tight">{song.songName || 'UNTITLED'}</td>
                          <td className="px-3 py-3 border-r border-black whitespace-pre-wrap leading-relaxed">{song.soundNotes || '-'}</td>
                          <td className="px-3 py-3 border-r border-black whitespace-pre-wrap leading-relaxed">{song.lightNotes || '-'}</td>
                          <td className="px-3 py-3 border-r border-black whitespace-pre-wrap leading-relaxed">{song.extraNotes || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-3 py-10 text-center text-gray-400 font-bold uppercase tracking-widest">
                          {pageIndex === 0 ? 'NO CUES REGISTERED' : 'END OF DOCUMENT'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Firma al pie de página */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-end">
              <div className="text-[7px] font-bold text-gray-300 uppercase tracking-[0.4em]">
                OFFICIAL TECHNICAL DOCUMENT • MAGO VITUCO PRODUCTIONS
              </div>
              <div className="text-[10px] font-black uppercase text-black tracking-tight">
                RIDERMASTER <span className="text-gray-400 font-bold">by</span> Mago Vituco Productions
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
