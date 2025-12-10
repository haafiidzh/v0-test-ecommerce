"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { CreditCard, Lock, ShoppingBag } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Mock cart total
  const cartTotal = 647000
  const shippingCost = shippingMethod === "express" ? 50000 : 25000
  const total = cartTotal + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    router.push("/checkout/success")
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-2">Selesaikan pesanan Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Informasi Pengiriman
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="08123456789"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Alamat Lengkap</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Jl. Contoh No. 123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Kota</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Jakarta"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Provinsi</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Pilih Provinsi</option>
                      <option value="jakarta">DKI Jakarta</option>
                      <option value="jabar">Jawa Barat</option>
                      <option value="jateng">Jawa Tengah</option>
                      <option value="jatim">Jawa Timur</option>
                      <option value="bali">Bali</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Kode Pos</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Metode Pengiriman</h2>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground">Reguler (3-5 hari)</p>
                        <p className="text-sm text-muted-foreground">Pengiriman standar</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">Rp 25.000</span>
                  </label>

                  <label className="flex items-center justify-between p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground">Express (1-2 hari)</p>
                        <p className="text-sm text-muted-foreground">Pengiriman cepat</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">Rp 50.000</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Metode Pembayaran
                </h2>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-foreground">Kartu Kredit / Debit</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank-transfer"
                      checked={paymentMethod === "bank-transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-foreground">Transfer Bank</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="e-wallet"
                      checked={paymentMethod === "e-wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-foreground">E-Wallet</span>
                  </label>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nomor Kartu</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nama di Kartu</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="JOHN DOE"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Tanggal Kadaluarsa</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-4 sticky top-20">
                <h2 className="text-xl font-semibold text-foreground">Ringkasan Pesanan</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Pengiriman</span>
                    <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Bayar Sekarang
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">Pembayaran Anda aman dan terenkripsi</p>

                <Link href="/cart" className="text-center text-sm text-primary hover:underline block">
                  Kembali ke Keranjang
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
