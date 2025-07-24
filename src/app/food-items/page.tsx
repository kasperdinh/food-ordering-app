"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { FoodItemCard } from "@/components/food-item-card";
import { CartSidebar } from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Category, FoodItem } from "@/types";
import { Footer } from "@/components/footer";

export default function FoodItemsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchFoodItems();
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

  const fetchFoodItems = async () => {
    try {
      const response = await fetch("/api/food-items?showAll=true");
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortItems = useCallback(() => {
    let filtered = [...foodItems];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category_id.toString() === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "preparation-time":
          return a.preparation_time - b.preparation_time;
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [foodItems, selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    filterAndSortItems();
  }, [filterAndSortItems]);

  const handleEdit = (item: FoodItem) => {
    // Navigate to edit page with item data
    router.push(`/food-items/edit/${item.id}`);
  };

  const handleDelete = async (item: FoodItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/food-items/${item.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${item.name} has been deleted successfully.`,
        });

        // Refresh the food items list
        fetchFoodItems();
      } else {
        throw new Error("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast({
        title: "Error",
        description: "Failed to delete the food item. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
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
                Loading our delicious menu...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100/30">
      <Header onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
            All Dishes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of mouth-watering dishes crafted
            with love and finest ingredients
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10 space-y-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for your favorite dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-border/50 focus:border-foreground focus:ring-foreground"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Category</span>
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-52 h-12 rounded-xl border-border/50 focus:border-foreground">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
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

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Sort by
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-52 h-12 rounded-xl border-border/50 focus:border-foreground">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price (High to Low)
                    </SelectItem>
                    <SelectItem value="preparation-time">
                      Preparation Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <div className="bg-muted border border-border rounded-xl p-4">
            <p className="text-sm font-medium text-foreground flex items-center space-x-2">
              <span className="w-2 h-2 bg-foreground rounded-full"></span>
              <span>
                Showing {filteredItems.length} of {foodItems.length} dishes
                {selectedCategory !== "all" && (
                  <span className="text-foreground">
                    {" "}
                    in{" "}
                    {
                      categories.find(
                        (cat) => cat.id.toString() === selectedCategory
                      )?.name
                    }
                  </span>
                )}
                {searchTerm && (
                  <span className="text-red-500">
                    {" "}
                    matching &ldquo;{searchTerm}&rdquo;
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-8 rounded-full bg-muted w-32 h-32 mx-auto flex items-center justify-center">
                <Search className="h-12 w-12 text-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">
                  No dishes found
                </h3>
                <p className="text-muted-foreground">
                  We couldn&apos;t find any dishes matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="space-y-4 animate-scaleIn food-card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FoodItemCard item={item} />
                  <div className="flex gap-3 px-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
