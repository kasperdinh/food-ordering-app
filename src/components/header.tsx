"use client";

import { Utensils } from "lucide-react";

import Link from "next/link";
import { FoodManage } from "@/components/ui/food-manage";
import { Cart } from "@/components/ui/cart";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full header-container shadow-lg">
      <div className="container flex h-18 items-center justify-between mx-auto px-4 py-2">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl header-logo-icon">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl header-logo-text">
              FoodOrder
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium header-nav-link py-2">
              Home
              <span className="header-nav-underline"></span>
            </Link>
            <Link
              href="/food-items"
              className="text-sm font-medium header-nav-link py-2"
            >
              All Dishes
              <span className="header-nav-underline"></span>
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium header-nav-link py-2"
            >
              About Us
              <span className="header-nav-underline"></span>
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium header-nav-link py-2"
            >
              Contact
              <span className="header-nav-underline"></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <FoodManage />
          <Cart onCartClick={onCartClick} />
        </div>
      </div>
    </header>
  );
}
