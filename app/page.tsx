import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { mockProducts } from "@/lib/mock-products"

export default function Home() {
  const categories = [
    { name: "Pria", href: "/shop?category=pria", bgColor: "bg-primary" },
    { name: "Wanita", href: "/shop?category=wanita", bgColor: "bg-secondary" },
    { name: "Aksesoris", href: "/shop?category=aksesoris", bgColor: "bg-accent" },
  ]

  const bestSellers = mockProducts.slice(0, 4)
  const newArrivals = mockProducts.slice(4, 8)

  return (
    <>
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative bg-background pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-muted text-primary rounded-full text-sm font-semibold">
                  Koleksi Terbaru 2025
                </span>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Gaya <span className="text-primary">Fashion</span> Modern Anda
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Temukan koleksi fashion premium dengan desain minimalis modern. Dari pakaian kasual hingga formal,
                  kami punya semuanya untuk gaya hidup Anda.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
                >
                  Mulai Belanja
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#best-sellers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Lihat Koleksi
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Pelanggan Puas</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Produk Fashion</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Customer Support</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 lg:h-full hidden lg:block">
              <Image
                src="/fashion-model-wearing-modern-cyan-blue-clothing.jpg"
                alt="Fashion model"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Jelajahi Kategori</h2>
            <p className="text-muted-foreground text-lg">Temukan produk fashion terbaik untuk gaya Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <div className="relative group overflow-hidden rounded-xl h-64 cursor-pointer border border-border hover:border-primary transition-all">
                  <div className={`absolute inset-0 ${category.bgColor}`} />
                  <Image
                    src={`/.jpg&query=${category.name}%20fashion%20clothing%20collection`}
                    alt={category.name}
                    height={300}
                    width={400}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                        Jelajahi
                        <ArrowRight className="w-4 h-4" />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Best Seller</h2>
              <p className="text-muted-foreground mt-2">Produk pilihan yang paling diminati pelanggan</p>
            </div>
            <Link
              href="/shop"
              className="text-primary hover:text-secondary font-semibold flex items-center gap-2 transition-colors"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
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
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Koleksi Terbaru</h2>
              <p className="text-muted-foreground mt-2">Tren fashion terkini yang baru saja tiba</p>
            </div>
            <Link
              href="/shop"
              className="text-primary hover:text-secondary font-semibold flex items-center gap-2 transition-colors"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Dapatkan Penawaran Eksklusif</h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Daftar newsletter kami dan dapatkan diskon hingga 20% untuk pembelian pertama Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary border border-border"
            />
            <button className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-accent transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
