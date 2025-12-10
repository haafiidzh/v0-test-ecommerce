export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  description: string
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 199000,
    image: "/mens-tshirt-blue.jpg",
    category: "Pria",
    rating: 5,
    description: "Kenyamanan maksimal dengan material cotton premium berkualitas tinggi.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Biru", "Hitam", "Putih"],
    inStock: true,
  },
  {
    id: "2",
    name: "Elegant Summer Dress",
    price: 349000,
    image: "/womens-summer-dress.jpg",
    category: "Wanita",
    rating: 5,
    description: "Dress musim panas yang elegan dan nyaman untuk berbagai acara.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Putih", "Merah", "Navy"],
    inStock: true,
  },
  {
    id: "3",
    name: "Classic Accessories Bundle",
    price: 249000,
    image: "/accessories-bundle.jpg",
    category: "Aksesoris",
    rating: 4,
    description: "Paket aksesori lengkap untuk melengkapi penampilan Anda.",
    sizes: ["One Size"],
    colors: ["Multi"],
    inStock: true,
  },
  {
    id: "4",
    name: "Slim Fit Jeans",
    price: 299000,
    image: "/mens-slim-jeans.jpg",
    category: "Pria",
    rating: 4,
    description: "Jeans slim fit dengan potongan sempurna untuk tampilan modern.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Wash", "Light Wash", "Black"],
    inStock: true,
  },
  {
    id: "5",
    name: "Casual Hoodie",
    price: 279000,
    image: "/hoodie-casual.jpg",
    category: "Pria",
    rating: 5,
    description: "Hoodie nyaman untuk hari biasa dengan desain minimalis modern.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Hitam", "Abu-abu", "Navy"],
    inStock: true,
  },
  {
    id: "6",
    name: "Stylish Sneakers",
    price: 459000,
    image: "/white-sneakers.jpg",
    category: "Aksesoris",
    rating: 5,
    description: "Sneakers trendi yang cocok untuk berbagai gaya pakaian.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    colors: ["Putih", "Hitam", "Abu-abu"],
    inStock: true,
  },
  {
    id: "7",
    name: "Women's Blazer",
    price: 399000,
    image: "/womens-blazer.jpg",
    category: "Wanita",
    rating: 4,
    description: "Blazer formal dan stylish untuk tampilan profesional.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Hitam", "Putih", "Krem"],
    inStock: true,
  },
  {
    id: "8",
    name: "Premium Sunglasses",
    price: 349000,
    image: "/stylish-sunglasses.png",
    category: "Aksesoris",
    rating: 5,
    description: "Kacamata hitam premium dengan desain elegan dan perlindungan UV.",
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Gold"],
    inStock: true,
  },
]

export function getProductById(id: string) {
  return mockProducts.find((p) => p.id === id)
}

export function getProductsByCategory(category: string) {
  return mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}
