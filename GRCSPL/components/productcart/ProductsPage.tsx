// components/ProductsPage.tsx
import React, { useState } from "react";
import {
  Grid,
  List,
  Search,
  Eye,
  Star,
  Plus,
  Trash2,
} from "lucide-react";

interface Product {
  name: string;
  category: string;
  src: string;
  code: string;
  mrp: number;
  discountPrice: number;
  businessValue: number;
  description: string;
  benefit: string;
  usageTips?: string;
  useTips?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductsPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
  openProductModal: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  addToCart,
  openProductModal,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}) => {
  const calculateDiscount = (mrp: number, discountPrice: number): number => {
    return Math.round(((mrp - discountPrice) / mrp) * 100);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 relative">
      {/* Search Bar & View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b] transition-all duration-300 bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="items-center space-x-4 bg-gray-50 rounded-2xl p-2 hidden sm:block">
          <span className="text-sm text-gray-600 font-medium px-2">View:</span>
          <button
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-[#39b54b] text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-white hover:shadow-md"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              viewMode === "list"
                ? "bg-[#39b54b] text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-white hover:shadow-md"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-xl text-gray-600 mb-2">No products found</p>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.code}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Discount Badge */}
                {calculateDiscount(product.mrp, product.discountPrice) > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {calculateDiscount(product.mrp, product.discountPrice)}% OFF
                  </div>
                )}
                {/* Stock Status */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock !== false
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock !== false ? "In Stock" : "Out of Stock"}
                </div>
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>
              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[#39b54b] bg-[#39b54b]/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-[#39b54b] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating ?? 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews ?? 0} reviews)
                  </span>
                </div>
                {/* Price and Actions */}
                <div className="space-y-3">
                  <div>
                    <span className="block text-gray-400 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-1 px-3 py-2 text-sm text-[#39b54b] border-2 border-[#39b54b] rounded-xl hover:bg-[#39b54b] hover:text-white transition-all duration-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        if (product.inStock) {
                          addToCart(product);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`flex-1 px-3 py-2 text-sm rounded-xl transition-all duration-300 ${
                        product.inStock
                          ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List view similar structure but horizontal layout
        <div className="space-y-6">
          {filteredProducts.map((product) => (
            <div
              key={product.code}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row border border-gray-100"
            >
              <div className="sm:w-1/3 aspect-square sm:aspect-auto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative">
                <img
                  src={product.src}
                  alt={product.name}
                  className="max-w-full max-h-48 object-contain"
                />
                {calculateDiscount(product.mrp, product.discountPrice) > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {calculateDiscount(product.mrp, product.discountPrice)}% OFF
                  </div>
                )}
              </div>
              <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#39b54b] bg-[#39b54b]/10 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        product.inStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews ?? 0} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-gray-400 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-4 py-2 text-[#39b54b] border-2 border-[#39b54b] rounded-xl hover:bg-[#39b54b] hover:text-white transition-all duration-300 flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => {
                        if (product.inStock) {
                          addToCart(product);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        product.inStock
                          ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;