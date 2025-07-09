"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddNew() {
  const router = useRouter();

  const handleAddNew = () => {
    // Navigate to add new food item page or open a modal
    router.push("/food-items/new");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddNew}
      className="bg-transparent"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add New
    </Button>
  );
}
