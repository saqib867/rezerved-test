import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const useSingleReport = (id: string) => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "Reports", id);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setReport({ id: docSnap.id, ...docSnap.data() });
          setError("");
        } else {
          setError("Report not found");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to fetch report");
        setLoading(false);
      }
    );

    // cleanup listener on unmount
    return () => unsubscribe();
  }, [id]);

  return { report, loading, error };
};
