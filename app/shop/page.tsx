"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { mockProducts } from "@/lib/mock-products"
import { Filter, X } from "lucide-react"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Pria", "Wanita", "Aksesoris"]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]

    // Filter by category
    if (selectedCategory) {
      products = products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by price
    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return products
  }, [selectedCategory, priceRange, sortBy])

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Belanja Fashion</h1>
            <p className="text-muted-foreground">Temukan gaya sempurna Anda dari koleksi fashion terlengkap kami</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-20 space-y-6">
                {/* Close Button on Mobile */}
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                {/* Category Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Kategori</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === ""
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Semua
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat.toLowerCase())}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                          selectedCategory === cat.toLowerCase()
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-3 border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Harga</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex gap-2 text-sm">
                      <span className="text-muted-foreground">Rp</span>
                      <span className="font-semibold text-foreground">{priceRange[1].toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-3 border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Urutkan</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="price-asc">Harga Terendah</option>
                    <option value="price-desc">Harga Tertinggi</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>

                {/* Reset Button */}
                {(selectedCategory || priceRange[1] !== 500000 || sortBy !== "newest") && (
                  <button
                    onClick={() => {
                      setSelectedCategory("")
                      setPriceRange([0, 500000])
                      setSortBy("newest")
                    }}
                    className="w-full py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-all text-sm font-medium"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Menampilkan <span className="font-semibold text-foreground">{filteredProducts.length}</span> produk
                </p>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                      category={product.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">Produk tidak ditemukan</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("")
                      setPriceRange([0, 500000])
                      setSortBy("newest")
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
