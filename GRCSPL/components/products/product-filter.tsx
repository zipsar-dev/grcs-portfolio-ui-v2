"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

// Categories based on your data format
const categories = [
  { id: "HOME CARE", name: "Home Care", count: 28 },
  { id: "HEALTH CARE", name: "Health Care", count: 22 },
  { id: "PERSONAL CARE", name: "Personal Care", count: 35 },
  { id: "AUTO CARE", name: "Auto Care", count: 15 },
]

// Price ranges in Indian Rupees
const priceRanges = [
  { id: "under-200", name: "Under ₹200", min: 0, max: 200 },
  { id: "200-500", name: "₹200 - ₹500", min: 200, max: 500 },
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

  const applyFilters = () => {
    // Here you would typically emit the filter data to parent component
    const filterData = {
      categories: selectedCategories,
      priceRange: selectedPriceRange,
    }
    console.log("Applied filters:", filterData)
    // You can pass this data to a callback function or emit an event
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">Filters</h3>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800 hover:text-gray-600"
          onClick={() => toggleSection("categories")}
        >
          Categories
          {openSections.categories ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <button 
                  className="flex items-center w-full text-left hover:bg-gray-50 p-1 rounded"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div
                    className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${
                      selectedCategories.includes(category.id) 
                        ? "bg-blue-600 border-blue-600" 
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {selectedCategories.includes(category.id) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-gray-700 flex-1">{category.name}</span>
                  <span className="text-gray-500 text-sm">({category.count})</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800 hover:text-gray-600"
          onClick={() => toggleSection("price")}
        >
          Price Range
          {openSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center">
                <button 
                  className="flex items-center w-full text-left hover:bg-gray-50 p-1 rounded"
                  onClick={() => togglePriceRange(range.id)}
                >
                  <div
                    className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center transition-colors ${
                      selectedPriceRange === range.id 
                        ? "border-blue-600" 
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {selectedPriceRange === range.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{range.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        
        {(selectedCategories.length > 0 || selectedPriceRange) && (
          <div className="text-sm text-gray-600 mt-2">
            {selectedCategories.length > 0 && (
              <div>Categories: {selectedCategories.join(", ")}</div>
            )}
            {selectedPriceRange && (
              <div>Price: {priceRanges.find(r => r.id === selectedPriceRange)?.name}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}