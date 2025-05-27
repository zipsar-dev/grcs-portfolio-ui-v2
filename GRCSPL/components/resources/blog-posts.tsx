import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: "How to Build a Successful Business in Tamil Nadu",
    excerpt: "Learn the key strategies that successful entrepreneurs in Tamil Nadu use to build thriving businesses.",
    date: "2023-04-15",
    author: "Ramesh Kumar",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 2,
    title: "Understanding the Benefits of Our Health Products",
    excerpt: "A detailed look at the science behind our health supplements and how they can benefit your customers.",
    date: "2023-04-08",
    author: "Dr. Lakshmi Subramaniam",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 3,
    title: "Digital Marketing Tips for Direct Sellers",
    excerpt: "Practical advice on how to use social media and digital tools to grow your direct selling business.",
    date: "2023-03-25",
    author: "Vijay Prakash",
    image: "/placeholder.svg?height=200&width=350",
  },
]

export default function BlogPosts() {
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
          View All Posts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all ease-in">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
              </div>

              <Link href="#">
                <Button variant="link" className="p-0 h-auto text-[#39b54b] hover:text-[#2da03e]">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
