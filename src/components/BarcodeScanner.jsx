import React, { useEffect } from 'react';
import Quagga from 'quagga';

export default function BarcodeScanner({ onDetect }) {
  useEffect(() => {
    Quagga.init({
      inputStream: { type: 'LiveStream', target: document.querySelector('#barcode-scanner') },
      decoder: { readers: ['ean_reader'] },
    }, err => {
      if (!err) Quagga.start();
    });
    Quagga.onDetected(data => {
      const code = data.codeResult.code;
      onDetect({ id: code, name: code, category: '', quantity: 1, unitPrice: 0, stockLevel: 0 });
      Quagga.stop();
    });
    return () => Quagga.stop();
  }, [onDetect]);

  return <div id="barcode-scanner" className="w-full h-64 mb-4"></div>;
}