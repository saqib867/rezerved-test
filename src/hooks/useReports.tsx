import { useState, useEffect, useCallback } from "react";
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

export interface Report {
  id: string;
  reporterName: string;
  status: any;
  reportCreationDT: any; // Firestore Timestamp
  [key: string]: any;
}

export const useReports = ({ status, search }: any) => {
  const pageLimit = 10;

  console.log("report status => ", status);

  const [reports, setReports] = useState<Report[]>([]);

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 🔹 Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setLastDoc(null);
      setReports([]);
      setHasMore(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 Fetch Reports
  const fetchReports = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setReports([]);

    const baseRef = collection(db, "Reports");
    const filters: any[] = [];

    // Status filtering
    if (status !== "all") filters.push(where("reportStatus", "==", status));

    // Name search filter
    if (debouncedSearch) {
      filters.push(
        where("reporterName", ">=", capitalize(debouncedSearch)),
        where("reporterName", "<=", capitalize(debouncedSearch) + "\uf8ff")
      );
    }

    let q = query(
      baseRef,
      ...filters,
      orderBy("reportCreationDT"),
      limit(pageLimit)
    );

    if (lastDoc) {
      q = query(
        baseRef,
        ...filters,
        orderBy("reportCreationDT"),
        startAfter(lastDoc),
        limit(pageLimit)
      );
    }

    const snapshot = await getDocs(q);

    const newReports = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Report)
    );

    setReports((prev) => [...prev, ...newReports]);

    if (snapshot.docs.length < pageLimit) setHasMore(false);
    if (snapshot.docs.length > 0)
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

    setIsLoading(false);
  }, [status, debouncedSearch, lastDoc, hasMore, isLoading]);

  // 🔹 Refetch when status or search changes
  useEffect(() => {
    setLastDoc(null);
    setHasMore(true);
    fetchReports();
  }, [status, debouncedSearch, reports.length]);

  return {
    reports,
    isLoading,

    loadMore: fetchReports,
    hasMore,
  };
};
