import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import ProductFilter from "@/components/products/product-filter"
import ProductGrid from "@/components/products/product-grid"

export const metadata: Metadata = {
  title: "Products | Business Opportunities in Tamil Nadu",
  description: "Browse our range of products available in Tamil Nadu",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Our Products" description="Explore our range of high-quality products" />

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* <div className="w-full md:w-1/4">
          <ProductFilter />
        </div> */}
        <div className="w-full md:w-4/4">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
