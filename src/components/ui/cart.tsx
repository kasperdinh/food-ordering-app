"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface CartProps {
  onCartClick: () => void;
}

export function Cart({ onCartClick }: CartProps) {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onCartClick}
      className="cart-button h-9 px-2 sm:px-3 lg:px-4 relative"
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="cart-badge absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
        >
          {itemCount}
        </Badge>
      )}
      <span className="ml-1 sm:ml-2 text-sm">
        <span className="hidden sm:inline">$</span>
        <span className="sm:hidden">$</span>
        {state.total.toFixed(2)}
      </span>
    </Button>
  );
}
