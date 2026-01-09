import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { User } from "@/types/UserTypes";

export function useFetchUserById(id?: string, realtime = false) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "Users", id);

    // -----------------------
    // 🔄 REALTIME LISTENER
    // -----------------------
    if (realtime) {
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setUser(null);
            setError("User not found");
          } else {
            setUser({ id: snapshot.id, ...snapshot.data() } as User);
          }
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }

    // -----------------------
    // 🔎 ONE-TIME FETCH
    // -----------------------
    const fetchUser = async () => {
      try {
        setLoading(true);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          setUser(null);
          setError("User not found");
        } else {
          setUser({ id: snapshot.id, ...snapshot.data() } as User);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, realtime]);

  return {
    user,
    loading,
    error,
  };
}
