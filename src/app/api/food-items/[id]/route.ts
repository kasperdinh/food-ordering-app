import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if food item exists
    const existingItem = (await executeQuery(
      "SELECT * FROM food_items WHERE id = ?",
      [id]
    )) as any[];

    if (!existingItem || existingItem.length === 0) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    // Delete the food item
    await executeQuery("DELETE FROM food_items WHERE id = ?", [id]);

    return NextResponse.json({ message: "Food item deleted successfully" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    return NextResponse.json(
      { error: "Failed to delete food item" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const foodItem = (await executeQuery(
      "SELECT * FROM food_items WHERE id = ?",
      [id]
    )) as any[];

    if (!foodItem || foodItem.length === 0) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(foodItem[0]);
  } catch (error) {
    console.error("Error fetching food item:", error);
    return NextResponse.json(
      { error: "Failed to fetch food item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = params.id;
    const body = await request.json();
    const {
      name,
      description,
      price,
      category_id,
      preparation_time,
      image_url,
      is_available,
    } = body;

    // Validate required fields
    if (!name || !description || !price || !category_id || !preparation_time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if food item exists
    const existingItem = (await executeQuery(
      "SELECT * FROM food_items WHERE id = ?",
      [itemId]
    )) as any[];

    if (!existingItem || existingItem.length === 0) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    // Update the food item
    const query = `
      UPDATE food_items 
      SET name = ?, description = ?, price = ?, category_id = ?, preparation_time = ?, image_url = ?, is_available = ?
      WHERE id = ?
    `;
    const queryParams = [
      name,
      description,
      price,
      category_id,
      preparation_time,
      image_url || null,
      is_available ?? true,
      itemId,
    ];

    await executeQuery(query, queryParams);

    // Fetch the updated item
    const updatedItem = (await executeQuery(
      "SELECT * FROM food_items WHERE id = ?",
      [itemId]
    )) as any[];

    return NextResponse.json(updatedItem[0]);
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      { error: "Failed to update food item" },
      { status: 500 }
    );
  }
}
