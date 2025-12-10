"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 199000,
      image: "/mens-tshirt-blue.jpg",
      category: "Pakaian Pria",
      inStock: true,
    },
    {
      id: "2",
      name: "Elegant Summer Dress",
      price: 349000,
      image: "/womens-dress-cyan.jpg",
      category: "Pakaian Wanita",
      inStock: true,
    },
    {
      id: "5",
      name: "Casual Denim Jacket",
      price: 549000,
      image: "/denim-jacket-blue.jpg",
      category: "Pakaian Pria",
      inStock: false,
    },
  ])

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wishlist Saya</h1>
          <p className="text-muted-foreground mt-2">{wishlistItems.length} produk yang Anda sukai</p>
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-sm overflow-hidden group">
              {/* Product Image */}
              <Link href={`/product/${item.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">Stok Habis</span>
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.category}</p>
                  <Link href={`/product/${item.id}`} className="group/link">
                    <h3 className="font-semibold text-foreground group-hover/link:text-primary transition-colors line-clamp-2 mt-1">
                      {item.name}
                    </h3>
                  </Link>
                </div>

                <p className="font-bold text-lg text-primary">Rp {item.price.toLocaleString("id-ID")}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  {item.inStock ? (
                    <Link
                      href={`/product/${item.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm font-medium">Tambah ke Keranjang</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
                    >
                      <span className="text-sm font-medium">Stok Habis</span>
                    </button>
                  )}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 border-2 border-border text-destructive rounded-lg hover:bg-destructive/10 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-6">Wishlist Anda masih kosong</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Jelajahi Produk
          </Link>
        </div>
      )}
    </div>
  )
}
