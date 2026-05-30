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
  LayoutGrid
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
        <h1 className="text-2xl font-black mb-4">RIDER NOT FOUND</h1>
        <Link href="/">
          <Button variant="outline">BACK TO REGISTRY</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!db) return;
    await deleteDoc(doc(db, 'riders', id));
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

      <main className="max-w-7xl mx-auto p-6 mt-8 print:mt-0 print:p-0 print-container">
        {/* PRINT HEADER */}
        <div className="hidden print:flex items-center justify-between mb-8 border-b-4 border-black pb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter text-black uppercase">TECHNICAL RIDER</h1>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-600">RiderMaster Stage Management</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase">ID: {id.slice(0, 8).toUpperCase()}</div>
            <div className="text-[8px] font-mono mt-1 opacity-70">DATE: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* SHOW INFO SUMMARY */}
        <div className="mb-8 border-l-8 border-primary pl-8 py-6 bg-secondary/20 backdrop-blur-sm print:bg-white print:border-black print:text-black print:pl-4 print:py-2 print:mb-6">
          <h1 className="text-5xl font-black mb-4 tracking-tighter print:text-3xl print:mb-2">{rider.showName}</h1>
          <div className="flex flex-wrap gap-10 items-center print:gap-6">
            <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-xs">
              <Users className="w-5 h-5 text-primary print:text-black" /> {rider.artistName}
            </div>
            <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-xs">
              <Calendar className="w-5 h-5 text-accent print:text-black" /> {rider.showDate}
            </div>
            <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-xs">
              <MapPin className="w-5 h-5 text-accent print:text-black" /> {rider.venue}
            </div>
          </div>
        </div>

        <div className="space-y-6 print:space-y-4">
          <h2 className="text-2xl font-black flex items-center gap-3 no-print uppercase">
            <LayoutGrid className="w-6 h-6 text-primary" /> TECHNICAL SETLIST
          </h2>
          
          <div className="overflow-hidden border border-border rounded-lg bg-card/40 print:border-none print:rounded-none print:bg-white print:text-black">
            <table className="w-full text-left border-collapse print:table">
              <thead>
                <tr className="bg-secondary/50 border-b border-border text-xs font-black uppercase tracking-[0.2em] print:bg-gray-100 print:border-black">
                  <th className="px-4 py-4 w-12 text-center print:border">POS</th>
                  <th className="px-4 py-4 w-1/4 print:border">SONG / SEGMENT</th>
                  <th className="px-4 py-4 w-1/4 print:border">SOUND CONFIG</th>
                  <th className="px-4 py-4 w-1/4 print:border">LIGHTING CUES</th>
                  <th className="px-4 py-4 print:border">FX / NOTES</th>
                </tr>
              </thead>
              <tbody>
                {(rider.songs || []).map((song: any) => (
                  <tr key={song.id} className="border-b border-border/50 hover:bg-secondary/20 print:border-black">
                    <td className="px-4 py-6 text-center font-mono text-primary font-bold print:border print:text-black print:text-xs print:py-2">{song.orderNum}</td>
                    <td className="px-4 py-6 font-black tracking-widest text-sm uppercase print:border print:text-[10px] print:py-2">{song.songName}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:border print:text-black print:py-2">{song.soundNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:border print:text-black print:py-2">{song.lightNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:border print:text-black print:py-2">{song.extraNotes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}