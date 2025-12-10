"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi"
    }

    if (!formData.email) {
      newErrors.email = "Email harus diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    if (!agreedToTerms) {
      newErrors.terms = "Anda harus menyetujui syarat dan ketentuan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAgreedToTerms(false)
    alert("Pendaftaran berhasil! (Demo)")
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Daftar di StyleHub</h1>
            <p className="text-muted-foreground">Bergabunglah dengan jutaan pelanggan fashion kami</p>
          </div>

          {/* Register Form */}
          <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                    errors.fullName ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errors.confirmPassword ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 rounded mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Saya setuju dengan{" "}
                  <Link href="#" className="text-primary hover:text-secondary transition-colors">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link href="#" className="text-primary hover:text-secondary transition-colors">
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Daftar"}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary hover:text-secondary font-semibold transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
