'use client';

import { useState, useCallback } from 'react';
import { APIResponse } from '@/types';

export function useAPI() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSelectedIds = useCallback(async (selectedIds: number[]) => {
    if (selectedIds.length === 0) {
      setError('Lütfen en az bir öğe seçin');
      return false;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/selected-ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedIds }),
      });

      if (response.ok) {
        const data: APIResponse = await response.json();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        return true;
      } else {
        setError('API isteği başarısız oldu');
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setError(`Hata: ${errorMsg}`);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    submitted,
    submitting,
    error,
    submitSelectedIds,
    clearError: () => setError(null),
  };
}
