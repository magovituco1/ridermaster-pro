'use client';

import React, { useState } from 'react';
import { Rider, Song } from '@/lib/types';
import { saveRider } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SetlistEditor } from './SetlistEditor';
import { toast } from '@/hooks/use-toast';
import { Save, Info } from 'lucide-react';

interface RiderEditorProps {
  initialRider?: Rider;
}

export const RiderEditor = ({ initialRider }: RiderEditorProps) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Rider>>(initialRider || {
    showName: '',
    artistName: '',
    showDate: new Date().toISOString().split('T')[0],
    venue: '',
    songs: []
  });

  const handleSave = async () => {
    if (!formData.showName || !formData.artistName) {
      toast({ title: "Validation Error", description: "Show Name and Artist are required.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const saved = await saveRider(formData);
      toast({ title: "Rider Saved", description: "All technical notes stored successfully." });
      router.push(`/rider/${saved.id}`);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save rider.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/20 bg-card/60 backdrop-blur-md stage-shadow">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary tracking-widest">
            <Info className="w-4 h-4" /> CORE METADATA
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Show / Tour Name</label>
            <Input 
              placeholder="E.G. STADIUM OVERLOAD TOUR" 
              className="bg-background uppercase tracking-wider font-bold"
              value={formData.showName}
              onChange={(e) => setFormData({ ...formData, showName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Artist / Band</label>
            <Input 
              placeholder="ARTIST NAME" 
              className="bg-background uppercase tracking-wider font-bold"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Performance Date</label>
            <Input 
              type="date" 
              className="bg-background uppercase tracking-wider font-bold"
              value={formData.showDate}
              onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Venue</label>
            <Input 
              placeholder="VENUE NAME / CITY" 
              className="bg-background uppercase tracking-wider font-bold"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <SetlistEditor 
        initialSongs={formData.songs || []} 
        onChange={(songs) => setFormData({ ...formData, songs })} 
      />

      <div className="flex justify-end pt-8">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 font-black tracking-[0.2em] uppercase text-lg shadow-2xl"
        >
          {isSaving ? "STAGING..." : <><Save className="mr-2 w-5 h-5" /> PERSIST RIDER</>}
        </Button>
      </div>
    </div>
  );
};
