import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface ReservationData {
  id: string;
  [key: string]: any;
}

export function useFetchListings(reservationId: string | null) {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchReservation = async (isLoadMore = false) => {
    try {
      if (!reservationId) return;

      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError(null);

      let q = query(
        collection(db, "Reservations"),
        where("reserverID", "==", "qNPaaRcdcicj19HIuJrn91yN6Mg1"),
        limit(10)
      );

      if (lastDoc) {
        q = query(
          collection(db, "Reservations"),
          where("reserverID", "==", "qNPaaRcdcicj19HIuJrn91yN6Mg1"),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const snap = await getDocs(q);

      if (snap.empty) {
        setHasMore(false);
        return;
      }

      const results: ReservationData[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReservations((prev) => [...prev, ...results]);
      setLastDoc(snap.docs[snap.docs.length - 1]);

      if (snap.docs.length < 10) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load first batch
  useEffect(() => {
    if (!reservationId) return;
    setReservations([]);
    setLastDoc(null);
    setHasMore(true);
    fetchReservation(false);
  }, [reservationId]);

  // Expose loadMore function for UI
  const loadMore = () => {
    if (!loadingMore && hasMore) fetchReservation(true);
  };

  return { reservations, loading, loadingMore, error, loadMore, hasMore };
}
