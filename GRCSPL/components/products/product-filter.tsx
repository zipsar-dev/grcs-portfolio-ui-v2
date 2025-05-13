"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock category data
const categories = [
  { id: "health", name: "Health & Wellness", count: 24 },
  { id: "beauty", name: "Beauty & Personal Care", count: 18 },
  { id: "home", name: "Home Care", count: 12 },
  { id: "food", name: "Food & Nutrition", count: 15 },
  { id: "agriculture", name: "Agricultural Products", count: 8 },
]

// Mock price ranges
const priceRanges = [
  { id: "under-500", name: "Under ₹500", min: 0, max: 500 },
  { id: "500-1000", name: "₹500 - ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", name: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { id: "over-2000", name: "Over ₹2,000", min: 2000, max: Number.POSITIVE_INFINITY },
]

export default function ProductFilter() {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)

  const toggleSection = (section: "categories" | "price") => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    })
  }

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRange(selectedPriceRange === rangeId ? null : rangeId)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRange(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button
          variant="ghost"
          className="text-sm text-[#39b54b] hover:text-[#2da03e] p-0 h-auto"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div className="border-b pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium"
          onClick={() => toggleSection("categories")}
        >
          Categories
          {openSections.categories ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {openSections.categories && (
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <button className="flex items-center w-full text-left" onClick={() => toggleCategory(category.id)}>
                  <div
                    className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${
                      selectedCategories.includes(category.id) ? "bg-[#39b54b] border-[#39b54b]" : "border-gray-300"
                    }`}
                  >
                    {selectedCategories.includes(category.id) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-gray-700">{category.name}</span>
                  <span className="ml-auto text-gray-500 text-sm">({category.count})</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium"
          onClick={() => toggleSection("price")}
        >
          Price Range
          {openSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {openSections.price && (
          <div className="mt-2 space-y-2">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center">
                <button className="flex items-center w-full text-left" onClick={() => togglePriceRange(range.id)}>
                  <div
                    className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                      selectedPriceRange === range.id ? "border-[#39b54b]" : "border-gray-300"
                    }`}
                  >
                    {selectedPriceRange === range.id && <div className="w-3 h-3 rounded-full bg-[#39b54b]"></div>}
                  </div>
                  <span className="text-gray-700">{range.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button className="w-full bg-[#39b54b] hover:bg-[#2da03e]">Apply Filters</Button>
      </div>
    </div>
  )
}
