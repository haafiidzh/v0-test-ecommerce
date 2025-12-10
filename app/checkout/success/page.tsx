import Link from "next/link"
import Navbar from "@/components/navbar"
import { CheckCircle2, Package, Home } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-card rounded-lg shadow-lg p-8 sm:p-12 text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                <CheckCircle2 className="w-24 h-24 text-primary relative" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Pesanan Berhasil!</h1>
              <p className="text-muted-foreground text-lg">Terima kasih atas pembelian Anda</p>
            </div>

            {/* Order Number */}
            <div className="bg-muted rounded-lg p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Nomor Pesanan</p>
              <p className="text-2xl font-bold text-primary">{orderNumber}</p>
            </div>

            {/* Order Details */}
            <div className="text-left bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Pesanan Anda sedang diproses</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kami akan mengirimkan email konfirmasi dengan detail pesanan dan nomor tracking ke alamat email
                    Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/dashboard/orders"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <Package className="w-5 h-5" />
                Lihat Pesanan
              </Link>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
