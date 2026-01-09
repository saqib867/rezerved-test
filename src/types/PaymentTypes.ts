import { Timestamp } from "firebase/firestore";
import { StaticImageData } from "next/image";

export interface PaymentTypes {
  id: string;
  requestID: string;

  userID: string;
  userName: string;
  userEmail: string;
  userProfilePicURL: string;

  amount: number;
  status: string;

  accountHolderName: string;
  bankName: string;
  iban: string;
  swiftCode: string;

  dateTime: any;
}
