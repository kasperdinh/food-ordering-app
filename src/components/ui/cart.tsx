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
      className="cart-button"
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge variant="destructive" className="cart-badge">
          {itemCount}
        </Badge>
      )}
      <span className="ml-2">${state.total.toFixed(2)}</span>
    </Button>
  );
}
