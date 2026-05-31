'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const PrintButton = () => {
  const handleExport = async () => {
    const pages = document.querySelectorAll('.a4-landscape-page');

    if (pages.length === 0) {
      alert('No se encontró el contenido para imprimir');
      return;
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const spans = document.querySelectorAll('.a4-landscape-page .text-\\[9px\\].font-black');
    const artist = spans[0]?.textContent?.trim() || 'ARTIST';
    const show   = spans[1]?.textContent?.trim() || 'SHOW';
    const venue  = spans[2]?.textContent?.trim() || 'VENUE';
    const date   = spans[3]?.textContent?.trim() || 'DATE';

    for (let i = 0; i < pages.length; i++) {
      const table = pages[i].querySelector('table');
      if (!table) continue;

      const canvas = await html2canvas(table as HTMLElement, {
        scale: 2.0,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      if (i > 0) pdf.addPage();

      // Franja negra
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pdfWidth, 1.65, 'F');

      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text('OFFICIAL TECHNICAL RIDER', 1.0, 0.85);   // ← subido

      pdf.setFontSize(9);

      // Texto subido + más separación entre VENUE y DATE
      pdf.text('ARTIST:', 1.0, 1.50);
      pdf.text(artist.toUpperCase(), 4.8, 1.50);

      pdf.text('SHOW:', 8.0, 1.50);
      pdf.text(show.toUpperCase(), 10.8, 1.50);

      pdf.text('VENUE:', 13.8, 1.50);
      pdf.text(venue.toUpperCase(), 16.5, 1.50);

      pdf.text('DATE:', 22.0, 1.50);          // ← más separado
      pdf.text(date, 24.3, 1.50);

      pdf.addImage(imgData, 'JPEG', 0.5, 2.3, pdfWidth - 1, pdfHeight - 3.2);
    }

    pdf.save('RiderMaster_Pro.pdf');
  };

  return (
    <Button
      onClick={handleExport}
      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition-all active:scale-95 print:hidden"
    >
      <Printer className="w-4 h-4 mr-2" /> GENERATE PDF
    </Button>
  );
};