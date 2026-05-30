import React from 'react';
import { getRider, deleteRider } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { StageBackground } from '@/components/StageBackground';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Printer, 
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
    <div className="relative min-h-screen pb-20">
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
                  You are about to permanently remove this Technical Rider. This action cannot be undone and will erase all setlist configurations.
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
          
          <Button onClick={() => window.print()} className="bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs">
            <Printer className="w-4 h-4 mr-2" /> PRINT LANDSCAPE
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 mt-8">
        {/* Header Section */}
        <div className="mb-12 border-l-4 border-primary pl-6 py-4 bg-secondary/20 backdrop-blur-sm print:bg-white print:border-black print:text-black">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter">{rider.showName}</h1>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <Users className="w-4 h-4 text-primary" /> {rider.artistName}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-accent" /> {rider.showDate}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-accent" /> {rider.venue}
                </div>
              </div>
            </div>
            <div className="text-right no-print">
              <div className="text-[10px] font-mono text-muted-foreground">CREATED: {new Date(rider.createdAt).toLocaleDateString()}</div>
              <div className="text-[10px] font-mono text-muted-foreground">LATEST UPDATE: {new Date(rider.updatedAt).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Technical Table Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <LayoutGrid className="w-5 h-5 text-primary" /> TECHNICAL SETLIST SPECIFICATIONS
          </h2>

          <div className="overflow-hidden border border-border rounded-lg bg-card/40 print:border-black print:bg-white print:text-black">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] print:bg-gray-100 print:border-black">
                  <th className="px-4 py-4 w-12 text-center">#</th>
                  <th className="px-4 py-4 w-1/4">SONG / SEGMENT</th>
                  <th className="px-4 py-4 w-1/4">SOUND CONFIG</th>
                  <th className="px-4 py-4 w-1/4">LIGHTING CUES</th>
                  <th className="px-4 py-4">FX / EXTRA NOTES</th>
                </tr>
              </thead>
              <tbody>
                {rider.songs.map((song) => (
                  <tr key={song.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors print:border-black">
                    <td className="px-4 py-6 text-center font-mono text-primary font-bold">{song.orderNum}</td>
                    <td className="px-4 py-6 font-black tracking-widest text-sm uppercase">{song.songName}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:text-black">{song.soundNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:text-black">{song.lightNotes || '-'}</td>
                    <td className="px-4 py-6 text-xs whitespace-pre-wrap text-muted-foreground print:text-black">{song.extraNotes || '-'}</td>
                  </tr>
                ))}
                {rider.songs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground italic">No songs configured in setlist.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer for Print */}
        <div className="mt-12 hidden print:block text-xs text-center border-t pt-4 border-gray-300">
          <p className="font-bold">RiderMaster v2.0 - Technical Documentation</p>
          <p className="mt-1">Generated: {new Date().toLocaleString()} | Landscape A4 Stage Layout</p>
        </div>
      </main>
    </div>
  );
}
