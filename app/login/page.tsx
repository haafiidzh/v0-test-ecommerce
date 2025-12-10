"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = "Email harus diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!password) {
      newErrors.password = "Password harus diisi"
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Reset form
    setEmail("")
    setPassword("")
    alert("Login berhasil! (Demo)")
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-background via-muted to-background py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">S</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Masuk ke StyleHub</h1>
            <p className="text-muted-foreground">Nikmati pengalaman belanja fashion terbaik</p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                    errors.email ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errors.password ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-muted-foreground hover:text-foreground transition-colors">Ingat saya</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Atau</span>
              </div>
            </div>

            {/* Social Login (Placeholder) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 border-2 border-border rounded-lg hover:bg-muted transition-colors font-medium">
                Google
              </button>
              <button className="py-2 border-2 border-border rounded-lg hover:bg-muted transition-colors font-medium">
                GitHub
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary hover:text-secondary font-semibold transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
