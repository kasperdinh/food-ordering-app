"use client";

import { Utensils } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { AddNew } from "@/components/ui/add-new";
import { Cart } from "@/components/ui/cart";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6" />
          <span className="font-bold text-xl">FoodOrder</span>
        </Link>

        <div className="flex items-center space-x-2">
          <AddNew />

          <Cart onCartClick={onCartClick} />
        </div>
      </div>
    </header>
  );
}
