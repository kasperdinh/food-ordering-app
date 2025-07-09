"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FoodItem } from "@/types";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface FoodItemCardProps {
  item: FoodItem;
}

export function FoodItemCard({ item }: FoodItemCardProps) {
  const { dispatch } = useCart();
  const { toast } = useToast();

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
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden h-[400px] w-full flex flex-col">
      <div className="h-48 relative flex-shrink-0">
        <Image
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-1 pb-2">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
          <Badge variant="secondary" className="flex-shrink-0">
            {item.preparation_time} min
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center pt-2 mt-auto">
        <span className="text-2xl font-bold">${item.price}</span>
        <Button onClick={addToCart} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
