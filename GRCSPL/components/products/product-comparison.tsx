import { Check, X } from "lucide-react"

interface ProductComparisonProps {
  product: {
    id: number
    name: string
    price: number
  }
}

// Mock comparison data
const comparisonData = {
  features: [
    { name: "Natural Ingredients", current: true, competitors: [true, false] },
    { name: "No Preservatives", current: true, competitors: [false, false] },
    { name: "Eco-Friendly Packaging", current: true, competitors: [true, false] },
    { name: "Money-Back Guarantee", current: true, competitors: [false, true] },
    { name: "Made in Tamil Nadu", current: true, competitors: [false, false] },
  ],
  competitors: [
    { name: "Competitor A", price: 1500 },
    { name: "Competitor B", price: 1100 },
  ],
}

export default function ProductComparison({ product }: ProductComparisonProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 bg-gray-50 border"></th>
              <th className="p-3 bg-[#39b54b]/10 border text-center font-bold">
                {product.name}
                <div className="font-normal">₹{product.price}</div>
              </th>
              {comparisonData.competitors.map((competitor, index) => (
                <th key={index} className="p-3 bg-gray-50 border text-center">
                  {competitor.name}
                  <div className="font-normal">₹{competitor.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.features.map((feature, index) => (
              <tr key={index}>
                <td className="p-3 border font-medium">{feature.name}</td>
                <td className="p-3 border text-center bg-[#39b54b]/5">
                  {feature.current ? (
                    <Check className="h-5 w-5 text-[#39b54b] mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </td>
                {feature.competitors.map((hasFeature, i) => (
                  <td key={i} className="p-3 border text-center">
                    {hasFeature ? (
                      <Check className="h-5 w-5 text-[#39b54b] mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
