import React from 'react';
import { getRiders, deleteRider } from '@/lib/db';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import { StageBackground } from '@/components/StageBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  ChevronRight, 
  Music,
  Users,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function HomePage() {
  const riders = await getRiders();

  async function handleDelete(id: string) {
    'use server';
    await deleteRider(id);
  }

  return (
    <div className="relative min-h-screen">
      <StageBackground />
      
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between no-print">
        <RiderMasterLogo />
        <Link href="/rider/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-bold tracking-widest uppercase">
            <Plus className="w-4 h-4" /> NEW RIDER
          </Button>
        </Link>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black">REGISTRY</h1>
          <p className="text-muted-foreground font-medium tracking-wide">ACTIVE TECHNICAL RIDERS FOR UPCOMING SHOWS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.map((rider) => (
            <Card key={rider.id} className="border-border bg-card/60 hover:bg-card/90 transition-all duration-300 stage-shadow group relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Music size={80} />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="border-primary text-primary font-bold">LIVE SHOW</Badge>
                  <form action={handleDelete.bind(null, rider.id)}>
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/20 hover:text-destructive h-8 w-8 z-10 relative"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
                <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors">{rider.showName}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-wider">
                  <Users className="w-3 h-3" /> {rider.artistName}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Calendar className="w-3 h-3 text-accent" /> {rider.showDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <MapPin className="w-3 h-3 text-accent" /> {rider.venue}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{rider.songCount} SONGS REGISTERED</span>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Link href={`/rider/${rider.id}`} className="w-full">
                  <Button variant="secondary" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest font-bold">
                    VIEW TECHNICALS <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          
          <Link href="/rider/new" className="h-full">
            <div className="h-full min-h-[300px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-colors bg-card/20">
              <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/20 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="text-muted-foreground font-bold tracking-widest uppercase group-hover:text-primary">ADD NEW TECHNICAL RIDER</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
