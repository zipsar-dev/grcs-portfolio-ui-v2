import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"

// Mock training videos
const trainingVideos = [
  {
    id: 1,
    title: "Getting Started with Your Business",
    description: "Learn the basics of setting up your business and making your first sales.",
    duration: "25 minutes",
    level: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 2,
    title: "Product Knowledge Training",
    description: "Detailed information about our product range and their benefits.",
    duration: "45 minutes",
    level: "Intermediate",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 3,
    title: "Building Your Team",
    description: "Strategies for recruiting and developing a successful team.",
    duration: "35 minutes",
    level: "Advanced",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 4,
    title: "Digital Marketing for Associates",
    description: "How to use social media and digital tools to grow your business.",
    duration: "40 minutes",
    level: "Intermediate",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
]

export default function TrainingVideos() {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Training Videos</h2>
        <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
          View All Videos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all ease-in">
            <div className="relative">
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <Button className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  <Play className="h-5 w-5 text-white" fill="white" />
                  <span className="sr-only">Play video</span>
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <div className="flex items-center text-white text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{video.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    video.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : video.level === "Intermediate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {video.level}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{video.description}</p>
              <Button variant="outline" className="w-full text-[#39b54b] border-[#39b54b]">
                Watch Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
