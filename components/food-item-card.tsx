"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FoodItem } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface FoodItemCardProps {
  item: FoodItem
}

export function FoodItemCard({ item }: FoodItemCardProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image_url: item.image_url,
      },
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge variant="secondary">{item.preparation_time} min</Badge>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span className="text-2xl font-bold">${item.price}</span>
        <Button onClick={addToCart} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
