
'use client';

import React, { useMemo, Suspense } from 'react';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { RiderEditor } from '@/components/RiderEditor';
import { StageBackground } from '@/components/StageBackground';
import { RiderMasterLogo } from '@/components/RiderMasterLogo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function EditRiderContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <StageBackground />
        <div className="text-center">
          <h1 className="text-2xl font-black mb-4">RIDER NOT FOUND</h1>
          <Link href="/">
            <Button variant="outline">BACK TO HOME</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <StageBackground />
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between no-print">
        <RiderMasterLogo />
        <Link href={`/rider/view?id=${id}`} className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4" /> CANCEL EDIT
        </Link>
      </header>

      <main className="max-w-5xl mx-auto p-6 mt-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-2">MODIFY RIDER</h1>
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm">UPDATING TECHNICAL SPECIFICATIONS FOR: {rider.showName}</p>
        </div>
        
        <RiderEditor initialRider={rider} />
      </main>
    </div>
  );
}

export default function EditRiderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditRiderContent />
    </Suspense>
  );
}
