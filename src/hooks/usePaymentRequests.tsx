import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface PaymentRequest {
  id: string;
  [key: string]: any;
}

export function usePaymentRequests(status: string) {
  console.log("status => ", status);
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const buildQuery = (loadMore: boolean) => {
    const baseQuery =
      status !== "all"
        ? query(
            collection(db, "PaymentRequests"),
            where("status", "==", status),
            orderBy("dateTime", "desc")
          )
        : query(collection(db, "PaymentRequests"), orderBy("dateTime", "desc"));

    if (loadMore && lastDoc) {
      return query(baseQuery, startAfter(lastDoc), limit(10));
    }

    return query(baseQuery, limit(10));
  };

  const fetchRequests = async (loadMore = false) => {
    try {
      loadMore ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const q = buildQuery(loadMore);
      const snap = await getDocs(q);

      if (snap.empty) {
        setHasMore(false);
        return;
      }

      const result: PaymentRequest[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests((prev) => (loadMore ? [...prev, ...result] : result));

      setLastDoc(snap.docs[snap.docs.length - 1]);

      if (snap.docs.length < 10) setHasMore(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset when status changes
  useEffect(() => {
    setRequests([]);
    setLastDoc(null);
    setHasMore(true);
    fetchRequests(false);
  }, [status]);

  const loadMore = () => {
    if (!loadingMore && hasMore) fetchRequests(true);
  };

  return {
    requests,
    loading,
    loadingMore,
    error,
    loadMore,
    hasMore,
  };
}
