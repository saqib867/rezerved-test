import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ReservationType } from "@/types/AdsTypes";
import { db } from "@/firebase/firebase";

interface UseReservationByIdReturn {
  reservation: ReservationType | null;
  isLoading: boolean;
  error: string | null;
}

export const useReservationById = (
  reservationID: string
): UseReservationByIdReturn => {
  const [reservation, setReservation] = useState<ReservationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reservationID) return;

    setIsLoading(true);
    setError(null);

    const docRef = doc(db, "Reservations", reservationID);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setReservation(snapshot.data() as ReservationType);
          setError(null);
        } else {
          setReservation(null);
          setError("Reservation not found");
        }
        setIsLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to fetch reservation");
        setReservation(null);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [reservationID]);

  return { reservation, isLoading, error };
};
