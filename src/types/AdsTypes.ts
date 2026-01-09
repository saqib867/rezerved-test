import { Timestamp, GeoPoint } from "firebase/firestore";

export interface ReservationType {
  reservationID: string; // Unique ID for reservation
  description?: string;
  location?: string;
  locationGeoPoint?: GeoPoint;
  locationTag?: string;
  noOfGuests?: number;
  postApprovalStatus?: "approved" | "pending" | "rejected" | "inactive";
  postingDatetime?: Timestamp;
  price?: number;
  proofImages: string[]; // URLs of proof images
  reservationDatetime?: Timestamp;
  reservationImages: string[]; // URLs of reservation images
  availabilityStatus?: "sold" | "available"; // based on your example
  buyerID?: string; // optional, only if sold
  reserverName?: string;
  reserverID?: string;
  reserverEmail?: string;
  reserverProfilePic?: string;
  venue?: string;
}
