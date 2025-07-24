"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { FoodItemCard } from "@/components/food-item-card";
import { CartSidebar } from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import type { Category, FoodItem } from "@/types";
import { Footer } from "@/components/footer";
import { Carousel } from "@/components/carousel";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchFoodItems();
  }, []);

  useEffect(() => {
    fetchFoodItems(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFoodItems = async (categoryId?: number | null) => {
    try {
      const url = categoryId
        ? `/api/food-items?category=${categoryId}`
        : "/api/food-items";
      const response = await fetch(url);
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onCartClick={() => setCartOpen(true)} />

      <Carousel />

      <main className="container py-12 mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fadeInUp">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-title leading-tight">
              Delicious Food Delivered
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Savor the finest culinary experiences from the comfort of your
              home. Fast delivery, fresh ingredients, unforgettable flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>30+ restaurants</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>15-30 min delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>100% fresh ingredients</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Explore Our Menu
          </h2>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={`category-button ${
                selectedCategory === null ? "category-button-active" : ""
              }`}
            >
              All Items
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${
                  selectedCategory === category.id
                    ? "category-button-active"
                    : ""
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Food Items Grid */}
        <section className="animate-fadeInUp">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <p className="text-lg text-muted-foreground font-medium">
                  Preparing your delicious menu...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {foodItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-scaleIn food-card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FoodItemCard item={item} />
                </div>
              ))}
            </div>
          )}

          {!loading && foodItems.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  No dishes found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn&apos;t find any dishes in this category. Try
                  exploring other categories or check back later.
                </p>
                <Button
                  onClick={() => setSelectedCategory(null)}
                  className="view-all-button"
                >
                  View All Items
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
