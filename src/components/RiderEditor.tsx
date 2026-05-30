
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Rider } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SetlistEditor } from './SetlistEditor';
import { useToast } from '@/hooks/use-toast';
import { Save, Eye, Cloud, CloudUpload, EyeOff, LayoutDashboard } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

interface RiderEditorProps {
  initialRider?: Rider;
}

export const RiderEditor = ({ initialRider }: RiderEditorProps) => {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  
  // Estado para controlar la visibilidad del botón de Preview en tiempo real
  const [currentId, setCurrentId] = useState<string | null>(initialRider?.id || null);
  
  // Ref para mantener el ID asignado y evitar duplicados por auto-guardado
  const assignedId = useRef<string | null>(initialRider?.id || null);
  
  const [formData, setFormData] = useState<Partial<Rider>>(initialRider || {
    showName: '',
    artistName: '',
    showDate: new Date().toISOString().split('T')[0],
    venue: '',
    songs: []
  });

  const lastSavedData = useRef(JSON.stringify(initialRider || {}));
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Efecto para auto-guardado
  useEffect(() => {
    const currentData = JSON.stringify(formData);
    if (currentData === lastSavedData.current) return;
    
    // Evitar auto-guardar si no hay datos mínimos
    if (!formData.showName?.trim() && !formData.artistName?.trim()) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    setIsAutoSaving(true);
    autoSaveTimer.current = setTimeout(() => {
      performSave(true);
    }, 2000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [formData]);

  const performSave = (isBackground: boolean = false) => {
    if (!firestore) return;

    // Lógica para prevenir duplicados: solo generamos ID una vez
    if (!assignedId.current) {
      const newDocRef = doc(collection(firestore, 'riders'));
      assignedId.current = newDocRef.id;
      // Actualizamos el estado para que el botón de Preview aparezca inmediatamente
      setCurrentId(newDocRef.id);
    }

    const riderId = assignedId.current!;
    const riderRef = doc(firestore, 'riders', riderId);
    
    const savePayload = {
      ...formData,
      id: riderId,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    if (!isBackground) setIsSaving(true);

    setDoc(riderRef, savePayload, { merge: true })
      .then(() => {
        lastSavedData.current = JSON.stringify(savePayload);
        if (!isBackground) {
          toast({ title: "Guardado", description: "Especificaciones técnicas actualizadas." });
          router.push(`/rider/view/?id=${riderId}`);
        }
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: riderRef.path,
          operation: 'write',
          requestResourceData: savePayload,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
        setIsAutoSaving(false);
      });
  };

  const handleManualSave = () => {
    if (!formData.showName?.trim() || !formData.artistName?.trim()) {
      toast({ 
        title: "Campos Requeridos", 
        description: "Nombre del Show y Artista son obligatorios.", 
        variant: "destructive" 
      });
      return;
    }
    performSave(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <Card className="border-primary/20 bg-card/60 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-[10px] font-bold flex items-center gap-2 text-primary tracking-[0.3em] uppercase">
            <LayoutDashboard className="w-4 h-4" /> DATOS DE PRODUCCIÓN
          </CardTitle>
          <div className="flex items-center gap-2">
            {isAutoSaving ? (
              <div className="flex items-center gap-1 text-[9px] text-accent animate-pulse font-bold uppercase tracking-widest">
                <CloudUpload className="w-3 h-3" /> AUTO-GUARDANDO...
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">
                <Cloud className="w-3 h-3" /> NUBE SINCRONIZADA
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Nombre del Show</label>
            <Input 
              placeholder="GIRA / EVENTO ESPECIAL" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white h-11"
              value={formData.showName}
              onChange={(e) => setFormData({ ...formData, showName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Artista / Grupo</label>
            <Input 
              placeholder="NOMBRE DEL ARTISTA" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white h-11"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Fecha del Show</label>
            <Input 
              type="date" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white h-11"
              value={formData.showDate}
              onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Lugar / Venue</label>
            <Input 
              placeholder="CIUDAD / TEATRO / RECINTO" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white h-11"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <SetlistEditor 
        initialSongs={formData.songs || []} 
        onChange={(songs) => setFormData(prev => ({ ...prev, songs }))} 
      />

      <div className="flex justify-end gap-4 pt-10 no-print">
        {/* Botón de Preview que se habilita en tiempo real */}
        {currentId ? (
          <Link href={`/rider/view/?id=${currentId}`}>
            <Button 
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground min-w-[180px] h-14 font-black tracking-[0.2em] uppercase text-sm transition-all"
            >
              <Eye className="mr-2 w-5 h-5" /> VISTA PREVIA
            </Button>
          </Link>
        ) : (
          <Button 
            variant="outline"
            disabled
            className="border-border text-muted-foreground min-w-[180px] h-14 font-black tracking-[0.2em] uppercase text-sm opacity-50 cursor-not-allowed"
          >
            <EyeOff className="mr-2 w-5 h-5" /> PREVIEW BLOQUEADO
          </Button>
        )}
        
        <Button 
          onClick={handleManualSave} 
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 font-black tracking-[0.2em] uppercase text-sm shadow-2xl transition-all"
        >
          {isSaving ? "GUARDANDO..." : <><Save className="mr-2 w-5 h-5" /> GUARDAR PRODUCCIÓN</>}
        </Button>
      </div>
    </div>
  );
};
