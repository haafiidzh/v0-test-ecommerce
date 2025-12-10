"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = () => {
    if (!email) {
      setError("Email harus diisi")
      return false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    setIsSubmitted(true)
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Atur Ulang Password</h1>
            <p className="text-muted-foreground">Masukkan email Anda untuk menerima tautan reset</p>
          </div>

          {/* Form Container */}
          <div className="bg-card rounded-2xl shadow-lg p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      error ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Memproses..." : "Kirim Tautan Reset"}
                </button>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </form>
            ) : (
              <div className="space-y-6 py-8">
                {/* Success Message */}
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-primary" />
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Email Terkirim!</h2>
                  <p className="text-muted-foreground">
                    Kami telah mengirimkan tautan reset password ke{" "}
                    <span className="font-semibold text-foreground">{email}</span>
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Periksa email Anda dan ikuti tautan untuk mengatur ulang password Anda. Tautan akan kadaluarsa dalam
                    24 jam.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setEmail("")
                      setIsSubmitted(false)
                    }}
                    className="w-full py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all"
                  >
                    Gunakan Email Lain
                  </button>

                  <Link
                    href="/login"
                    className="block text-center py-3 text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Kembali ke Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
