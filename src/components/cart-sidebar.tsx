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
        <SheetContent className="w-full sm:max-w-lg cart-sidebar">
          <SheetHeader className="cart-sidebar-header pb-6">
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
      <SheetContent className="w-full sm:max-w-lg cart-sidebar">
        <SheetHeader className="cart-sidebar-header pb-6">
          <SheetTitle className="text-foreground text-xl font-semibold flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-foreground">
              <ShoppingBag className="h-5 w-5 text-background" />
            </div>
            <span>Your Cart</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-6rem)]">
          <div className="flex-1 overflow-y-auto py-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="empty-cart-icon">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
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
                    className="cart-item flex items-center space-x-4 p-4 rounded-xl"
                  >
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover cart-item-image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} each
                      </p>
                      <p className="text-xs text-foreground font-medium">
                        ${(item.price * item.quantity).toFixed(2)} total
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="quantity-control flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="quantity-button"
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
                          className="quantity-button"
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
                        className="remove-button"
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
            <div className="mt-auto cart-sidebar-footer space-y-4">
              <div className="total-section space-y-2">
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
                  <span className="text-foreground">Free</span>
                </div>
                <div className="total-divider"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="checkout-button w-full"
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
