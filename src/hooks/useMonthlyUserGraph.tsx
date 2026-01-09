import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { format } from "date-fns";

interface User {
  createdAt: Timestamp;
}

interface MonthlyUserRegistration {
  month: string; // Jan, Feb, ...
  count: number;
}

export const useMonthlyUserRegistrations = () => {
  const [data, setData] = useState<MonthlyUserRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const currentYear = new Date().getFullYear();

        const snapshot = await getDocs(collection(db, "Users"));
        const users = snapshot.docs.map((doc) => doc.data() as User);

        // Initialize map for all 12 months
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const monthlyMap: Record<string, number> = {};
        monthNames.forEach((m) => (monthlyMap[m] = 0));

        // Aggregate users per month for the current year
        users.forEach((u) => {
          if (u.createdAt) {
            const date = u.createdAt.toDate();
            if (date.getFullYear() === currentYear) {
              const month = format(date, "MMM");
              monthlyMap[month] += 1;
            }
          }
        });

        // Convert to array for graph
        const monthlyData: MonthlyUserRegistration[] = monthNames.map(
          (month) => ({
            month,
            count: monthlyMap[month],
          })
        );

        setData(monthlyData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { data, isLoading, error };
};
