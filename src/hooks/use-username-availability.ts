import { authClient } from '@/lib/auth-client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseUsernameAvailabilityOptions {
  debounceMs?: number;
}

export function useUsernameAvailability({ debounceMs = 400 }: UseUsernameAvailabilityOptions = {}) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const requestIdRef = useRef(0);

  const checkUsername = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      const myRequestId = ++requestIdRef.current;

      if (!value) {
        setAvailable(null);
        setCheckError(null);
        setChecking(false);
        return;
      }

      setAvailable(null);
      setCheckError(null);

      debounceRef.current = setTimeout(async () => {
        setChecking(true);
        try {
          const res = await authClient.isUsernameAvailable({ username: value });
          if (myRequestId !== requestIdRef.current) return;
          setAvailable(res.data?.available ?? null);
        } catch {
          if (myRequestId !== requestIdRef.current) return;
          setAvailable(null);
          setCheckError('Gagal memeriksa ketersediaan username');
        } finally {
          if (myRequestId === requestIdRef.current) setChecking(false);
        }
      }, debounceMs);
    },
    [debounceMs],
  );

  const reset = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    requestIdRef.current += 1;
    setAvailable(null);
    setCheckError(null);
    setChecking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      requestIdRef.current += 1;
    };
  }, []);

  return { checking, available, checkError, checkUsername, reset };
}
