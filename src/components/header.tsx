"use client";

import { Utensils, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FoodManage } from "@/components/ui/food-manage";
import { Cart } from "@/components/ui/cart";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full">
      <header className="header-container shadow-lg">
        <div className="container flex h-14 items-center justify-between mx-auto px-4 py-2">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 lg:space-x-3 group"
            >
              <div className="p-1.5 lg:p-2 rounded-xl header-logo-icon border-2">
                <Utensils className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <span className="font-bold text-xl lg:text-2xl header-logo-text">
                FoodOrder
              </span>
            </Link>

            {/* Navigation links - hidden on xl and below, visible on 2xl+ */}
            <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
              <Link
                href="/"
                className="text-sm font-medium header-nav-link py-2"
              >
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

          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Desktop buttons - hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2 lg:space-x-3">
              <FoodManage />
              <Cart onCartClick={onCartClick} />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu - moved outside header */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            {/* Mobile buttons section */}
            <div className="flex items-center justify-center space-x-4 pb-4 mb-4 border-b border-border/50">
              <FoodManage />
              <Cart
                onCartClick={() => {
                  onCartClick();
                  setMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/food-items"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Dishes
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
