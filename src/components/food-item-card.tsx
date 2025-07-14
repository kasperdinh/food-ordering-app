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
    <Card className="overflow-hidden h-[420px] w-full flex flex-col group food-card food-card-hover">
      <div className="h-52 relative flex-shrink-0 overflow-hidden rounded-t-lg">
        <Image
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover food-card-image"
        />
        <div className="absolute inset-0 food-card-overlay" />
        <div className="absolute top-3 right-3 food-card-badge">
          <Badge variant="secondary" className="food-card-badge">
            {item.preparation_time} min
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 food-card-price-overlay">
          <span className="text-white text-2xl font-bold drop-shadow-lg">
            ${item.price}
          </span>
        </div>
      </div>

      <CardHeader className="flex-1 pb-3 px-5 pt-4 food-card-header">
        <CardTitle className="text-lg font-semibold line-clamp-2 food-card-title leading-tight">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground text-sm leading-relaxed mt-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center pt-2 pb-5 px-5 mt-auto food-card-footer">
        <div className="flex flex-col">
          <span className="text-2xl font-bold food-card-price">
            ${item.price}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.preparation_time} min prep
          </span>
        </div>
        <Button
          onClick={addToCart}
          size="sm"
          className="food-card-add-button font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
