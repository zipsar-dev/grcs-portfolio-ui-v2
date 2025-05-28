import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

// Mock success stories
const successStories = [
  {
    id: 1,
    name: "Meena Krishnan",
    location: "Salem",
    story: "Former teacher who built a business earning ₹45,000 monthly while working part-time.",
    image: "/placeholder.svg?height=400&width=300",
    videoUrl: "#",
  },
  {
    id: 2,
    name: "Karthik Rajan",
    location: "Tirunelveli",
    story: "Started with zero business experience and now leads a team of 120 associates.",
    image: "/placeholder.svg?height=400&width=300",
    videoUrl: "#",
  },
  {
    id: 3,
    name: "Lakshmi & Suresh",
    location: "Erode",
    story: "Husband and wife team who built a business that allowed them to quit their corporate jobs.",
    image: "/placeholder.svg?height=400&width=300",
    videoUrl: "#",
  },
]

export default function SuccessStories() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
      <p className="text-gray-600 mb-8">
        Meet entrepreneurs from Tamil Nadu who have built successful businesses with our opportunity:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {successStories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <Button className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  <Play className="h-6 w-6 text-white" fill="white" />
                  <span className="sr-only">Play video</span>
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{story.name}</h3>
              <p className="text-[#39b54b] text-sm mb-3">{story.location}</p>
              <p className="text-gray-600">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
