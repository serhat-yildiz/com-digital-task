'use client';

import React from 'react';

interface LegendProps {
  title?: string;
}

export function Legend({ title = '📊 Skor Açıklaması' }: LegendProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 mt-4 sm:mt-6 border border-gray-100">
      <h3 className="font-bold text-lg text-gray-900 mb-3 sm:mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2">Recency (Yakınlık)</h4>
          <p className="text-blue-800">
            Müşterinin son satın alma zamanı. Yüksek skor = yakın zamanda satın aldı.
          </p>
        </div>
        <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-900 mb-2">Frequency (Sıklık)</h4>
          <p className="text-green-800">
            Müşterinin kaç kez satın aldığı. Yüksek skor = sık satın alan.
          </p>
        </div>
        <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <h4 className="font-bold text-purple-900 mb-2">Monetary (Harcama)</h4>
          <p className="text-purple-800">
            Müşterinin toplam harcaması. Yüksek skor = yüksek harcayan.
          </p>
        </div>
      </div>
    </div>
  );
}
