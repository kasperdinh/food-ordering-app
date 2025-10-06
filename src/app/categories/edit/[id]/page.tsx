"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";

interface EditCategoryPageProps {
  params: { id: string };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const fetchCategory = useCallback(async () => {
    try {
      const response = await fetch(`/api/categories/${params.id}`);

      if (!response.ok) {
        throw new Error("Category not found");
      }

      const categoryData = await response.json();
      setCategory(categoryData);
      setFormData({
        name: categoryData.name,
        description: categoryData.description,
        image_url: categoryData.image_url || "",
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      toast({
        title: "Error",
        description: "Failed to load category. Please try again.",
        variant: "destructive",
      });
      router.push("/categories");
    } finally {
      setFetchLoading(false);
    }
  }, [params.id, toast, router]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      toast({
        title: "Success",
        description: "Category updated successfully!",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      router.push("/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await fetch(`/api/categories/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      toast({
        title: "Success",
        description: "Category deleted successfully!",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      router.push("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => {}} />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-9 w-32" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => {}} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/categories">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Edit Category</h1>
              <p className="text-muted-foreground mt-1">
                Update the details for "{category.name}".
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Update the information below to modify this category.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Appetizers, Main Courses, Desserts"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what type of food items belong to this category..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image_url"
                      name="image_url"
                      placeholder="https://example.com/category-image.jpg"
                      value={formData.image_url}
                      onChange={handleInputChange}
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optional: Add an image URL to represent this category.
                  </p>
                </div>

                {/* Preview */}
                {formData.image_url && (
                  <div className="space-y-2">
                    <Label>Image Preview</Label>
                    <div className="border rounded-lg p-4">
                      <div className="relative w-full h-48">
                        <Image
                          src={formData.image_url}
                          alt="Category preview"
                          fill
                          className="object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 ">
                  <Button type="submit" disabled={loading} className="flex-1 border">
                    {loading ? (
                      "Updating..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Category
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        type="button"
                        disabled={deleting}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{category.name}"?
                          This action cannot be undone. All food items in this
                          category will need to be reassigned to other
                          categories.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deleting ? "Deleting..." : "Delete Category"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Link href="/categories">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
