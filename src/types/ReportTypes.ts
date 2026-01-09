export interface ReportType {
  id: string;
  reportID: string;
  reporterName: string;
  reporterUID: string;
  reportStatus: string;
  subject: string;
  description: string;
  reportCreationDT: any; // Firestore Timestamp
  lastMessage: string;
  lastMessageDateTime: any; // Timestamp
  lastMessageSenderID: string;
}
