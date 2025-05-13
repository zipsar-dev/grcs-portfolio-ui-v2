import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedProductsProps {
  currentProductId: number
}

// Mock related products
const relatedProducts = [
  {
    id: 7,
    slug: "product-7",
    name: "Herbal Face Wash",
    description: "Gentle face wash with natural herbs.",
    price: 350,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    slug: "product-8",
    name: "Immunity Booster",
    description: "Daily supplement for enhanced immunity.",
    price: 850,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 9,
    slug: "product-9",
    name: "Natural Shampoo",
    description: "Chemical-free shampoo for healthy hair.",
    price: 450,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 10,
    slug: "product-10",
    name: "Herbal Tea",
    description: "Relaxing herbal tea blend.",
    price: 250,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Filter out the current product if it's in the related products list
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProductId)

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="rounded-full p-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" className="rounded-full p-2">
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
          >
            <Link href={`/products/${product.slug}`}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="text-lg font-semibold mb-1 hover:text-[#39b54b] transition-colors">{product.name}</h3>
              </Link>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                <Button className="bg-[#39b54b] hover:bg-[#2da03e]">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
