import React from 'react';
import { getRider, deleteRider } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
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

export default async function RiderViewPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const rider = await getRider(id);

  if (!rider) {
    notFound();
  }

  async function handleDelete() {
    'use server';
    await deleteRider(id);
    redirect('/');
  }

  return (
    <div className="relative min-h-screen pb-20 print:pb-0">
      <StageBackground />
      
      {/* Navbar - Hidden when printing */}
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
                <AlertDialogTitle className="text-primary tracking-widest">DATA INTEGRITY WARNING</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  You are about to permanently remove this Technical Rider. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-secondary">ABORT</AlertDialogCancel>
                <form action={handleDelete}>
                  <AlertDialogAction type="submit" className="bg-destructive text-destructive-foreground">CONFIRM DELETION</AlertDialogAction>
                </form>
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
        {/* Print Only Logo/Header */}
        <div className="hidden print:flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-black uppercase">RIDER MASTER</h1>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Technical Documentation v2.0</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase">ID: {rider.id.toUpperCase()}</div>
            <div className="text-[10px] font-mono">PRINTED: {new Date().toLocaleString()}</div>
          </div>
        </div>

        {/* Header Section (Show Information) */}
        <div className="mb-12 border-l-4 border-primary pl-6 py-6 bg-secondary/20 backdrop-blur-sm print:bg-white print:border-black print:text-black print:mb-8 print:pl-4 print:py-2">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter print:text-3xl print:mb-2">{rider.showName}</h1>
              <div className="flex flex-wrap gap-6 items-center print:gap-4">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <Users className="w-4 h-4 text-primary print:text-black" /> {rider.artistName}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-accent print:text-black" /> {rider.showDate}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-accent print:text-black" /> {rider.venue}
                </div>
              </div>
            </div>
            <div className="text-right no-print">
              <div className="text-[10px] font-mono text-muted-foreground">CREATED: {new Date(rider.createdAt).toLocaleDateString()}</div>
              <div className="text-[10px] font-mono text-muted-foreground">UPDATE: {new Date(rider.updatedAt).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Technical Table Section (Specs Bottom) */}
        <div className="space-y-4 print:space-y-2">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 no-print">
            <LayoutGrid className="w-5 h-5 text-primary" /> TECHNICAL SETLIST SPECIFICATIONS
          </h2>
          
          <div className="hidden print:block text-xs font-black uppercase tracking-widest mb-2 border-b border-black">
            Technical Setlist Specifications
          </div>

          <div className="overflow-hidden border border-border rounded-lg bg-card/40 print:border-black print:rounded-none print:bg-white print:text-black">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] print:bg-gray-100 print:border-black">
                  <th className="px-4 py-4 w-12 text-center print:py-2 print:border-r">#</th>
                  <th className="px-4 py-4 w-[20%] print:py-2 print:border-r">SONG / SEGMENT</th>
                  <th className="px-4 py-4 w-[25%] print:py-2 print:border-r">SOUND CONFIG</th>
                  <th className="px-4 py-4 w-[25%] print:py-2 print:border-r">LIGHTING CUES</th>
                  <th className="px-4 py-4 print:py-2">FX / EXTRA NOTES</th>
                </tr>
              </thead>
              <tbody>
                {rider.songs.map((song) => (
                  <tr key={song.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors print:border-black print:hover:bg-transparent">
                    <td className="px-4 py-6 text-center font-mono text-primary font-bold print:py-2 print:border-r print:text-black">{song.orderNum}</td>
                    <td className="px-4 py-6 font-black tracking-widest text-sm uppercase print:py-2 print:border-r print:text-xs">{song.songName}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:py-2 print:border-r print:text-black print:text-[9pt]">{song.soundNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:py-2 print:border-r print:text-black print:text-[9pt]">{song.lightNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:py-2 print:text-black print:text-[9pt]">{song.extraNotes || '-'}</td>
                  </tr>
                ))}
                {rider.songs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground italic print:text-black">No songs configured in setlist.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer for Print */}
        <div className="mt-8 hidden print:block text-[8pt] text-center border-t border-gray-300 pt-4 italic">
          <p>Confidential Stage Document - RiderMaster Technical v2.0</p>
          <p className="mt-1">All lighting and sound cues must be verified during soundcheck at {rider.venue}.</p>
        </div>
      </main>
    </div>
  );
}
