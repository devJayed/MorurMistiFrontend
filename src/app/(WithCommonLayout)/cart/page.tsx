"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";

export const dynamic = "force-dynamic";

const CartPage = () => {
  const [open, setOpen] = useState(false);

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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Complete Your Order (Cash on Delivery)
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Section */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-semibold text-lg">Order Items</h2>
              <CartProducts />
            </div>

            {/* Right Section */}
            <div className="lg:col-span-5 space-y-6">
              <Address />
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
