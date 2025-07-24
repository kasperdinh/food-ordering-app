"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types";

export default function EditFoodItemPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    preparation_time: "",
    image_url: "",
    is_available: true,
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFoodItem = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/food-items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            category_id: data.category_id.toString(),
            preparation_time: data.preparation_time.toString(),
            image_url: data.image_url || "",
            is_available: data.is_available,
          });
        } else {
          throw new Error("Food item not found");
        }
      } catch (error) {
        console.error("Error fetching food item:", error);
        toast({
          title: "Error",
          description: "Failed to load food item details.",
          variant: "destructive",
        });
        router.push("/food-items");
      } finally {
        setItemLoading(false);
      }
    },
    [toast, router]
  );

  useEffect(() => {
    fetchCategories();
    if (params.id) {
      fetchFoodItem(params.id as string);
    }
  }, [params.id, fetchFoodItem]);

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
      const response = await fetch(`/api/food-items/${params.id}`, {
        method: "PUT",
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
        toast({
          title: "Success",
          description: "Food item updated successfully!",
        });
        router.push("/food-items");
      } else {
        throw new Error("Failed to update food item");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast({
        title: "Error",
        description: "Failed to update food item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (itemLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50/30">
        <Header onCartClick={() => setCartOpen(true)} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
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
                Loading dish details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50/30">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 hover:bg-muted hover:text-foreground transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to All Dishes
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-6 animate-scaleIn">
            <ArrowLeft className="h-10 w-10 text-white rotate-180" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Edit Dish
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Update the details of this delicious dish to keep our menu fresh and
            exciting
          </p>
        </div>

        {/* Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl animate-fadeInUp">
          <CardHeader className="bg-background border-b border-border">
            <CardTitle className="text-2xl font-semibold text-foreground flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-foreground">
                <ArrowLeft className="h-5 w-5 text-background rotate-180" />
              </div>
              <span>Dish Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-base font-medium text-foreground flex items-center space-x-2"
                    >
                      <span>Dish Name</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter delicious dish name"
                      className="h-12 rounded-xl border-border/50 focus:border-orange-400 focus:ring-orange-200 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="category"
                      className="text-base font-medium text-foreground flex items-center space-x-2"
                    >
                      <span>Category</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) =>
                        handleInputChange("category_id", value)
                      }
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl border-border/50 focus:border-orange-400 transition-all duration-300">
                        <SelectValue placeholder="Select category" />
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
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label
                    htmlFor="description"
                    className="text-base font-medium text-foreground flex items-center space-x-2"
                  >
                    <span>Description</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe this amazing dish..."
                    rows={4}
                    className="rounded-xl border-border/50 focus:border-orange-400 focus:ring-orange-200 resize-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Pricing & Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-orange-200 pb-2">
                  Pricing & Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="price"
                      className="text-base font-medium text-foreground flex items-center space-x-2"
                    >
                      <span>Price ($)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        placeholder="0.00"
                        className="h-12 pl-8 rounded-xl border-border/50 focus:border-orange-400 focus:ring-orange-200 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Preparation Time */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="preparation_time"
                      className="text-base font-medium text-foreground flex items-center space-x-2"
                    >
                      <span>Prep Time (min)</span>
                      <span className="text-red-500">*</span>
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
                      className="h-12 rounded-xl border-border/50 focus:border-orange-400 focus:ring-orange-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-3">
                  <Label
                    htmlFor="image_url"
                    className="text-base font-medium text-foreground"
                  >
                    Image URL
                  </Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) =>
                      handleInputChange("image_url", e.target.value)
                    }
                    placeholder="https://example.com/delicious-dish.jpg"
                    className="h-12 rounded-xl border-border/50 focus:border-orange-400 focus:ring-orange-200 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 h-12 rounded-xl border-2 hover:border-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Dish"
                  )}
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
