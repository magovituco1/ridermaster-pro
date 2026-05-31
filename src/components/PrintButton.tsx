'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const PrintButton = () => {
  const handleExport = async () => {
    try {
      const pages = document.querySelectorAll('.a4-landscape-page');
      if (pages.length === 0) {
        alert('No se encontró el rider. Abre una vista primero.');
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

        const canvas = await html2canvas(page, {
          scale: 2.5,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.92);

        // Captura completa - SIN recorte, SIN datos, SIN footer
        pdf.addImage(imgData, 'JPEG', 0.4, 0.4, pdfWidth - 0.8, pdfHeight - 0.8);
      }

      pdf.save('RiderMaster_Pro.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition-all active:scale-95 print:hidden"
    >
      <Printer className="w-4 h-4 mr-2" /> GENERATE PDF
    </Button>
  );
}