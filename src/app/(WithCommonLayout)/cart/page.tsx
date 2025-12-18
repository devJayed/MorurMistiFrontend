"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, MapPinPlus } from "lucide-react";
import { updateMobile, updateName, updateShippingAddress } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

export const dynamic = "force-dynamic";

const CartPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleName = (name: string) => {
    dispatch(updateName(name));
  };
  const handleMobile = (mobile: string) => {
    dispatch(updateMobile(mobile));
  };
  const handleEmail = (email: string) => {
    dispatch(updateMobile(email));
  };
  const handleShippingAddress = (shippingAddress: string) => {
    dispatch(updateShippingAddress(shippingAddress));
  };

  return (
    <>
      <NMContainer>
        <div className="mt-2 sm:mt-4">
          <ProductBanner title="Cart Page" path="Home - Cart" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
          {/* Left Section – Only Cart Products */}
          <div className="lg:col-span-8 space-y-6">
            <CartProducts />

            {/* Cash on Delivery Button */}
            <Button
              variant="default"
              className="w-full py-6 text-lg font-semibold"
              onClick={() => setOpen(true)}
            >
              Cash on Delivery
            </Button>
          </div>
        </div>
      </NMContainer>

      {/* Cash on Delivery (COD) Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[98vw] sm:w-[96vw] md:w-[94] max-w-none h-[95vh] max-h-none overflow-y-auto transition-all duration-300"
        >
          <DialogHeader>
            <DialogTitle className="sm:text-2xl text-lg font-bold flex items-center  justify-center">
              ক্যাশ অন ডেলিভারি
            </DialogTitle>
          </DialogHeader>

          {/* Basic info starts  */}
          <div className="space-y-6 w-full max-w-lg">
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                আপনার নাম <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600 ">
                <div className="bg-gray-300 h-full px-4 py-3 flex items-center justify-center">
                  <User className="w-5 h-5 " />
                </div>
                <Input
                  placeholder="আপনার নাম"
                  className="border-none focus-visible:ring-0"
                  onChange={(e) => handleName(e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600">
                <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
                  <Phone className="w-5 h-5" />
                </div>
                <Input
                  placeholder="মোবাইল নম্বর"
                  className="border-none focus-visible:ring-0"
                   onChange={(e) => handleMobile(e.target.value)}
                />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                ইমেইল <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600">
                <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
                  <Phone className="w-5 h-5" />
                </div>
                <Input
                  placeholder="ইমেইল"
                  className="border-none focus-visible:ring-0"
                   onChange={(e) => handleEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label className="font-bold text-lg">
                শিপিং এড্রেস <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600 ">
                <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
                  <MapPinPlus className="w-5 h-5" />
                </div>
                <Input
                  placeholder="কোথায় ডেলিভারি নিবেন?"
                  className="border-none focus-visible:ring-0"
                   onChange={(e) => handleShippingAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Address Shipping Charge Selection  */}
            <div>
              <Address />
            </div>
          </div>

          {/* Basic info ends  */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Section */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-semibold text-lg">Order Items</h2>
              <CartProducts />
            </div>

            {/* Right Section */}
            <div className="lg:col-span-5 space-y-6">
              {/* <Address /> */}
              <Coupon />
              <PaymentDetails />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartPage;
