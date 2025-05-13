// Mock leadership data
const leaders = [
  {
    id: 1,
    name: "Govintharan",
    title: "Founder & CEO",
    bio: "With over 25 years of experience in direct selling, Ramesh has built a company focused on empowering entrepreneurs in Tamil Nadu.",
    image: "/ceo.jpg",
  },
  {
    id: 2,
    name: "Selvi",
    title: "Chief Operating Officer",
    bio: "Lakshmi oversees day-to-day operations and has been instrumental in expanding our presence across Tamil Nadu.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Abishek",
    title: "Product Development Director",
    bio: "Vijay leads our product development team, ensuring we offer high-quality products that meet the needs of our customers.",
    image: "/cvo.jpg",
  },
  // {
  //   id: 4,
  //   name: "Priya Subramaniam",
  //   title: "Training & Development Head",
  //   bio: "Priya develops comprehensive training programs to help our associates build successful businesses.",
  //   image: "/placeholder.svg?height=300&width=300",
  // },
]

export default function Leadership() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Our Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {leaders.map((leader) => (
          <div key={leader.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="aspect-square overflow-hidden">
              <img src={leader.image || "/placeholder.svg"} alt={leader.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{leader.name}</h3>
              <p className="text-[#39b54b] mb-2">{leader.title}</p>
              <p className="text-gray-600 text-sm">{leader.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
