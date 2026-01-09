import { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { capitalize } from "@/utils/capitilize";

export interface Reservation {
  id: string;
  customerName: string;
  status: "approved" | "rejected" | "pending";
  postingDatetime: any;
  [key: string]: any;
}

interface UseReservationsReturn {
  reservations: Reservation[];
  isLoading: boolean;

  loadMore: () => void;
  hasMore: boolean;
}

export const useReservations = ({
  status,
  search,
}: any): UseReservationsReturn => {
  const pageLimit = 10;

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const mounted = useRef(false);

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(capitalize(search.trim()));
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // Main fetch function
  const fetchReservations = useCallback(
    async (reset: boolean = false) => {
      if (isLoading || (!hasMore && !reset)) return;

      setIsLoading(true);

      try {
        const baseRef = collection(db, "Reservations");

        const filters: any[] = [];

        if (status !== "all") {
          filters.push(where("postApprovalStatus", "==", status));
        }

        if (debouncedSearch) {
          filters.push(where("reserverName", ">=", debouncedSearch));
          filters.push(where("reserverName", "<=", debouncedSearch + "\uf8ff"));
        }

        // Build base query
        let q = query(
          baseRef,
          ...filters,
          orderBy("postingDatetime"),
          limit(pageLimit)
        );

        if (!reset && lastDoc) {
          q = query(
            baseRef,
            ...filters,
            orderBy("postingDatetime"),
            startAfter(lastDoc),
            limit(pageLimit)
          );
        }

        const snap = await getDocs(q);

        const fetchedData = snap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Reservation)
        );

        setReservations((prev) =>
          reset ? fetchedData : [...prev, ...fetchedData]
        );

        if (snap.docs.length < pageLimit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (snap.docs.length > 0) {
          setLastDoc(snap.docs[snap.docs.length - 1]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [status, debouncedSearch, lastDoc, hasMore, isLoading]
  );

  // Trigger fetch on filter change (status/search)
  useEffect(() => {
    // When user navigates back, avoid double first run
    if (!mounted.current) {
      mounted.current = true;
      fetchReservations(true);
      return;
    }

    setReservations([]);
    setLastDoc(null);
    setHasMore(true);
    fetchReservations(true);
  }, [status, debouncedSearch]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchReservations(false);
    }
  };

  return {
    reservations,
    isLoading,

    loadMore,
    hasMore,
  };
};
