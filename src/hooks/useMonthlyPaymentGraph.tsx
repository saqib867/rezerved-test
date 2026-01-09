import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { format } from "date-fns";

interface PaymentRequest {
  amount: number;
  dateTime: Timestamp;
}

interface MonthlyPayment {
  month: string; // "Jan"
  revenue: number;
}

export const useMonthlyPaymentGraph = () => {
  const [data, setData] = useState<MonthlyPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const currentYear = new Date().getFullYear();

        const snapshot = await getDocs(collection(db, "PaymentRequests"));
        const payments = snapshot.docs.map(
          (doc) => doc.data() as PaymentRequest
        );

        // Initialize map for all 12 months
        const monthlyMap: Record<string, number> = {};
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

        monthNames.forEach((m) => (monthlyMap[m] = 0));

        // Aggregate values for the current year only
        payments.forEach((p) => {
          const date = p.dateTime.toDate();
          if (date.getFullYear() === currentYear) {
            const month = format(date, "MMM"); // Jan, Feb, ...
            monthlyMap[month] += p.amount;
          }
        });

        // Convert to array for graph
        const monthlyData: MonthlyPayment[] = monthNames.map((month) => ({
          month,
          revenue: monthlyMap[month],
        }));

        setData(monthlyData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch payments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { data, isLoading, error };
};
