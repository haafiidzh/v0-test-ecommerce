"use client"

import { useState } from "react"
import { Lock, Bell, Globe } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newsletter: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-2">Kelola preferensi akun Anda</p>
      </div>

      {/* Password Section */}
      <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Keamanan</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password Lama</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan password lama"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password Baru</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan password baru"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Konfirmasi Password Baru</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Konfirmasi password baru"
            />
          </div>

          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all">
            Ubah Password
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Notifikasi</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Notifikasi Email", description: "Terima update melalui email" },
            { key: "smsNotifications", label: "Notifikasi SMS", description: "Terima update melalui SMS" },
            {
              key: "orderUpdates",
              label: "Update Pesanan",
              description: "Notifikasi tentang status pesanan Anda",
            },
            { key: "promotions", label: "Promosi & Diskon", description: "Info tentang penawaran spesial" },
            { key: "newsletter", label: "Newsletter", description: "Berita dan tips fashion terbaru" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Bahasa & Wilayah</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bahasa</label>
            <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mata Uang</label>
            <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="idr">IDR (Rp)</option>
              <option value="usd">USD ($)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
