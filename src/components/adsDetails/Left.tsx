"use client";
import Image from "next/image";
import CustomButton from "../reuseableComponents/CustomButton";
import { GoLocation } from "react-icons/go";
import { useReservationById } from "@/hooks/useReservationById";
import { useParams, useRouter } from "next/navigation";
import ImageCarousel from "../ImageCarousal";
import Swal from "sweetalert2";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState } from "react";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

const Left = () => {
  const { adsId } = useParams();
  const { isLoading, reservation } = useReservationById(adsId as string);
  const navigate = useRouter();
  const [updatedReservation, setUpdatedReservation] = useState(false);
  const { user } = useAuthStore((state) => state);

  console.log("single reservation => ", reservation);

  const hanldeDeactivation = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will deactivate the reservation.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deactivate",
      });
      if (result.isConfirmed) {
        await updateDoc(doc(db, "Reservations", id), {
          postApprovalStatus: "rejected",
        });
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reservation has been deactivated",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };

  const hanldeActivate = async (id: string) => {
    try {
      setUpdatedReservation(true);
      await updateDoc(doc(db, "Reservations", id), {
        postApprovalStatus: "approved",
      });
      const date = reservation?.reservationDatetime?.toDate();
      const formateDate = format(date!, "dd MMM yyyy h:mm a");
      const descripttion = `Congragulation! Your Reservation for ${reservation?.venue} at ${formateDate} has been approved by admin`;
      const datetime = Timestamp.now();

      const notificationType = "reservationApproved";
      const receiverUID = reservation?.reserverID;
      const senderUID = user?.uid;
      const title = "Reservation Approved";
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
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setUpdatedReservation(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the reservation.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete",
      });
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "Reservations", id));
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reservation has been deleted",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate.back();
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-5 flex-1 p-6 rounded-[16px] border border-[#FFFFFF0D] bg-[#081028]">
      {updatedReservation && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-[16px]">
          <BiLoader className="animate-spin text-white text-4xl" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-textColor text-[16px]">
            ${reservation?.price}
          </p>
          <p className="font-bold text-textColor text-[24px]">
            {reservation?.venue}
          </p>
          <div className="flex items-center gap-1">
            <GoLocation className="w-[14px] h-[14px] text-[#BFBFBF]" />
            <p className="font-normal text-[#959595] text-[12px]">
              {reservation?.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {reservation?.postApprovalStatus == "approved" && (
            <button
              onClick={() => hanldeDeactivation(reservation?.reservationID!)}
              className="bg-white rounded-full text-black py-2 px-3"
            >
              Deactivate
            </button>
          )}
          {reservation?.postApprovalStatus == "pending" && (
            <button
              onClick={() => hanldeActivate(reservation?.reservationID!)}
              className="bg-white rounded-full text-black py-2 px-3"
            >
              Activate
            </button>
          )}
          {reservation?.postApprovalStatus == "rejected" && (
            <button
              onClick={() => hanldeActivate(reservation?.reservationID!)}
              className="bg-white rounded-full text-black py-2 px-3"
            >
              Activate
            </button>
          )}
          <button
            onClick={() => handleDelete(reservation?.reservationID!)}
            className="bg-red-500 text-white rounded-full py-2 px-3"
          >
            Delete
          </button>
        </div>
      </div>

      {reservation && <ImageCarousel slides={reservation?.proofImages} />}
    </div>
  );
};

export default Left;
