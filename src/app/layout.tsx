
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'RIDERMASTER | Technical Rider Management',
  description: 'Pro-grade stage management for professional tours.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RiderMaster',
  },
  applicationName: 'RiderMaster',
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background selection:bg-primary selection:text-primary-foreground relative">
        <FirebaseClientProvider>
          {children}
          <Toaster />
          
          <footer className="fixed bottom-6 right-8 pointer-events-none no-print z-[100] opacity-90">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-1">
              <span className="text-primary">RIDERMASTER</span> 
              <span className="text-muted-foreground/60">by</span> 
              <span className="text-accent">MAGO VITUCO PRODUCTIONS</span>
            </p>
          </footer>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
