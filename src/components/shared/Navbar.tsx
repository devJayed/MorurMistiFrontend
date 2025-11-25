"use client";

import { Button } from "../ui/button";
import { Heart, LogOut, Menu, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import Logo from "@/assets/svgs/Logo";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const cartProducts = useAppSelector(orderedProductsSelector);
  const totalItems = cartProducts.reduce(
    (total, item) => total + item.orderQuantity,
    0
  );

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-100 border-b border-gray-400 z-1">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        {/* LOGO */}
        <div className="items-center py-2">
          <Link href="/" className="inline-block">
            <div className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-105">
              <Logo className="cursor-pointer" />
            </div>
          </Link>
        </div>
        <nav className="flex gap-3 items-center cursor-pointer">
          <Link href="/cart" className="relative">
            <Button
              variant="outline"
              className="rounded-full p-0 size-10 cursor-pointer transition-transform duration-200 hover:scale-115 hover:shadow-md hover:text-yellow-700"
            >
              <ShoppingBag />
            </Button>

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="cursor-pointer on-transform duration-200transiti hover:scale-115 hover:shadow-md rounded-full">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>My Shop</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer text-white"
                >
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
