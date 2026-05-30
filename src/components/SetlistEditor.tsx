
'use client';

import React, { useState } from 'react';
import { Song } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { generateRiderSongNotes } from '@/ai/flows/rider-song-note-generator-flow';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Sparkles, 
  Plus, 
  Music,
  Speaker,
  Lightbulb,
  FileText
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SetlistEditorProps {
  initialSongs: Song[];
  onChange: (songs: Song[]) => void;
}

export const SetlistEditor = ({ initialSongs, onChange }: SetlistEditorProps) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs.length > 0 ? initialSongs : []);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const updateSongs = (newSongs: Song[]) => {
    const sorted = newSongs.map((s, i) => ({ ...s, orderNum: i + 1 }));
    setSongs(sorted);
    onChange(sorted);
  };

  const addSong = () => {
    const newSong: Song = {
      id: Math.random().toString(36).substring(7),
      orderNum: songs.length + 1,
      songName: '',
      soundNotes: '',
      lightNotes: '',
      extraNotes: ''
    };
    updateSongs([...songs, newSong]);
  };

  const removeSong = (id: string) => {
    updateSongs(songs.filter(s => s.id !== id));
  };

  const moveSong = (index: number, direction: 'up' | 'down') => {
    const newSongs = [...songs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= songs.length) return;
    [newSongs[index], newSongs[targetIndex]] = [newSongs[targetIndex], newSongs[index]];
    updateSongs(newSongs);
  };

  const updateSongField = (id: string, field: keyof Song, value: string) => {
    updateSongs(songs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const generateAIAssistance = async (id: string, songName: string) => {
    if (!songName) {
      toast({ title: "Name Required", description: "Set an act name to use AI assistant.", variant: "destructive" });
      return;
    }

    setIsGenerating(id);
    try {
      const result = await generateRiderSongNotes({ genre: "Stage Production" });
      updateSongs(songs.map(s => s.id === id ? { 
        ...s, 
        soundNotes: result.soundNotes, 
        lightNotes: result.lightNotes 
      } : s));
      toast({ title: "AI Assistant Ready", description: "Technical cues generated based on the act." });
    } catch (error) {
      toast({ title: "Assistant Error", description: "AI service is currently unavailable.", variant: "destructive" });
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-[0.2em] text-primary">
          <Music className="w-5 h-5" /> CUE LIST ARCHITECT
        </h2>
        <Button onClick={addSong} variant="outline" className="border-primary text-primary hover:bg-primary/10 gap-2 font-bold uppercase tracking-widest text-[10px]">
          <Plus className="w-4 h-4" /> ADD ACT / SONG
        </Button>
      </div>

      <div className="space-y-4">
        {songs.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg text-muted-foreground uppercase font-bold tracking-[0.3em] text-[10px] bg-card/10">
            PRODUCTION EMPTY. ADD YOUR FIRST ACT TO START.
          </div>
        )}

        {songs.map((song, index) => (
          <Card key={song.id} className="border-border bg-card/40 backdrop-blur-sm overflow-hidden group">
            <div className="flex items-center bg-secondary/30 px-4 py-3 border-b border-border">
              <span className="font-mono text-primary font-bold mr-4 text-xs">CUE {song.orderNum}</span>
              <Input
                placeholder="ACT TITLE / SONG NAME"
                value={song.songName}
                onChange={(e) => updateSongField(song.id, 'songName', e.target.value)}
                className="bg-transparent border-none text-base font-black p-0 focus-visible:ring-0 uppercase tracking-widest text-white"
              />
              <div className="flex items-center gap-1 ml-auto">
                <Button size="icon" variant="ghost" onClick={() => moveSong(index, 'up')} disabled={index === 0} className="h-8 w-8">
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => moveSong(index, 'down')} disabled={index === songs.length - 1} className="h-8 w-8">
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => removeSong(song.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-primary flex items-center gap-1 uppercase tracking-widest">
                    <Speaker className="w-3 h-3" /> SOUND CONFIG
                  </label>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 text-[8px] hover:text-primary gap-1 font-bold uppercase tracking-widest"
                    onClick={() => generateAIAssistance(song.id, song.songName)}
                    disabled={isGenerating === song.id}
                  >
                    <Sparkles className="w-3 h-3" /> {isGenerating === song.id ? "THINKING..." : "AI SUGGEST"}
                  </Button>
                </div>
                <Textarea 
                  placeholder="EQ, Mic placement, Reverb level..." 
                  className="min-h-[100px] bg-background/50 text-[11px] font-medium tracking-wide border-border/50" 
                  value={song.soundNotes}
                  onChange={(e) => updateSongField(song.id, 'soundNotes', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black text-accent flex items-center gap-1 uppercase tracking-widest">
                  <Lightbulb className="w-3 h-3" /> LIGHTING / VISUALS
                </label>
                <Textarea 
                  placeholder="Colors, Movement, Gobos, Cues..." 
                  className="min-h-[100px] bg-background/50 text-[11px] font-medium tracking-wide border-border/50" 
                  value={song.lightNotes}
                  onChange={(e) => updateSongField(song.id, 'lightNotes', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
                  <FileText className="w-3 h-3" /> FX & ADDITIONAL NOTES
                </label>
                <Textarea 
                  placeholder="Pyro, CO2, Stage movement, Samples..." 
                  className="min-h-[100px] bg-background/50 text-[11px] font-medium tracking-wide border-border/50" 
                  value={song.extraNotes}
                  onChange={(e) => updateSongField(song.id, 'extraNotes', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
