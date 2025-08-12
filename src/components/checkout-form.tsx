"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"

interface CheckoutFormProps {
  onBack: () => void
  onSuccess: () => void
}

export function CheckoutForm({ onBack, onSuccess }: CheckoutFormProps) {
  const { state, dispatch } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    payment_method: "card",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        ...formData,
        total_amount: state.total,
        items: state.items.map((item) => ({
          food_item_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Order placed successfully!",
          description: `Your order #${result.orderId} has been confirmed.`,
        })
        dispatch({ type: "CLEAR_CART" })
        onSuccess()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <Button type="button" variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.customer_phone}
            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="address">Delivery Address</Label>
          <Textarea
            id="address"
            required
            value={formData.delivery_address}
            onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
          />
        </div>

        <div>
          <Label>Payment Method</Label>
          <RadioGroup
            value={formData.payment_method}
            onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Credit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                Cash on Delivery
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total: ${state.total.toFixed(2)}</span>
        </div>
        <Button type="submit" className="w-full place-order-btn" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </form>
  )
}
