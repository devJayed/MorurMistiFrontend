"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toJpeg } from "html-to-image";
import { useRef } from "react";

interface OrderSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  orderData: any;
}

export default function OrderSuccessDialog({
  open,
  onClose,
  orderData,
}: OrderSuccessDialogProps) {
  const router = useRouter();
  const popupRef = useRef<HTMLDivElement>(null); // ✅ hook inside component

  if (!orderData) return null;

  const {
    orderId,
    name,
    mobile,
    products,
    finalAmount,
    shippingAddress,
    paymentStatus,
  } = orderData;

  const handleSaveAndClose = async () => {
    if (!popupRef.current) return;

    try {
      const dataUrl = await toJpeg(popupRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `order-success-${orderId}.jpg`;
      link.click();

      onClose();
      router.push("/");
    } catch (error) {
      console.error("Image save failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-lg
          max-h-[90vh]
          overflow-y-auto
          overflow-x-hidden
          text-center
          p-4
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
        "
      >
        {/* 🔹 Capture Area */}
        <div
          ref={popupRef}
          className="w-full px-2 pt-4 pb-2 space-y-3 bg-white text-center"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">
              🎉 অভিনন্দন! 🎉
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-700 text-sm">
            প্রিয় <span className="font-semibold">{name}</span>, আপনার অর্ডারটি
            সফলভাবে গ্রহণ করা হয়েছে।
          </p>

          <div className="w-3/4 h-px bg-gray-200 mx-auto" />

          {/* Order Info */}
          <div className="space-y-1 text-sm">
            <p className="flex justify-center gap-2 flex-wrap">
              <span className="font-semibold">অর্ডার আইডিঃ</span>
              <span className="border border-green-500 text-green-700 bg-green-50 px-3 py-1 rounded-md font-bold">
                {orderId}
              </span>
            </p>

            <p>
              <span className="font-semibold">পেমেন্ট স্ট্যাটাসঃ </span>
              <span
                className={`font-medium ${
                  paymentStatus === "Paid"
                    ? "text-green-600"
                    : paymentStatus === "Pending"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>

            <p>
              <span className="font-semibold">সর্বমোটঃ </span>
              <span className="text-green-600 font-bold">৳{finalAmount}</span>
            </p>
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Products */}
          <div>
            <p className="font-semibold text-sm">🛍️ অর্ডারকৃত পণ্যসমূহ</p>
            <ol className="list-decimal list-inside text-left text-sm max-h-32 overflow-y-auto px-4">
              {products?.map((item: any, i: number) => (
                <li key={i} className="border-b last:border-none pb-1">
                  {item.quantity} × {item.product?.name}
                </li>
              ))}
            </ol>
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Customer Info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">কাস্টমারঃ </span>
              {name}
            </p>
            <p>
              <span className="font-semibold">মোবাইলঃ </span>
              {mobile}
            </p>
            <p>
              <span className="font-semibold">ডেলিভারি স্থানঃ </span>
              {shippingAddress}
            </p>
          </div>

          <p className="text-xs italic text-gray-500">
            আমাদের ডেলিভারি টিম অতি দ্রুত আপনার সঙ্গে যোগাযোগ করবে।
          </p>
        </div>

        {/* 🔹 Action Button */}
        <Button
          onClick={handleSaveAndClose}
          className="w-full font-medium mt-3"
        >
          অর্ডার সেভ করুণ
        </Button>
      </DialogContent>
    </Dialog>
  );
}
