import { NextResponse } from "next/server"
import type { Order } from "@/types"

export async function POST(request: Request) {
  try {
    const orderData: Order = await request.json()

    // Start transaction
    const db = require("@/lib/db").getDb()
    const connection = await db.getConnection()

    try {
      await connection.beginTransaction()

      // Insert order
      const [orderResult] = await connection.execute(
      `INSERT INTO orders (
        customer_name, customer_email, customer_phone, 
        delivery_address, total_amount, payment_method, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [
        orderData.customer_name, orderData.customer_email, orderData.customer_phone,
        orderData.delivery_address, orderData.total_amount, orderData.payment_method,
        new Date()
      ]
    );

      const orderId = (orderResult as any).insertId

      // Insert order items
      for (const item of orderData.items) {
        await connection.execute(
          "INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, item.food_item_id, item.quantity, item.price],
        )
      }

      await connection.commit()

      return NextResponse.json({
        success: true,
        orderId,
        message: "Order placed successfully!",
      })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
