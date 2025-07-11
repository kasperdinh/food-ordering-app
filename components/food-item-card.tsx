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
    <Card className="overflow-hidden h-[400px] w-full flex flex-col group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <div className="h-48 relative flex-shrink-0 overflow-hidden">
        <Image
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="flex-1 pb-2 bg-gradient-to-b from-background to-background/95">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {item.name}
          </CardTitle>
          <Badge
            variant="secondary"
            className="flex-shrink-0 bg-food-cream text-food-terracotta border-food-terracotta/20"
          >
            {item.preparation_time} min
          </Badge>
        </div>
        <CardDescription className="line-clamp-3 text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center pt-2 mt-auto bg-gradient-to-t from-secondary/30 to-transparent">
        <span className="text-2xl font-bold text-primary">${item.price}</span>
        <Button
          onClick={addToCart}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
