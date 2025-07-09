"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FoodItemCard } from "@/components/food-item-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"
import type { Category, FoodItem } from "@/types"

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchFoodItems()
  }, [])

  useEffect(() => {
    fetchFoodItems(selectedCategory)
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchFoodItems = async (categoryId?: number | null) => {
    try {
      const url = categoryId ? `/api/food-items?category=${categoryId}` : "/api/food-items"
      const response = await fetch(url)
      const data = await response.json()
      setFoodItems(data)
    } catch (error) {
      console.error("Error fetching food items:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container py-8 mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Delicious Food Delivered</h1>
          <p className="text-xl text-muted-foreground mb-8">Order your favorite meals from the comfort of your home</p>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Items
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Food Items Grid */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <p>Loading delicious food...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foodItems.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  )
}
