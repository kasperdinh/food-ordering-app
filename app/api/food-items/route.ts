import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");
    const showAll = searchParams.get("showAll"); // Add parameter to show all items including unavailable

    let query =
      showAll === "true"
        ? "SELECT * FROM food_items"
        : "SELECT * FROM food_items WHERE is_available = TRUE";
    const params: any[] = [];

    if (categoryId) {
      query +=
        showAll === "true" ? " WHERE category_id = ?" : " AND category_id = ?";
      params.push(categoryId);
    }

    query += " ORDER BY name";

    const foodItems = await executeQuery(query, params);
    return NextResponse.json(foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);
    return NextResponse.json(
      { error: "Failed to fetch food items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const query = `
      INSERT INTO food_items (name, description, price, category_id, preparation_time, image_url, is_available)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      description,
      price,
      category_id,
      preparation_time,
      image_url || null,
      is_available ?? true,
    ];

    const result = (await executeQuery(query, params)) as any;

    // Fetch the created item
    const createdItem = (await executeQuery(
      "SELECT * FROM food_items WHERE id = ?",
      [result.insertId]
    )) as any[];

    return NextResponse.json(createdItem[0], { status: 201 });
  } catch (error) {
    console.error("Error creating food item:", error);
    return NextResponse.json(
      { error: "Failed to create food item" },
      { status: 500 }
    );
  }
}
