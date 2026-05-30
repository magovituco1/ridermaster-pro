
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
import { Save, LayoutDashboard, Eye, CloudCheck, CloudUpload } from 'lucide-react';
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
  const [formData, setFormData] = useState<Partial<Rider>>(initialRider || {
    showName: '',
    artistName: '',
    showDate: new Date().toISOString().split('T')[0],
    venue: '',
    songs: []
  });

  const lastSavedData = useRef(JSON.stringify(initialRider || {}));
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Background Auto-save Logic
  useEffect(() => {
    const currentData = JSON.stringify(formData);
    
    // Don't auto-save if data hasn't changed or basic info is missing
    if (currentData === lastSavedData.current) return;
    if (!formData.showName || !formData.artistName) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    setIsAutoSaving(true);
    autoSaveTimer.current = setTimeout(() => {
      performSave(true);
    }, 2000); // 2 second debounce for auto-save

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [formData]);

  const performSave = (isBackground: boolean = false) => {
    if (!firestore) return;

    const riderId = formData.id || doc(collection(firestore, 'riders')).id;
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
        if (!formData.id) {
          setFormData(prev => ({ ...prev, id: riderId }));
        }
        if (!isBackground) {
          toast({ title: "Success", description: "Technical rider saved." });
          router.push(`/rider/${riderId}`);
        }
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: riderRef.path,
          operation: 'write',
          requestResourceData: savePayload,
        });
        errorEmitter.emit('permission-error', permissionError);
        if (!isBackground) {
          toast({ title: "Save Failed", description: "Check permissions.", variant: "destructive" });
        }
      })
      .finally(() => {
        setIsSaving(false);
        setIsAutoSaving(false);
      });
  };

  const handleManualSave = () => {
    if (!formData.showName || !formData.artistName) {
      toast({ title: "Validation Error", description: "Show Name and Artist are required.", variant: "destructive" });
      return;
    }
    performSave(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/20 bg-card/60 backdrop-blur-md stage-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary tracking-widest uppercase">
            <LayoutDashboard className="w-4 h-4" /> SHOW INFORMATION
          </CardTitle>
          <div className="flex items-center gap-2">
            {isAutoSaving ? (
              <div className="flex items-center gap-1 text-[10px] text-accent animate-pulse font-bold uppercase tracking-widest">
                <CloudUpload className="w-3 h-3" /> Auto-Saving...
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">
                <CloudCheck className="w-3 h-3" /> Sync Active
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Show / Tour Name</label>
            <Input 
              placeholder="E.G. WORLD TOUR 2025" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white"
              value={formData.showName}
              onChange={(e) => setFormData({ ...formData, showName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Artist</label>
            <Input 
              placeholder="ARTIST NAME" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Performance Date</label>
            <Input 
              type="date" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white"
              value={formData.showDate}
              onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Venue</label>
            <Input 
              placeholder="VENUE / CITY" 
              className="bg-background uppercase tracking-wider font-bold border-primary/10 focus:border-primary text-white"
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

      <div className="flex justify-end gap-4 pt-8 no-print">
        {formData.id && (
          <Link href={`/rider/${formData.id}`}>
            <Button 
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground min-w-[200px] h-14 font-black tracking-[0.2em] uppercase text-lg transition-all"
            >
              <Eye className="mr-2 w-5 h-5" /> VIEW PREVIEW
            </Button>
          </Link>
        )}
        <Button 
          onClick={handleManualSave} 
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 font-black tracking-[0.2em] uppercase text-lg shadow-2xl transition-all"
        >
          {isSaving ? "PROCESSING..." : <><Save className="mr-2 w-5 h-5" /> SAVE RIDER</>}
        </Button>
      </div>
    </div>
  );
};
