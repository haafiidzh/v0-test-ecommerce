"use client"

import { useState } from "react"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"

interface Address {
  id: string
  label: string
  recipient: string
  phone: string
  fullAddress: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Rumah",
      recipient: "John Doe",
      phone: "08123456789",
      fullAddress: "Jl. Merdeka No. 123, RT 01/RW 05",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "10110",
      isDefault: true,
    },
    {
      id: "2",
      label: "Kantor",
      recipient: "John Doe",
      phone: "08123456789",
      fullAddress: "Jl. Sudirman No. 456, Lantai 12",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12190",
      isDefault: false,
    },
  ])

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })))
  }

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alamat Pengiriman</h1>
          <p className="text-muted-foreground mt-2">Kelola alamat pengiriman Anda</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          Tambah Alamat
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-card rounded-lg shadow-sm p-6 space-y-4">
            {/* Address Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{address.label}</h3>
                  {address.isDefault && (
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded mt-1">
                      Alamat Utama
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" aria-label="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{address.recipient}</p>
              <p>{address.phone}</p>
              <p>{address.fullAddress}</p>
              <p>
                {address.city}, {address.province} {address.postalCode}
              </p>
            </div>

            {/* Set Default Button */}
            {!address.isDefault && (
              <button
                onClick={() => setDefaultAddress(address.id)}
                className="w-full py-2 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-all"
              >
                Jadikan Alamat Utama
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
