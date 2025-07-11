"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { CartSidebar } from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import type { Category } from "@/types";

export default function NewFoodItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    preparation_time: "",
    image_url: "",
    is_available: true,
  });

  useEffect(() => {
    fetchCategories();
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/food-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          category_id: parseInt(formData.category_id),
          preparation_time: parseInt(formData.preparation_time),
        }),
      });

      if (response.ok) {
        router.push("/food-items");
        // You could also show a success toast here
      } else {
        throw new Error("Failed to create food item");
      }
    } catch (error) {
      console.error("Error creating food item:", error);
      // You could show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Food Item</h1>
          <p className="text-muted-foreground">
            Create a new food item for your menu
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Food Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter food item name"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the food item"
                  rows={3}
                  required
                />
              </div>

              {/* Price and Preparation Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preparation_time">
                    Preparation Time (minutes) *
                  </Label>
                  <Input
                    id="preparation_time"
                    type="number"
                    min="1"
                    value={formData.preparation_time}
                    onChange={(e) =>
                      handleInputChange("preparation_time", e.target.value)
                    }
                    placeholder="15"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    handleInputChange("category_id", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) =>
                      handleInputChange("image_url", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a URL for the food item image or upload one
                </p>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={formData.is_available.toString()}
                  onValueChange={(value) =>
                    handleInputChange("is_available", value === "true")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Food Item"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
