"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Search } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const categories = ["Pria", "Wanita", "Aksesoris"]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline text-foreground group-hover:text-primary transition-colors">
              StyleHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat.toLowerCase()}`}
                className="text-foreground hover:text-primary font-medium text-sm transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Search, Cart & Auth */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-muted rounded-lg px-3 py-2 gap-2 w-48">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-transparent outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Auth Links */}
            <Link
              href="/login"
              className="hidden sm:inline-block px-4 py-2 text-foreground hover:text-primary font-medium transition-colors"
            >
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat.toLowerCase()}`}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <div className="px-4 pt-2 border-t border-border">
              <Link
                href="/login"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
