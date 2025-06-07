"use client";
import { User, Crown, Settings, Lightbulb, Star, Award } from "lucide-react";

// Mock leadership data with icons instead of images
const leaders = [
  {
    id: 1,
    name: "Mr.Govintharajan",
    title: "Founder & CEO",
    bio: "With 20+ years of experience, our visionary CEO leads with passion, empowering entrepreneurs across Tamil Nadu by creating sustainable opportunities through a trusted network marketing model in daily-use FMCG.",
    icon: Crown,
    gradient: "from-purple-500 to-pink-500",
    achievements: ["20+ Years Experience", "Industry Pioneer", "Strategic Visionary"]
  },
  {
    id: 2,
    name: "Mrs.Selvi",
    title: "Chief Operating Officer",
    bio: "A futuristic operational strategist, the COO drives seamless daily functions, ensuring efficient distribution, associate support, and scalable growth across Tamil Nadu, enhancing the impact of our FMCG product network.",
    icon: Settings,
    gradient: "from-blue-500 to-cyan-500",
    achievements: ["Operations Expert", "Tamil Nadu Expansion", "Process Optimization"]
  },
  {
    id: 3,
    name: "Mr.Abishek",
    title: "Product Development Director",
    bio: "An expert in product innovation, the Director ensures every FMCG item is crafted from the customer's perspective—delivering quality, relevance, and value for everyday use in Tamil Nadu households.",
    icon: Lightbulb,
    gradient: "from-orange-500 to-red-500",
    achievements: ["Innovation Leader", "Quality Assurance", "Customer-Focused"]
  },
]

export default function Leadership() {
  return (
    <section className="mt-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#39b54b] to-[#2da03e] rounded-full mb-6">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Our Leadership Team
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the visionary leaders driving our company's success and innovation
        </p>
      </div>

      {/* Leadership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {leaders.map((leader, index) => {
          const IconComponent = leader.icon;
          return (
            <div 
              key={leader.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
              
              {/* Card Content */}
              <div className="relative p-8">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${leader.gradient} rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Floating decoration */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center transform group-hover:scale-125 transition-transform duration-300">
                    <Star className="w-3 h-3 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Leader Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#39b54b] transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#39b54b]/10 to-[#2da03e]/10 rounded-full">
                    <p className="text-[#39b54b] font-semibold text-sm">
                      {leader.title}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-center leading-relaxed mb-6 line-clamp-4">
                  {leader.bio}
                </p>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">Key Achievements</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {leader.achievements.map((achievement, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-[#39b54b] hover:text-white transition-colors duration-300 cursor-default"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${leader.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${leader.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#39b54b]/5 to-[#2da03e]/5 rounded-2xl px-8 py-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#39b54b] to-[#2da03e] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Join Our Leadership Journey</h3>
            <p className="text-gray-600 text-sm">Become part of our growing success story</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}