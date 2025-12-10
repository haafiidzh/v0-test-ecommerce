"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
}

export default function ProductCard({ id, name, price, image, rating, category }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/product/${id}`}>
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 bg-background rounded-full p-2 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>

          {/* New Badge */}
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            Baru
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{category}</p>
            <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          {/* Rating & Price */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${i < rating ? "text-yellow-400" : "text-muted"}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({rating})</span>
            </div>
            <p className="text-lg font-bold text-primary">Rp {price.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
