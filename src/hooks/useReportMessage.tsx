import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const useReportMessages = (reportId: string) => {
  const pageLimit = 10;

  const [messages, setMessages] = useState<any[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // ----------------------------
  // 1️⃣ Load First Page + Setup realtime listener ONLY for new messages
  // ----------------------------
  useEffect(() => {
    if (!reportId) return;

    const messagesRef = collection(db, "Reports", reportId, "Messages");

    const firstQuery = query(
      messagesRef,
      orderBy("createdOn", "asc"),
      limit(pageLimit)
    );

    let unsubscribeNew: any;

    const loadInitial = async () => {
      const snap = await getDocs(firstQuery);

      const initialMsgs = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setMessages(initialMsgs);

      const last = snap.docs[snap.docs.length - 1];
      setLastDoc(last);

      if (snap.docs.length < pageLimit) setHasMore(false);

      // --------------------------------
      // Real-time listener for NEW messages only
      // --------------------------------
      unsubscribeNew = onSnapshot(
        query(messagesRef, orderBy("createdOn", "asc")),
        (snapshot) => {
          const all = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          // only append messages that are NOT already in the list
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newOnes = all.filter((m) => !existingIds.has(m.id));
            return [...prev, ...newOnes];
          });
        }
      );
    };

    loadInitial();

    return () => {
      if (unsubscribeNew) unsubscribeNew();
    };
  }, [reportId]);

  // ----------------------------
  // 2️⃣ Pagination — load older messages when scrolling up
  // ----------------------------
  const loadMore = useCallback(async () => {
    if (!reportId || !hasMore || !lastDoc) return;

    const messagesRef = collection(db, "Reports", reportId, "Messages");

    const next = query(
      messagesRef,
      orderBy("createdOn", "asc"),
      startAfter(lastDoc),
      limit(pageLimit)
    );

    const snap = await getDocs(next);

    const olderMessages = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setMessages((prev) => [...olderMessages, ...prev]);

    if (snap.docs.length < pageLimit) setHasMore(false);

    const last = snap.docs[snap.docs.length - 1];
    if (last) setLastDoc(last);
  }, [reportId, lastDoc, hasMore]);

  return {
    messages,
    loadMore,
    hasMore,
  };
};
