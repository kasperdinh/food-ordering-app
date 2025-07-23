"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, List, ChevronDown, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";

export function FoodManage() {
  const router = useRouter();

  const handleAddNew = () => {
    router.push("/food-items/new");
  };

  const handleAllFood = () => {
    router.push("/food-items");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="food-manage-trigger h-9 px-2 sm:px-3 lg:px-4"
        >
          <Utensils className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Food Manage</span>
          <span className="sm:hidden">Manage</span>
          <ChevronDown className="h-4 w-4 ml-1 sm:ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="food-manage-content">
        <DropdownMenuItem onClick={handleAddNew} className="food-manage-item">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAllFood} className="food-manage-item">
          <List className="h-4 w-4 mr-2" />
          All Food Items
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
