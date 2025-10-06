"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSidebar } from "@/components/cart-sidebar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category, FoodItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Utensils, Edit } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foodItemCounts, setFoodItemCounts] = useState<Record<number, number>>(
    {}
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchFoodItemCounts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFoodItemCounts = async () => {
    try {
      const response = await fetch("/api/food-items");
      const foodItems: FoodItem[] = await response.json();

      // Count items per category
      const counts: Record<number, number> = {};
      foodItems.forEach((item) => {
        counts[item.category_id] = (counts[item.category_id] || 0) + 1;
      });

      setFoodItemCounts(counts);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const CategoryCard = ({ category }: { category: Category }) => (
    <Card className="overflow-hidden w-full flex flex-row items-center group">
      <div className="w-32 h-24 relative flex-shrink-0 m-2 overflow-hidden rounded-lg border">
        <Image
          src={category.image_url || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-contain p-1"
        />
      </div>

      <CardHeader className="flex-1 py-4 px-6">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 flex-shrink-0">
            <Utensils className="h-3 w-3 mr-1" />
            {foodItemCounts[category.id] || 0} items
          </Badge>
        </div>

        <CardDescription className="line-clamp-2 text-muted-foreground text-sm leading-relaxed mb-4">
          {category.description}
        </CardDescription>

        <div className="flex gap-2">
          <Link href={`/?category=${category.id}`}>
            <Button
              size="sm"
              className="group-hover:bg-primary/90 transition-colors"
            >
              View Items
              <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={`/categories/edit/${category.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );

  const CategorySkeleton = () => (
    <Card className="overflow-hidden w-full flex flex-row items-center">
      <div className="m-2">
        <Skeleton className="w-32 h-24 flex-shrink-0 rounded-lg" />
      </div>
      <CardHeader className="flex-1 py-4 px-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Browse Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our delicious food categories and find your perfect meal.
            From appetizers to desserts, we have something for everyone.
          </p>
        </div>

        {/* Categories List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
        </div>

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-16">
            <Utensils className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Categories Found</h3>
            <p className="text-muted-foreground mb-6">
              It looks like there are no food categories available at the
              moment.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        )}

        {/* Stats Section */}
        {!loading && categories.length > 0 && (
          <div className="mt-16 bg-muted/50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {categories.length}
                </div>
                <div className="text-muted-foreground">Food Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {Object.values(foodItemCounts).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-muted-foreground">Total Food Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <Clock className="h-6 w-6 inline mr-1" />
                  Fast
                </div>
                <div className="text-muted-foreground">Delivery Service</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
