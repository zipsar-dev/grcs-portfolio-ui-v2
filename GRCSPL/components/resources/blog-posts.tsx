"use client";
import React, { useState } from "react";
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  Search,
  Filter,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  X,
  ChevronLeft,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";

// Blog data from your provided content
const blogPosts = [
  {
    id: 1,
    title:
      "தமிழ்நாட்டில் நேரடி விற்பனை வணிகத்தின் எதிர்காலம் | The Future of Direct Selling in Tamil Nadu",
    excerpt:
      "Tamil Nadu's entrepreneurial spirit meets modern direct selling opportunities. Discover how local values and global business models create unprecedented success stories. | தமிழ்நாட்டின் வணிக மனப்பான்மையும் நவீன நேரடி விற்பனை வாய்ப்புகளும் எவ்வாறு வெற்றிக் கதைகளை உருவாக்குகின்றன என்பதைக் கண்டறியுங்கள்.",
    date: "2025-06-05",
    author: "Priya Rajendran",
    image:
      "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Business Opportunity",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title:
      "கமிஷன் பிளான் புரிந்துகொள்ளுதல் | Understanding Our Commission Structure",
    excerpt:
      "Break down of our transparent commission system - from starter bonuses to leadership rewards. Learn how dedication translates to financial freedom. | எங்கள் வெளிப்படையான கமிஷன் அமைப்பின் விரிவான விளக்கம் - தொடக்க போனஸ் முதல் தலைமைத்துவ வெகுமதிகள் வரை.",
    date: "2025-06-02",
    author: "Senthil Kumar",
    image:
      "https://plus.unsplash.com/premium_photo-1681292262511-988fd5a0ccd4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Commission & Earnings",
    readTime: "7 min read",
    featured: true,
  },
  {
    id: 3,
    title: "From Chennai to Success: Young Leaders Breaking Barriers",
    excerpt:
      "Meet the 25-year-old achievers who transformed their lives through network marketing. Their journey from college students to six-figure earners inspiring thousands across Tamil Nadu.",
    date: "2025-05-28",
    author: "Arun Mohanty",
    image:
      "https://images.unsplash.com/photo-1551892589-865f69869476?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Success Stories",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 4,
    title:
      "தமிழ் மண்ணின் தரமான பொருட்கள் | Quality Products Born from Tamil Soil",
    excerpt:
      "Our commitment to sourcing the finest ingredients from Tamil Nadu's rich agricultural heritage. Every product reflects our dedication to quality and tradition. | தமிழ்நாட்டின் வளமான விவசாய பாரம்பரியத்திலிருந்து சிறந்த மூலப்பொருட்களைத் தேர்ந்தெடுப்பதில் எங்கள் அர்ப்பணிப்பு.",
    date: "2025-05-25",
    author: "Dr. Meera Krishnan",
    image:
      "https://plus.unsplash.com/premium_photo-1682309834966-485aedc99be5?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Products & Quality",
    readTime: "4 min read",
  },
  {
    id: 5,
    title:
      "Money Management Skills for Network Marketers | பண மேலாண்மை திறன்கள்",
    excerpt:
      "Essential financial planning tips for direct sellers. Learn how to manage earnings, invest wisely, and build long-term wealth through smart money habits. | நேரடி விற்பனையாளர்களுக்கான அத்தியாவசிய நிதித் திட்டமிடல் குறிப்புகள்.",
    date: "2025-05-20",
    author: "CA Rajesh Natarajan",
    image:
      "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?q=80&w=3051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Financial Planning",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Leadership Lessons from Tamil Nadu's Top Performers",
    excerpt:
      "Discover the leadership principles that drive our highest achievers. From ancient Tamil wisdom to modern management techniques, learn what makes great leaders in network marketing.",
    date: "2025-05-15",
    author: "Kamala Sundaram",
    image:
      "https://plus.unsplash.com/premium_photo-1664474657823-328705da2bbf?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Leadership",
    readTime: "6 min read",
  },
  {
    id: 7,
    title:
      "Women Entrepreneurs Leading the Change | மாற்றத்தை வழிநடத்தும் பெண் தொழில்முனைவோர்",
    excerpt:
      "Celebrating the incredible women who are reshaping the direct selling industry in Tamil Nadu. Their stories of empowerment and financial independence inspire generations. | தமிழ்நாட்டில் நேரடி விற்பனைத் துறையை மறுவடிவமைக்கும் அற்புதமான பெண்களைக் கொண்டாடுதல்.",
    date: "2025-05-05",
    author: "Shanti Devi",
    image:
      "https://images.unsplash.com/photo-1633329712165-4e578376eb87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Women Empowerment",
    readTime: "5 min read",
  },
  {
    id: 8,
    title:
      "Digital Tools for Tamil Network Marketers | தமிழ் நெட்வொர்க் மார்க்கெட்டர்களுக்கான டிஜிட்டல் கருவிகள்",
    excerpt:
      "Master the digital landscape with Tamil-friendly tools and strategies. From WhatsApp marketing to social media success in regional languages. | பிராந்திய மொழிகளில் WhatsApp மார்க்கெட்டிங் முதல் சமூக ஊடக வெற்றி வரை.",
    date: "2025-04-25",
    author: "Tech Guru Vivek",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Digital Marketing",
    readTime: "7 min read",
  },
];

const categories = [
  "All",
  "Business Opportunity",
  "Commission & Earnings",
  "Success Stories",
  "Products & Quality",
  "Financial Planning",
  "Leadership",
];

const BlogUI = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  interface FormatDateOptions {
    year: "numeric";
    month: "long";
    day: "numeric";
  }

  const formatDate = (dateString: string): string => {
    const date: Date = new Date(dateString);
    const options: FormatDateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    image: string;
    category: string;
  }

  const handleReadMore = (post: BlogPost): void => {
    setSelectedPost(post);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareModal(false);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen ">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-gray-600 hover:text-[#39b54b] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Article Header */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"></img>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {selectedPost.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-6 text-sm opacity-90">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedPost.date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Article Actions */}
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center space-x-6">
                  <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-[#39b54b] transition-colors">
                    <Bookmark className="w-5 h-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div> */}
                <button
                  onClick={handleShare}
                  className="flex items-center bg-[#39b54b] text-white px-4 py-2 rounded-lg hover:bg-[#2d8a3a] transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="px-8 py-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {selectedPost.excerpt}
                </p>

                {/* Simulated article content */}
                <div className="space-y-6 text-gray-700">
                  <p>
                    Tamil Nadu has always been a land of entrepreneurial
                    excellence, where traditional business wisdom meets modern
                    opportunities. In the realm of direct selling, this
                    convergence creates extraordinary possibilities for
                    individuals seeking financial independence and personal
                    growth.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    வணிக வாய்ப்புகளின் புதிய சகாப்தம் | A New Era of Business
                    Opportunities
                  </h2>

                  <p>
                    The direct selling industry in Tamil Nadu is experiencing
                    unprecedented growth, driven by a combination of factors
                    including digital adoption, changing consumer preferences,
                    and the entrepreneurial spirit that runs deep in Tamil
                    culture.
                  </p>

                  <p>
                    தமிழ்நாட்டில் நேரடி விற்பனைத் துறை முன்னெப்போதும் இல்லாத
                    வளர்ச்சியைக் காண்கிறது. டிஜிட்டல் ஏற்புதல், மாறிவரும்
                    நுகர்வோர் விருப்பங்கள் மற்றும் தமிழ் கலாச்சாரத்தில் ஆழமாக
                    வேரூன்றியுள்ள தொழில்முனைவு உணர்வு ஆகியவற்றின் கலவையால் இது
                    உந்தப்படுகிறது.
                  </p>

                  <blockquote className="border-l-4 border-[#39b54b] pl-6 py-4 bg-gray-50 italic text-lg">
                    "Success in network marketing isn't just about selling
                    products; it's about building relationships, sharing values,
                    and creating communities that support each other's growth."
                  </blockquote>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Building Sustainable Success
                  </h2>

                  <p>
                    The key to long-term success in direct selling lies in
                    understanding that this business model is fundamentally
                    about people. It's about connecting with individuals,
                    understanding their needs, and providing solutions that
                    genuinely improve their lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Article</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Facebook className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Share on Facebook</span>
                </button>

                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Share on Twitter</span>
                </button>

                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-700 mr-3" />
                  <span>Share on LinkedIn</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Copy className="w-5 h-5 text-gray-600 mr-3" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tamil Nadu Network Marketing Blog
              </h1>
              <p className="text-gray-600 mt-1">
                தமிழ்நாடு நெட்வொர்க் மார்க்கெட்டிங் வலைப்பதிவு
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39b54b] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-[#39b54b] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-black bg-opacity-50">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#39b54b] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadMore(post)}
                    className="w-full bg-[#39b54b] text-white py-2 px-4 rounded-lg hover:bg-[#2d8a3a] transition-colors flex items-center justify-center group-hover:shadow-lg"
                  >
                    <span className="mr-2">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogUI;
