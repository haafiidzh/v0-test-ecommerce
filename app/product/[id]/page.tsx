"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { mockProducts, getProductById } from "@/lib/mock-products"
import { Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  // Get related products (same category)
  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Belanja
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Image Navigation Buttons */}
                <button
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(Math.min(2, selectedImage + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Stok: {product.inStock ? "Tersedia" : "Kosong"}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < product.rating ? "text-yellow-400" : "text-muted"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-muted-foreground">({product.rating} rating)</span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 border-b border-border pb-6">
                <p className="text-4xl font-bold text-primary">Rp {product.price.toLocaleString("id-ID")}</p>
                <p className="text-sm text-muted-foreground">Termasuk pajak dan ongkir</p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Warna</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Ukuran</h3>
                  <Link href="#" className="text-primary hover:text-secondary text-sm font-medium transition-colors">
                    Lihat Panduan Ukuran
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Jumlah</h3>
                <div className="flex items-center gap-3 w-fit bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-border rounded transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-12 text-center bg-transparent text-foreground focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-border rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-4 py-3 border-2 border-border text-foreground hover:border-primary rounded-lg transition-all"
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>

                <button className="px-4 py-3 border-2 border-border text-foreground hover:border-primary rounded-lg transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Info Boxes */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">Pengiriman Gratis</p>
                  <p className="text-xs text-muted-foreground mt-1">Untuk pembelian Rp 250.000+</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">Garansi 30 Hari</p>
                  <p className="text-xs text-muted-foreground mt-1">Return tanpa pertanyaan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart Notification */}
          {showNotification && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in">
              <ShoppingCart className="w-5 h-5" />
              <span>Produk ditambahkan ke keranjang</span>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 border-t border-border pt-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Produk Serupa</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    price={relatedProduct.price}
                    image={relatedProduct.image}
                    rating={relatedProduct.rating}
                    category={relatedProduct.category}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
