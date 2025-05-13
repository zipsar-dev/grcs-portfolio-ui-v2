"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Truck, ShieldCheck, RefreshCw, Share2, Heart, Minus, Plus } from "lucide-react"

interface ProductDetailProps {
  product: {
    id: number
    slug: string
    name: string
    description: string
    price: number
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-lg overflow-hidden border">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-white rounded border overflow-hidden">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt={`${product.name} view ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(24 reviews)</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">₹{product.price}</div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-center mb-4">
              <div className="mr-8">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button className="p-2 border rounded-l-md" onClick={decreaseQuantity}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    id="quantity"
                    className="w-12 text-center border-t border-b"
                    value={quantity}
                    readOnly
                  />
                  <button className="p-2 border rounded-r-md" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                <div className="text-xl font-bold">₹{(product.price * quantity).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 bg-[#39b54b] hover:bg-[#2da03e]">Add to Cart</Button>
              <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-2 text-[#39b54b]" />
              <span>Free delivery on orders over ₹1000</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ShieldCheck className="h-5 w-5 mr-2 text-[#39b54b]" />
              <span>Quality guaranteed</span>
            </div>
            <div className="flex items-center text-gray-600">
              <RefreshCw className="h-5 w-5 mr-2 text-[#39b54b]" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b">
          <div className="flex space-x-8">
            <button
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "description"
                  ? "border-[#39b54b] text-[#39b54b]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "specifications"
                  ? "border-[#39b54b] text-[#39b54b]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-[#39b54b] text-[#39b54b]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (24)
            </button>
          </div>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>
                This premium product is designed to provide maximum benefits with natural ingredients sourced from Tamil
                Nadu. Our rigorous quality control ensures that you receive only the best.
              </p>
              <p className="mt-4">Key benefits include:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Made with 100% natural ingredients</li>
                <li>No artificial preservatives or additives</li>
                <li>Manufactured in state-of-the-art facilities</li>
                <li>Tested for purity and effectiveness</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-gray-900 w-1/4">Weight</th>
                    <td className="py-2 text-gray-600">250g</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-gray-900 w-1/4">Dimensions</th>
                    <td className="py-2 text-gray-600">10 × 5 × 5 cm</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-gray-900 w-1/4">Ingredients</th>
                    <td className="py-2 text-gray-600">Natural extracts, herbal compounds</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-gray-900 w-1/4">Shelf Life</th>
                    <td className="py-2 text-gray-600">24 months</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-gray-900 w-1/4">Storage</th>
                    <td className="py-2 text-gray-600">Store in a cool, dry place</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">Customer Name</div>
                      <div className="text-gray-500 text-sm">2 months ago</div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600">
                      This product exceeded my expectations. The quality is excellent and it delivers on all its
                      promises. I've already recommended it to my friends and family.
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
                  Load More Reviews
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
