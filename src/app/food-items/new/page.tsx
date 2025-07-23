"use client";

import { useState, useEffect, useCallback } from "react";
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
import { ArrowLeft, Upload, Plus, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types";

export default function NewFoodItemPage() {
  const router = useRouter();
  const { toast } = useToast();
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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Dish name is required");
    if (!formData.description.trim()) errors.push("Description is required");
    if (!formData.price || parseFloat(formData.price) <= 0)
      errors.push("Valid price is required");
    if (!formData.category_id) errors.push("Category is required");
    if (
      !formData.preparation_time ||
      parseInt(formData.preparation_time) <= 0
    ) {
      errors.push("Valid preparation time is required");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

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
          preparation_time: parseInt(formData.preparation_time),
          category_id: parseInt(formData.category_id),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: `${formData.name} has been added to the menu.`,
        });
        router.push("/food-items");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create food item");
      }
    } catch (error) {
      console.error("Error creating food item:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create food item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "",
      preparation_time: "",
      image_url: "",
      is_available: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100/30">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 hover:bg-muted hover:text-muted-foreground transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to All Dishes
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-800 to-black mb-6 animate-scaleIn">
            <Plus className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
            Add New Dish
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create a delicious new addition to our menu that will delight our
            customers and expand our culinary offerings
          </p>
        </div>

        {/* Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl animate-fadeInUp">
          <CardHeader className="bg-gradient-to-r from-muted to-white border-b border-border">
            <CardTitle className="text-2xl font-semibold text-foreground flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-gray-800 to-black">
                <Upload className="h-5 w-5 text-white" />
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
                  {/* Dish Name */}
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
                      placeholder="e.g., Margherita Pizza, Beef Burger, Chicken Teriyaki..."
                      className="h-12 rounded-xl border-border/50 focus:border-foreground focus:ring-foreground transition-all duration-300"
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
                    >
                      <SelectTrigger className="h-12 rounded-xl border-border/50 focus:border-foreground transition-all duration-300">
                        <SelectValue placeholder="Choose a category" />
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
                    placeholder="Describe your dish in detail - ingredients, taste, cooking method, what makes it special..."
                    rows={4}
                    className="rounded-xl border-border/50 focus:border-foreground focus:ring-foreground resize-none transition-all duration-300"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Include key ingredients, cooking style, and what makes
                    this dish unique
                  </p>
                </div>
              </div>

              {/* Pricing & Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Pricing & Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
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
                        className="h-12 pl-8 rounded-xl border-border/50 focus:border-foreground focus:ring-foreground transition-all duration-300"
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
                      <span>Prep Time</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="preparation_time"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.preparation_time}
                        onChange={(e) =>
                          handleInputChange("preparation_time", e.target.value)
                        }
                        placeholder="15"
                        className="h-12 rounded-xl border-border/50 focus:border-foreground focus:ring-foreground transition-all duration-300"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        min
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-foreground">
                      Availability
                    </Label>
                    <div className="flex items-center space-x-3 h-12 px-4 rounded-xl border border-border/50 bg-background/50">
                      <input
                        type="checkbox"
                        id="is_available"
                        checked={formData.is_available}
                        onChange={(e) =>
                          handleInputChange("is_available", e.target.checked)
                        }
                        className="w-5 h-5 text-foreground rounded focus:ring-foreground focus:ring-offset-0"
                      />
                      <Label
                        htmlFor="is_available"
                        className="text-sm cursor-pointer"
                      >
                        Available for order
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Image
                </h3>

                <div className="space-y-3">
                  <Label
                    htmlFor="image_url"
                    className="text-base font-medium text-foreground"
                  >
                    Image URL
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        handleInputChange("image_url", e.target.value)
                      }
                      placeholder="https://example.com/delicious-dish.jpg"
                      className="h-12 pl-12 rounded-xl border-border/50 focus:border-foreground focus:ring-foreground transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 bg-food-orange rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Optional: Add a URL to a high-quality image of your dish.
                      This helps customers see what they&apos;re ordering.
                    </p>
                  </div>

                  {/* Image Preview */}
                  {formData.image_url && (
                    <div className="mt-4 p-4 border border-border/50 rounded-xl bg-muted/20">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Image Preview:
                      </p>
                      <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={formData.image_url}
                          alt="Preview"
                          fill
                          className="object-cover"
                          onError={() => {
                            // Handle error silently
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 h-12 rounded-xl border-border/50 hover:bg-muted/50 transition-all duration-300"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 h-12 rounded-xl border-food-orange/50 text-foreground hover:bg-food-orange/10 transition-all duration-300"
                  disabled={loading}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-gray-800 to-black hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Create Delicious Dish</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Tips */}
        <div className="mt-8 p-6 bg-food-cream/20 border border-border rounded-2xl animate-fadeInUp">
          <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <div className="w-2 h-2 bg-food-orange rounded-full"></div>
            <span>Tips for Creating Great Dishes</span>
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start space-x-2">
              <span className="text-foreground">•</span>
              <span>
                Use descriptive names that highlight key ingredients or cooking
                methods
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-foreground">•</span>
              <span>
                Include allergen information and dietary restrictions in the
                description
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-foreground">•</span>
              <span>
                Set realistic preparation times to manage customer expectations
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-foreground">•</span>
              <span>
                High-quality images significantly increase order likelihood
              </span>
            </li>
          </ul>
        </div>
      </div>

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
