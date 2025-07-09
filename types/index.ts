export interface Category {
  id: number
  name: string
  description: string
  image_url: string
  created_at: string
}

export interface FoodItem {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category_id: number
  is_available: boolean
  preparation_time: number
  created_at: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image_url: string
}

export interface Order {
  id?: number
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  total_amount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  payment_status: "pending" | "paid" | "failed"
  payment_method: string
  items: OrderItem[]
}

export interface OrderItem {
  food_item_id: number
  quantity: number
  price: number
}
