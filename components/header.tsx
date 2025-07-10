"use client";

import { Utensils } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { FoodManage } from "@/components/ui/food-manage";
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
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6" />
            <span className="font-bold text-xl">FoodOrder</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/food-items"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              All Dishes
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <FoodManage />

          <Cart onCartClick={onCartClick} />
        </div>
      </div>
    </header>
  );
}
