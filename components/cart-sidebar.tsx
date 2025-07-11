"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import { CheckoutForm } from "./checkout-form";
import Image from "next/image";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  if (showCheckout) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
          </SheetHeader>
          <CheckoutForm
            onBack={() => setShowCheckout(false)}
            onSuccess={() => {
              setShowCheckout(false);
              onOpenChange(false);
            }}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-background border-l border-border/50">
        <SheetHeader className="border-b border-border/20 pb-4">
          <SheetTitle className="text-foreground">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 overflow-y-auto py-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-primary/50 mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground/60 mt-2">
                  Add some delicious items to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-border/30 pb-4 group"
                  >
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg border border-border/20"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="mt-auto border-t border-border/20 pt-4 space-y-4 bg-gradient-to-t from-secondary/20 to-transparent">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total: </span>
                <span className="text-primary">${state.total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
