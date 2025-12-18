"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { cities } from "@/constants/cities";
import {
  citySelector,
  shippingAddressSelector,
  updateName,
  updateCity,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Address() {
  const dispatch = useAppDispatch();
  // const selectedCity = useAppSelector(citySelector);
  // const shippingAddress = useAppSelector(shippingAddressSelector);

  // const handleName = (address: string) => {
  //   dispatch(updateName(address));
  // };

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  // const handleShippingAddress = (address: string) => {
  //   dispatch(updateShippingAddress(address));
  // };

  return (
    <div className="">
      <h1 className="font-bold text-lg">শিপিং অ্যাড্রেস</h1>

      {/* City Select */}
      <div className="mb-5">
        <Select onValueChange={handleCitySelect}>
          <SelectTrigger id="city" className="w-full">
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
