import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("category")

    let query = "SELECT * FROM food_items WHERE is_available = TRUE"
    const params: any[] = []

    if (categoryId) {
      query += " AND category_id = ?"
      params.push(categoryId)
    }

    query += " ORDER BY name"

    const foodItems = await executeQuery(query, params)
    return NextResponse.json(foodItems)
  } catch (error) {
    console.error("Error fetching food items:", error)
    return NextResponse.json({ error: "Failed to fetch food items" }, { status: 500 })
  }
}
