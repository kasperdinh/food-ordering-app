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
    <Card className="overflow-hidden h-[420px] w-full flex flex-col group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-orange-300 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm food-card-hover">
      <div className="h-52 relative flex-shrink-0 overflow-hidden rounded-t-lg">
        <Image
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Badge
            variant="secondary"
            className="bg-white/90 text-orange-800 border-0 shadow-lg backdrop-blur-sm font-medium"
          >
            {item.preparation_time} min
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-white text-2xl font-bold drop-shadow-lg">
            ${item.price}
          </span>
        </div>
      </div>

      <CardHeader className="flex-1 pb-3 px-5 pt-4 bg-gradient-to-b from-card to-card/95">
        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground text-sm leading-relaxed mt-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center pt-2 pb-5 px-5 mt-auto bg-gradient-to-t from-orange-50 to-transparent">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-orange-600">
            ${item.price}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.preparation_time} min prep
          </span>
        </div>
        <Button
          onClick={addToCart}
          size="sm"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 rounded-full font-medium group-hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
