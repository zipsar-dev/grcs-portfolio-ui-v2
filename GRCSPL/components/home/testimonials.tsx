import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Miss.Suganya Ganesh",
    location: "Coimbatore",
    quote:
      "Joining this business opportunity was the best decision I made. The training and support have been exceptional, and my income has grown steadily over the past year.",
    rating: 5,
    image: "/testimonial/female.jpg", // Replace with actual image paths
  },
  {
    id: 2,
    name: "Mr. Sarran",
    location: "Coimbatore",
    quote:
      "I started as a part-time associate while working my regular job. Now I've built a team and run this business full-time. The products are excellent and customers keep coming back.",
    rating: 5,
    image: "/testimonial/male.jpg",
  },
  {
    id: 3,
    name: "Arumugam",
    location: "Madurai",
    quote:
      "The business model is straightforward and the company provides all the tools needed to succeed. I've been able to create a sustainable income for my family.",
    rating: 4,
    image: "/testimonial/male.jpg",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from entrepreneurs who have built successful businesses in Tamil Nadu
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mr-2 rounded-full p-2">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" className="rounded-full p-2">
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
