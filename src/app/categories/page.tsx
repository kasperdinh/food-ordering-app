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
import { ArrowRight, Clock, Utensils, Plus, Edit } from "lucide-react";

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
    <Card className="overflow-hidden h-[350px] w-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 relative flex-shrink-0 overflow-hidden">
        <Image
          src={category.image_url || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-black">
            <Utensils className="h-3 w-3 mr-1" />
            {foodItemCounts[category.id] || 0} items
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-1 pb-4">
        <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {category.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed">
          {category.description}
        </CardDescription>

        <div className="mt-auto pt-4 space-y-2">
          <Link href={`/?category=${category.id}`}>
            <Button className="w-full group-hover:bg-primary/90 transition-colors">
              View Items
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={`/categories/edit/${category.id}`}>
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Edit Category
            </Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );

  const CategorySkeleton = () => (
    <Card className="overflow-hidden h-[350px] w-full flex flex-col">
      <Skeleton className="h-48 w-full" />
      <CardHeader className="flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto pt-4">
          <Skeleton className="h-10 w-full" />
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
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Browse Categories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our delicious food categories and find your perfect
                meal. From appetizers to desserts, we have something for
                everyone.
              </p>
            </div>
            <Link href="/categories/new">
              <Button className="ml-4">
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
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
