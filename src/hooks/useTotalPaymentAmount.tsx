import { useEffect, useState } from "react";
import {
  collection,
  query,
  getAggregateFromServer,
  sum,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface UseTotalPaymentAmountReturn {
  totalAmount: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useTotalPaymentAmount = (): UseTotalPaymentAmountReturn => {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const ref = collection(db, "PaymentRequests");
        const q = query(ref);

        const agg = await getAggregateFromServer(q, { total: sum("amount") });

        setTotalAmount(agg.data().total ?? 0);
      } catch (err: any) {
        setError(err.message || "Failed to calculate total amount");
        setTotalAmount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return { totalAmount, isLoading, error };
};
