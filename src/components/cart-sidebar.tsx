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
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-b from-background to-background/95 border-l border-border/50 backdrop-blur-xl">
        <SheetHeader className="border-b border-orange-200 pb-6">
          <SheetTitle className="text-foreground text-xl font-semibold flex items-center space-x-2">
            <div className="p-2 rounded-lg footer-logo-icon">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span>Your Cart</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 overflow-y-auto py-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="p-6 rounded-full bg-gradient-to-r from-orange-50 to-orange-100">
                  <ShoppingBag className="h-16 w-16 cart-empty-icon" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Discover amazing dishes and add them to your cart to get
                    started!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-orange-300 transition-all duration-300 group hover:shadow-lg"
                  >
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover cart-item-image border-2 border-border/20 group-hover:border-orange-300 transition-all duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} each
                      </p>
                      <p className="text-xs text-orange-500 font-medium">
                        ${(item.price * item.quantity).toFixed(2)} total
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-background/50 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-green-50 hover:text-green-500"
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
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="mt-auto border-t border-orange-200 pt-6 space-y-4 bg-gradient-to-t from-orange-50 to-transparent rounded-t-xl">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Subtotal (
                    {state.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-border/30 pt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-orange-600">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold rounded-xl"
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
