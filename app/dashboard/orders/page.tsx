"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, Clock, CheckCircle2, XCircle, Eye } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    id: string
    name: string
    image: string
    quantity: number
    price: number
  }[]
  total: number
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-ABC123",
    date: "2025-01-05",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Premium Cotton T-Shirt",
        image: "/mens-tshirt-blue.jpg",
        quantity: 2,
        price: 199000,
      },
    ],
    total: 423000,
  },
  {
    id: "2",
    orderNumber: "ORD-XYZ789",
    date: "2025-01-08",
    status: "shipped",
    items: [
      {
        id: "2",
        name: "Elegant Summer Dress",
        image: "/womens-dress-cyan.jpg",
        quantity: 1,
        price: 349000,
      },
      {
        id: "3",
        name: "Classic Accessories Bundle",
        image: "/accessories-bundle.jpg",
        quantity: 1,
        price: 249000,
      },
    ],
    total: 623000,
  },
  {
    id: "3",
    orderNumber: "ORD-QWE456",
    date: "2025-01-10",
    status: "processing",
    items: [
      {
        id: "4",
        name: "Urban Streetwear Hoodie",
        image: "/mens-hoodie-blue.jpg",
        quantity: 1,
        price: 449000,
      },
    ],
    total: 474000,
  },
]

const statusConfig = {
  pending: { label: "Menunggu", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  processing: { label: "Diproses", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  shipped: { label: "Dikirim", icon: Package, color: "text-primary", bg: "bg-primary/10" },
  delivered: { label: "Selesai", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  cancelled: { label: "Dibatalkan", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
}

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredOrders =
    selectedStatus === "all" ? mockOrders : mockOrders.filter((order) => order.status === selectedStatus)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pesanan Saya</h1>
        <p className="text-muted-foreground mt-2">Lihat dan kelola pesanan Anda</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card rounded-lg shadow-sm p-2 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedStatus === "all"
              ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Semua
        </button>
        {Object.entries(statusConfig).map(([status, config]) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedStatus === status
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon

            return (
              <div key={order.id} className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{order.orderNumber}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig[order.status].bg}`}
                    >
                      <StatusIcon className={`w-4 h-4 ${statusConfig[order.status].color}`} />
                      <span className={`text-sm font-medium ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                    <p className="text-xl font-bold text-primary">Rp {order.total.toLocaleString("id-ID")}</p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Detail
                    </Link>
                    {order.status === "delivered" && (
                      <Link
                        href={`/product/${order.items[0].id}`}
                        className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all"
                      >
                        Beli Lagi
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-card rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Tidak ada pesanan dengan status ini</p>
          </div>
        )}
      </div>
    </div>
  )
}
