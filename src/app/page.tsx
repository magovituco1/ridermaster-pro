'use client';

import React, { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import { StageBackground } from '@/components/StageBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  ChevronRight, 
  Users,
  Trash2,
  Edit,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function HomePage() {
  const db = useFirestore();
  
  const ridersRef = useMemo(() => {
    if (!db) return null;
    return collection(db, 'riders');
  }, [db]);

  const { data: riders, loading } = useCollection(ridersRef);

  const handleDelete = (id: string) => {
    if (!db) return;
    deleteDoc(doc(db, 'riders', id));
    toast({ title: "Rider Deleted", description: "The project has been removed." });
  };

  const seedDemoData = async () => {
    if (!db) return;
    
    const demoId = 'gira-magica-2025';
    const demoRider = {
      id: demoId,
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
        { id: 's10', orderNum: 10, songName: 'EL ESCAPE FINAL', soundNotes: 'In crescendo épico. Metales potentes.', lightNotes: 'Todo el rig al 100% en movimiento.', extraNotes: 'Pirotecnia final.' }
      ]
    };

    setDoc(doc(db, 'riders', demoId), demoRider);
    toast({ title: "Demo Loaded", description: "Gira Mágica 2025 is now active." });
  };

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
          <h1 className="text-4xl font-black text-primary uppercase tracking-widest">RIDERS</h1>
          <p className="text-muted-foreground font-medium tracking-wide">ACTIVE TOURS & PRODUCTIONS</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riders?.map((rider: any) => (
              <Card key={rider.id} className="border-border bg-card/60 hover:bg-card/90 transition-all duration-300 stage-shadow group relative overflow-hidden h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="border-primary text-primary font-bold uppercase text-[10px]">PRODUCTION READY</Badge>
                    <Button 
                      onClick={() => handleDelete(rider.id)}
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/20 hover:text-destructive h-8 w-8 z-10 relative"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors truncate">{rider.showName}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
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
                </CardContent>

                <CardFooter className="pt-4 flex flex-col gap-2">
                  <Link href={`/rider/view/?id=${rider.id}`} className="w-full">
                    <Button variant="secondary" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest font-bold text-xs">
                      OPEN TECH RIDER <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/rider/edit/?id=${rider.id}`} className="w-full">
                    <Button variant="outline" className="w-full justify-between border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest font-bold text-xs">
                      MODIFY SPECS <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            
            <Link href="/rider/new" className="h-full min-h-[300px]">
              <div className="h-full border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-colors bg-card/20">
                <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <span className="text-muted-foreground font-bold tracking-widest uppercase group-hover:text-primary text-xs">CREATE NEW PRODUCTION</span>
              </div>
            </Link>

            {(!riders || riders.length === 0) && (
              <div className="lg:col-span-3 flex justify-center pt-8">
                <Button 
                  onClick={seedDemoData}
                  variant="ghost" 
                  className="text-accent hover:text-accent/80 font-black tracking-[0.3em] uppercase text-[10px] gap-2"
                >
                  <Sparkles className="w-4 h-4" /> RECOVER DEMO DATA (MAGO VITUCO)
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}