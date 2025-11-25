"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IProduct } from "@/types";
import { ShoppingCart, Star, Bolt, Wallet } from "lucide-react";
import Image from "next/image";
import { addProduct } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddProduct = (product: IProduct) => {
    console.log({ product });
    dispatch(addProduct(product));
    toast.success(`${product.name} added to cart 🛍️`);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 border border-white p-4 rounded-md my-5 bg-gray-50">
        {/* ========== LEFT : PRODUCT IMAGES ========== */}
        <div>
          <Image
            src={product?.images[0].url}
            alt="product image"
            width={500}
            height={500}
            className="rounded-md w-full object-cover h-80"
          />

          <div className="grid grid-cols-3 gap-4 mt-5">
            {product?.images.slice(0, 3).map((image, idx: number) => (
              <Image
                key={idx}
                src={image.url}
                alt={image.altText || "Product image"}
                width={500}
                height={500}
                className="rounded-md w-full object-cover h-40"
              />
            ))}
          </div>
        </div>

        {/* ========== RIGHT : PRODUCT DETAILS ========== */}
        <div className="bg-white rounded-md p-4">
          <h2 className="font-bold text-lg mb-4">{product?.name}</h2>

          <div className="my-5 text-gray-600">
            <p className="inline-block rounded-full px-4 py-3 font-bold text-sm bg-gray-100">
              {product?.stock > 0 ? "Stock Available" : "Out of Stock"}
            </p>
          </div>

          <hr />

          {/* Price Section */}
          <p className="my-2 font-bold">
            Price:{" "}
            {product?.offerPrice ? (
              <>
                <span className="font-semibold mr-2 text-orange-400">
                  ৳ {product?.offerPrice}
                </span>
                <del className="font-semibold text-xs">৳ {product?.price}</del>
              </>
            ) : (
              <span className="font-semibold">৳ {product?.price}</span>
            )}
          </p>

          <hr />

          <div className="">
            <Button
              onClick={() => handleAddProduct(product)}
              disabled={product?.stock === 0}
              size="sm"
              variant="outline"
              className="min-w-[120px] cursor-pointer w-full disabled:cursor-not-allowed hover:bg-gray-400 hover:text-white my-4"
            >
              <ShoppingCart /> Add to Cart
            </Button>

            <Button
              onClick={() => {
                handleAddProduct(product); // 1) Add to cart
                router.push("/cart"); // 2) Redirect
              }}
              disabled={product?.stock === 0}
              size="sm"
              variant="outline"
              className="min-w-[120px] cursor-pointer w-full disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white"
            >
              <Wallet className="mr-2" />
              Buy Now
            </Button>
          </div>

          <hr className="my-3 border-t-2 border-black" />

          {/* ========== PRODUCT ACCORDIONS ========== */}
          <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="features">
            {/* Key Features */}
            {product?.keyFeatures?.length > 0 && (
              <AccordionItem value="features">
                <AccordionTrigger>Key Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc ml-5 text-gray-600">
                    {product.keyFeatures.map((feat: string, i: number) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Specification Overview */}
            {product?.specification?.overview && (
              <AccordionItem value="overview">
                <AccordionTrigger>Overview</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.specification.overview}
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Usage */}
            {product?.specification?.usage && (
              <AccordionItem value="usage">
                <AccordionTrigger>Usage</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.specification.usage}
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Ingredients */}
            {product?.specification?.ingredients && (
              <AccordionItem value="ingredients">
                <AccordionTrigger>Ingredients</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.specification.ingredients}
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Fragrance */}
            {product?.specification?.fragrance && (
              <AccordionItem value="fragrance">
                <AccordionTrigger>Fragrance</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.specification.fragrance}
                </AccordionContent>
              </AccordionItem>
            )}

            {/* SEO Description */}
            {product?.seoDescription && (
              <AccordionItem value="seo">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.seoDescription}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
