'use client';

import React from 'react';
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
  const riderRef = db ? doc(db, 'riders', id) : null;
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
                <Trash2 className="w-4 h-4 mr-2" /> DESTROY
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-primary tracking-widest uppercase">DATA INTEGRITY WARNING</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  You are about to permanently remove this Technical Rider. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-secondary">ABORT</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">CONFIRM DELETION</AlertDialogAction>
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
        <div className="hidden print:flex items-center justify-between mb-8 border-b-4 border-black pb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter text-black uppercase">RIDER MASTER TECHNICAL</h1>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-600">Pro-Grade Stage Management System</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase">PROJECT ID: {id.toUpperCase()}</div>
            <div className="text-[9px] font-mono mt-1 opacity-70 uppercase tracking-widest">Date Generated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="mb-12 border-l-8 border-primary pl-8 py-8 bg-secondary/20 backdrop-blur-sm print:bg-white print:border-black print:text-black print:mb-8 print:pl-6 print:py-4">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-6xl font-black mb-2 tracking-tighter print:text-4xl print:mb-4">{rider.showName}</h1>
              <div className="flex flex-wrap gap-10 items-center print:gap-8">
                <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-sm">
                  <Users className="w-5 h-5 text-primary print:text-black" /> {rider.artistName}
                </div>
                <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-sm">
                  <Calendar className="w-5 h-5 text-accent print:text-black" /> {rider.showDate}
                </div>
                <div className="flex items-center gap-3 text-lg font-bold uppercase tracking-widest print:text-sm">
                  <MapPin className="w-5 h-5 text-accent print:text-black" /> {rider.venue}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 print:space-y-4">
          <h2 className="text-2xl font-black flex items-center gap-3 mb-8 no-print uppercase">
            <LayoutGrid className="w-6 h-6 text-primary" /> TECHNICAL SETLIST SPECIFICATIONS
          </h2>
          
          <div className="hidden print:block text-sm font-black uppercase tracking-[0.3em] mb-4 border-b-2 border-black pb-1">
            SETLIST TECHNICAL SPECIFICATIONS & CUES
          </div>

          <div className="overflow-hidden border border-border rounded-lg bg-card/40 print:border-black print:rounded-none print:bg-white print:text-black">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 border-b border-border text-xs font-black uppercase tracking-[0.2em] print:bg-gray-200 print:border-black">
                  <th className="px-4 py-5 w-16 text-center print:py-3 print:border-r">POS</th>
                  <th className="px-4 py-5 w-[20%] print:py-3 print:border-r">SONG / SEGMENT</th>
                  <th className="px-4 py-5 w-[25%] print:py-3 print:border-r">SOUND CONFIG</th>
                  <th className="px-4 py-5 w-[25%] print:py-3 print:border-r">LIGHTING CUES</th>
                  <th className="px-4 py-5 print:py-3">FX / EXTRA NOTES</th>
                </tr>
              </thead>
              <tbody>
                {(rider.songs || []).map((song: any) => (
                  <tr key={song.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors print:border-black print:hover:bg-transparent">
                    <td className="px-4 py-8 text-center font-mono text-primary font-bold text-lg print:py-4 print:border-r print:text-black print:text-sm">{song.orderNum}</td>
                    <td className="px-4 py-8 font-black tracking-widest text-base uppercase print:py-4 print:border-r print:text-xs">{song.songName}</td>
                    <td className="px-4 py-8 text-xs whitespace-pre-wrap text-muted-foreground print:py-4 print:border-r print:text-black print:text-[10pt] leading-relaxed">{song.soundNotes || 'NO NOTES'}</td>
                    <td className="px-4 py-8 text-xs whitespace-pre-wrap text-muted-foreground print:py-4 print:border-r print:text-black print:text-[10pt] leading-relaxed">{song.lightNotes || 'NO NOTES'}</td>
                    <td className="px-4 py-8 text-xs whitespace-pre-wrap text-muted-foreground print:py-4 print:text-black print:text-[10pt] leading-relaxed">{song.extraNotes || '-'}</td>
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
