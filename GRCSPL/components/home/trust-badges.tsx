const badges = [
  {
    id: 1,
    name: "ISO Certified",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Quality Assured",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Made in India",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Eco Friendly",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Trusted by 10,000+ Customers",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function TrustBadges() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trusted Quality</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center">
              <img src={badge.image || "/placeholder.svg"} alt={badge.name} className="h-16 w-16 object-contain mb-2" />
              <span className="text-sm text-gray-600">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
