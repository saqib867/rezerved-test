"use client";
import PaymentTableCard from "@/components/payments/PaymentTableCard";
import PaymentTableHeader from "@/components/payments/PaymentTableHeader";
import PaymentTableTopSection from "@/components/payments/PaymentTableTopSection";
import { paymentData } from "@/constants";
import { PaymentTypes } from "@/types/PaymentTypes";
import { useState } from "react";
import PaymentReqModal from "@/components/payments/PaymentReqModal";
import { usePaymentRequests } from "@/hooks/usePaymentRequests";

const Payments = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentTypes | null>(
    null
  );

  const [status, setStatus] = useState<"pending" | "paid" | "denied" | "all">(
    "all"
  );

  const { error, hasMore, loadMore, loading, requests } =
    usePaymentRequests(status);
  console.log("payment requests => ", requests);

  const handleViewDetail = (payment: PaymentTypes) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="h-[792px] min-h-[792px] flex flex-col  gap-5 rounded-[16px]">
      <PaymentTableTopSection setStatus={setStatus} status={status} />
      <div className="flex flex-col gap-[14px] min-w-[600px] overflow-x-auto sm:overflow-hidden">
        <PaymentTableHeader />
        <div className="flex flex-col gap-4 overflow-x-auto">
          {requests?.map((item: any, i) => (
            <PaymentTableCard
              key={i}
              item={item}
              onViewDetail={() => handleViewDetail(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Payment Details */}
      {isModalOpen && selectedPayment && (
        <PaymentReqModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          payment={selectedPayment}
        />
      )}
    </div>
  );
};

export default Payments;
