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
  FileText,
  Music,
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
} from "@/components/ui/alert-dialog"

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
    <div className="relative min-h-screen pb-20 print:pb-0">
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

      <main className="max-w-7xl mx-auto p-6 mt-8 print:mt-0 print:p-0">
        <div className="no-print mb-6 flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest">TECHNICAL DOCUMENT PREVIEW</span>
        </div>

        {/* DOCUMENT CONTAINER */}
        <div className="bg-white text-black p-12 shadow-2xl rounded-sm print:shadow-none print:p-0 print-container">
          
          {/* HEADER LABEL */}
          <div className="mb-4">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">TECHNICAL RIDER</p>
          </div>

          {/* UNIFIED BLACK INFO STRIP */}
          <div className="bg-black text-white px-6 py-4 flex flex-wrap items-center justify-between gap-6 mb-10 border-b-4 border-primary print:border-primary">
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">ARTIST:</span>
              <span className="text-xs font-black uppercase">{rider.artistName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic2 className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">SHOW:</span>
              <span className="text-xs font-black uppercase">{rider.showName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">VENUE:</span>
              <span className="text-xs font-black uppercase">{rider.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">DATE:</span>
              <span className="text-xs font-black uppercase">{rider.showDate}</span>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2 uppercase border-b-2 border-black pb-2">
              <LayoutGrid className="w-5 h-5" /> TECHNICAL SETLIST & CUES
            </h2>
            
            <div className="overflow-hidden">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-100 border-y border-black text-[10px] font-black uppercase tracking-widest">
                    <th className="px-3 py-3 w-12 text-center border-x border-black">#</th>
                    <th className="px-3 py-3 w-1/4 border-r border-black">SONG TITLE</th>
                    <th className="px-3 py-3 w-1/4 border-r border-black">SOUND SPEC</th>
                    <th className="px-3 py-3 w-1/4 border-r border-black">LIGHTING CUES</th>
                    <th className="px-3 py-3 border-r border-black">NOTES / FX</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] uppercase font-medium">
                  {(rider.songs || []).map((song: any) => (
                    <tr key={song.id} className="border-b border-black">
                      <td className="px-3 py-4 text-center font-bold border-x border-black bg-gray-50">{song.orderNum}</td>
                      <td className="px-3 py-4 font-black border-r border-black leading-tight">{song.songName}</td>
                      <td className="px-3 py-4 border-r border-black whitespace-pre-wrap leading-relaxed">{song.soundNotes || '-'}</td>
                      <td className="px-3 py-4 border-r border-black whitespace-pre-wrap leading-relaxed">{song.lightNotes || '-'}</td>
                      <td className="px-3 py-4 border-r border-black whitespace-pre-wrap leading-relaxed">{song.extraNotes || '-'}</td>
                    </tr>
                  ))}
                  {(!rider.songs || rider.songs.length === 0) && (
                    <tr className="border-b border-black">
                      <td colSpan={5} className="px-3 py-12 text-center text-gray-400 font-bold uppercase tracking-[0.3em] italic">
                        NO TECHNICAL DATA REGISTERED FOR THIS SHOW
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-end">
            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              OFFICIAL TECHNICAL DOCUMENT
            </div>
            <div className="text-[10px] font-black uppercase">
              MAGO VITUCO PRODUCTIONS
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
