import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/products/product-detail"
import ProductComparison from "@/components/products/product-comparison"
import RelatedProducts from "@/components/products/related-products"

// This would be replaced with actual data fetching
const getProduct = (slug: string) => {
  // Mock data
  const products = [
    { id: 1, slug: "product-1", name: "Product 1", description: "Description for product 1", price: 1000 },
    { id: 2, slug: "product-2", name: "Product 2", description: "Description for product 2", price: 2000 },
  ]

  return products.find((product) => product.slug === slug)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.name} | Business Opportunities in Tamil Nadu`,
    description: product.description,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      <ProductComparison product={product} />
      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}
