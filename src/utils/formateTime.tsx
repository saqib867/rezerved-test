import { format } from "date-fns";

export const formatTIme = (timestamp?: any) => {
  if (!timestamp) return "";

  const date = timestamp.toDate(); // Convert Firebase Timestamp → JS Date

  return format(date, "hh:mm a");
};
