import { PaymentTypes } from "@/types/PaymentTypes";
import Modal from "../reuseableComponents/CustomModal";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa6";
import Image from "next/image";
import BankInfoCard from "./BankInfoCard";
import CustomButton from "../reuseableComponents/CustomButton";
import {
  collection,
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { close } from "fs";

interface PaymentReqModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  payment: PaymentTypes | null;
}
const PaymentReqModal = ({
  isModalOpen,
  handleCloseModal,
  payment,
}: PaymentReqModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  // update payment type

  console.log("payment details => ", payment);
  const markPaymentRequestAsPaid = async (id: string) => {
    try {
      setSubmitting(true);
      const ref = doc(db, "PaymentRequests", id);
      const userRef = doc(db, "Users", payment!.userID);

      await updateDoc(ref, {
        status: "paid",
        dateTime: new Date(), // optional: update completion time
      });

      await updateDoc(userRef, {
        currentRequestedAmount: increment(-payment!.amount),
        pendingClearance: increment(-payment!.amount),
      });

      // const date = payment?.dateTime?.toDate();
      // const formateDate = format(date!, "dd MMM yyyy h:mm a");
      const descripttion = `Payment request for $${payment?.amount} has been approved by admin`;
      const datetime = Timestamp.now();

      const notificationType = "paymentApproved";
      const receiverUID = payment?.userID;
      const senderUID = "admin";
      const title = "Payment Request Approved";
      const docRef = doc(collection(db, "Notifications"));
      const docId = docRef.id;

      // Save the document with its own ID
      await setDoc(docRef, {
        id: docId, // save ID inside the doc
        senderUID: senderUID,
        receiverUID: receiverUID,
        notificationType: notificationType,
        title: title,
        description: descripttion,
        datetime: datetime,
        isRead: false,
        notificationID: docId,
      });

      handleCloseModal();

      toast.success("User has been paid");
    } catch (error) {
      console.error("Failed to update status:", error);
      return { success: false, error };
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelAmount = async (id: string) => {
    const ref = doc(db, "PaymentRequests", id);
    const userRef = doc(db, "Users", payment!.userID);
    await updateDoc(userRef, {
      currentRequestedAmount: increment(-payment!.amount),
    });
    await updateDoc(ref, {
      status: "rejected",
      dateTime: new Date(), // optional: update completion time
    });
    const descripttion = `Payment request for $${payment?.amount} has been rejected by admin`;
    const datetime = Timestamp.now();

    const notificationType = "paymentRejected";
    const receiverUID = payment?.userID;
    const senderUID = "admin";
    const title = "Payment Request Rejected";
    const docRef = doc(collection(db, "Notifications"));
    const docId = docRef.id;

    // Save the document with its own ID
    await setDoc(docRef, {
      id: docId, // save ID inside the doc
      senderUID: senderUID,
      receiverUID: receiverUID,
      notificationType: notificationType,
      title: title,
      description: descripttion,
      datetime: datetime,
      isRead: false,
      notificationID: docId,
    });
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Payment Details"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-4 border border-[#FFFFFF0D] rounded-[16px]">
          <div className="flex items-center gap-2">
            <Image
              src={payment?.userProfilePicURL!}
              alt={payment?.userName!}
              width={42}
              height={42}
              className="rounded-[12px]"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[#959595] text-[18px]">
                {payment?.userName}
              </p>
              <p className="text-[#959595] text-[12px]">{payment?.userName}</p>
            </div>
          </div>
          <Link
            href=""
            className="text-[14px] font-regular text-textColor underline flex items-center gap-2 justify-center col-span-1"
          >
            View Detail
            <FaArrowUp className="w-[10px] h-[10px] rotate-45" />
          </Link>{" "}
        </div>
        <BankInfoCard
          title="Account Holder Name"
          value={payment?.accountHolderName || ""}
        />
        <BankInfoCard title="Bank Name" value={payment?.bankName!} />
        <BankInfoCard title="swipe code" value={payment?.swiftCode!} />
        <BankInfoCard title="IBAN" value={payment?.iban!} />
      </div>
      {submitting ? (
        <div className="flex items-center justify-center">
          <BiLoader className="animate-spin" size={25} />
        </div>
      ) : (
        payment?.status == "pending" && (
          <div className="flex justify-between gap-4 h-[54px]">
            <CustomButton
              width="50%"
              bgColor="#FB1B1B"
              textColor="#F8F8F8"
              radius="32px"
              text="Close"
              onClick={() => handleCancelAmount(payment?.requestID!)}
            />
            <button
              onClick={() => markPaymentRequestAsPaid(payment?.requestID!)}
              className="bg-green-600 w-[50%] text-white p-3 rounded-full"
            >
              Pay
            </button>
          </div>
        )
      )}
    </Modal>
  );
};

export default PaymentReqModal;
