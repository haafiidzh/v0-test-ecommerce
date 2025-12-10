"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import { User, Package, Heart, MapPin, Settings, Menu, X } from "lucide-react"

const navItems = [
  { href: "/dashboard/profile", label: "Profil Saya", icon: User },
  { href: "/dashboard/orders", label: "Pesanan", icon: Package },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/addresses", label: "Alamat", icon: MapPin },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-full flex items-center justify-between bg-card p-4 rounded-lg shadow-sm mb-4"
              >
                <span className="font-semibold text-foreground">Menu Dashboard</span>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Navigation */}
              <nav
                className={`
                bg-card rounded-lg shadow-sm p-4 space-y-2
                ${isMobileMenuOpen ? "block" : "hidden lg:block"}
              `}
              >
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          isActive
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-md"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
