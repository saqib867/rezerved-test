import { useEffect, useState } from "react";
import { collection, query, getCountFromServer } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface UseUsersCountReturn {
  count: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useUsersCount = (): UseUsersCountReturn => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const usersRef = collection(db, "Users");
        const q = query(usersRef);

        const snapshot = await getCountFromServer(q);
        setCount(snapshot.data().count);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user count");
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, isLoading, error };
};
