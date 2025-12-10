"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Trash2, ArrowRight } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 199000,
      image: "/mens-tshirt-blue.jpg",
      size: "M",
      color: "Biru",
      quantity: 2,
    },
    {
      id: "3",
      name: "Classic Accessories Bundle",
      price: 249000,
      image: "/accessories-bundle.jpg",
      size: "One Size",
      color: "Multi",
      quantity: 1,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = discountApplied ? subtotal * 0.1 : 0 // 10% discount
  const shipping = subtotal > 250000 ? 0 : 25000
  const total = subtotal - discount + shipping

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscountApplied(true)
    }
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Keranjang Belanja</h1>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="bg-card rounded-lg shadow-sm p-4 sm:p-6 flex gap-4 sm:gap-6"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <Link href={`/product/${item.id}`} className="group">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Warna: {item.color}</p>
                        <p>Ukuran: {item.size}</p>
                      </div>
                      <p className="font-bold text-lg text-primary">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end gap-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-border rounded transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-foreground font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-border rounded transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1 space-y-6">
                {/* Promo Code */}
                <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Kode Promo</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Masukkan kode"
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={discountApplied}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      Terapkan
                    </button>
                  </div>
                  {discountApplied && (
                    <p className="text-sm text-primary font-medium">Diskon 10% berhasil diterapkan!</p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-card rounded-lg shadow-sm p-6 space-y-4 sticky top-20">
                  <h3 className="font-semibold text-foreground text-lg">Ringkasan Pesanan</h3>

                  <div className="space-y-3 border-b border-border pb-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-primary font-medium">
                        <span>Diskon (10%)</span>
                        <span>-Rp {discount.toLocaleString("id-ID")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Pengiriman</span>
                      <span className={shipping === 0 ? "text-primary font-medium" : ""}>
                        {shipping === 0 ? "Gratis" : `Rp ${shipping.toLocaleString("id-ID")}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Lanjut ke Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/shop"
                    className="w-full text-center py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-all"
                  >
                    Lanjutkan Belanja
                  </Link>

                  {subtotal < 250000 && (
                    <p className="text-sm text-center text-muted-foreground">
                      Belanja Rp {(250000 - subtotal).toLocaleString("id-ID")} lagi untuk gratis ongkir!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg">
              <p className="text-muted-foreground text-lg mb-6">Keranjang belanja Anda masih kosong</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Mulai Belanja
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
