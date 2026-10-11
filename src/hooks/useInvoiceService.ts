import { useMemo } from 'react';
import { useAuthContext } from '../context/AuthContext';
import InvoiceService from '../services/InvoiceService';

export default function useInvoiceService() {
  const { auth } = useAuthContext();
  return useMemo(
    () => new InvoiceService(auth?.accessToken ?? ''),
    [auth?.accessToken]
  );
}
