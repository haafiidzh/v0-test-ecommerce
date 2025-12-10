import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg">StyleHub</span>
            </div>
            <p className="text-sm text-muted-foreground">Temukan gaya fashion terbaik Anda bersama kami.</p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Belanja</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=pria" className="text-muted-foreground hover:text-primary transition-colors">
                  Pria
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=wanita"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Wanita
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=aksesoris"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Aksesoris
                </Link>
              </li>
            </ul>
          </div>

          {/* Akun */}
          <div className="space-y-3">
            <h4 className="font-semibold">Akun</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Pesanan Saya
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div className="space-y-3">
            <h4 className="font-semibold">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-muted-foreground">hello@stylehub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-muted-foreground">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-muted-foreground">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 StyleHub. Semua hak dilindungi.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
