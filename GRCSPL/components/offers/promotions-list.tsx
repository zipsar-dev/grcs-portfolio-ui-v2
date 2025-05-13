import { Button } from "@/components/ui/button"
import { Clock, Tag } from "lucide-react"

// Mock promotions data
const promotions = [
  {
    id: 1,
    title: "New Associate Welcome Pack",
    description: "Get 20% off on your first product order when you register as a new associate.",
    validUntil: "2023-06-30",
    code: "WELCOME20",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free on Health Supplements",
    description: "Purchase any two health supplements and get the third one free.",
    validUntil: "2023-05-31",
    code: "HEALTH3FOR2",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Refer a Friend Bonus",
    description: "Earn ₹1,000 bonus when you refer a friend who registers as an associate.",
    validUntil: "2023-12-31",
    code: "REFER1000",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "Summer Special: 15% Off on All Beauty Products",
    description: "Enjoy 15% discount on our entire range of beauty and personal care products.",
    validUntil: "2023-07-15",
    code: "SUMMER15",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function PromotionsList() {
  return (
    <div className="space-y-8">
      {promotions.map((promotion) => (
        <div key={promotion.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <img
                src={promotion.image || "/placeholder.svg"}
                alt={promotion.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">{promotion.title}</h3>
              <p className="text-gray-600 mb-4">{promotion.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-[#39b54b]" />
                  <span>
                    Valid until:{" "}
                    {new Date(promotion.validUntil).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-2 text-[#39b54b]" />
                  <span>
                    Code: <strong>{promotion.code}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#39b54b] hover:bg-[#2da03e]">Claim Offer</Button>
                <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
