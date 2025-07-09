"use client"

import { ShoppingCart, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface HeaderProps {
  onCartClick: () => void
}

export function Header({ onCartClick }: HeaderProps) {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6" />
          <span className="font-bold text-xl">FoodOrder</span>
        </Link>

        <Button variant="outline" size="sm" onClick={onCartClick} className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
          <span className="ml-2">${state.total.toFixed(2)}</span>
        </Button>
      </div>
    </header>
  )
}
