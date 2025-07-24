"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List, Plus, Utensils, ChevronDown } from "lucide-react";
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
          variant="outline"
          className="food-manage-trigger h-9 w-auto px-2 sm:px-3 lg:px-4"
        >
          <Utensils className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Food Manage</span>
          <span className="sm:hidden">Manage</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="select-content w-auto">
        <DropdownMenuItem onClick={handleAddNew} className="select-item">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAllFood} className="select-item">
          <List className="h-4 w-4 mr-2" />
          All Food Items
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
