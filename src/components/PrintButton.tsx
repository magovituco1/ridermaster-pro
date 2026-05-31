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
      alert('No se encontró el rider. Abre una vista de rider primero.');
      return;
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage();

      const page = pages[i] as HTMLElement;

      // Capturar la página completa
      const canvas = await html2canvas(page, {
        scale: 2.8,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // === Franja negra superior ===
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pdfWidth, 1.8, 'F');

      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text('OFFICIAL TECHNICAL RIDER', 1.0, 0.95);

      // Datos personalizados
      pdf.setFontSize(9);
      pdf.text('ARTIST:', 1.0, 1.55);
      pdf.text((page.querySelector('.artist-name, .artist')?.textContent || 'N/A').toUpperCase(), 4.8, 1.55);

      pdf.text('SHOW:', 8.0, 1.55);
      pdf.text((page.querySelector('.show-name, .show')?.textContent || 'N/A').toUpperCase(), 11.8, 1.55);

      pdf.text('VENUE:', 15.5, 1.55);
      pdf.text((page.querySelector('.venue-name, .venue')?.textContent || 'N/A').toUpperCase(), 19.0, 1.55);

      pdf.text('DATE:', 23.5, 1.55);
      pdf.text((page.querySelector('.date-name, .date')?.textContent || 'N/A').toUpperCase(), 26.5, 1.55);

      // Tabla / contenido principal
      pdf.addImage(imgData, 'JPEG', 0.5, 2.4, pdfWidth - 1, pdfHeight - 5.0);

      // === PIE DE PÁGINA ===
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, pdfHeight - 1.2, pdfWidth, 1.2, 'F');

      pdf.setFontSize(8);
      pdf.setTextColor(255, 255, 255);
      pdf.text('RIDERMASTER', 1.0, pdfHeight - 0.65);
      pdf.setFontSize(6.5);
      pdf.text('by', 7.0, pdfHeight - 0.65);
      pdf.setFontSize(8);
      pdf.text('MAGO VITUCO PRODUCTIONS', 9.0, pdfHeight - 0.65);

      pdf.setFontSize(6);
      pdf.text('Validated Production Document', pdfWidth - 7.5, pdfHeight - 0.65);
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
