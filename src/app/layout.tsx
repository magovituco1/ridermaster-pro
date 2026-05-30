import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'RiderMaster v2.0 | Technical Rider Management',
  description: 'Pro-grade management for musicians and stage technicians.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background selection:bg-primary selection:text-primary-foreground relative">
        {children}
        <Toaster />
        
        {/* Persistent Branding Footer */}
        <footer className="fixed bottom-6 right-8 pointer-events-none no-print z-[100] opacity-80 hover:opacity-100 transition-opacity">
          <p className="text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-2">
            <span className="text-primary">RIDERMSTAR</span> 
            <span className="text-muted-foreground/40">BY</span> 
            <span className="text-accent">MAGO VITUCO PRODUCTIONS</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
