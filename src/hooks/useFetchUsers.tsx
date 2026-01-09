import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { User } from "@/types/UserTypes";

export function useFetchUsers(searchTerm: string, pageSize = 10, tab: string) {
  console.log("tab ==> ", tab);
  const [users, setUsers] = useState<User[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset pagination on new search or new tab
  useEffect(() => {
    setUsers([]);
    setLastDoc(null);
    setHasMore(true);
  }, [debouncedSearch, tab]);

  const fetchUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const colRef = collection(db, "Users");
      const constraints: any[] = [];

      // -------------------------------------
      // 🔍 SEARCH MODE
      // -------------------------------------
      if (debouncedSearch.trim() !== "") {
        const search = debouncedSearch.trim();

        // Order must come BEFORE the where range filters
        constraints.push(orderBy("fullName", "asc"));
        constraints.push(where("fullName", ">=", search));
        constraints.push(where("fullName", "<=", search + "\uf8ff"));
      }

      // -------------------------------------
      // 🟦 TAB FILTERING (NO SEARCH)
      // -------------------------------------
      else {
        if (tab === "active") {
          constraints.push(where("isSuspended", "==", false));
        } else if (tab === "suspended") {
          constraints.push(where("isSuspended", "==", true));
        }

        // Always keep ordering consistent
        constraints.push(orderBy("fullName", "asc"));
      }

      // Pagination
      if (lastDoc) constraints.push(startAfter(lastDoc));
      constraints.push(limit(pageSize));

      const q = query(colRef, ...constraints);
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHasMore(false);
        return;
      }

      const newUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers((prev) => [...prev, ...newUsers]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      if (snapshot.docs.length < pageSize) setHasMore(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on search or tab change
  useEffect(() => {
    if (!hasMore) return;
    fetchUsers();
  }, [hasMore, debouncedSearch, tab]);

  return {
    users,
    loading,
    hasMore,
    fetchUsers,
  };
}
