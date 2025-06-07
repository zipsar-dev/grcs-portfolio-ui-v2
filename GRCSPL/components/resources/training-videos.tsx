
"use client";
import { Button } from "@/components/ui/button";
import { Play, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

// Mock training videos with YouTube links
const trainingVideos: TrainingVideo[] = [
  {
    id: 1,
    title: "Getting Started with Your Business",
    description:
      "Learn the basics of setting up your business and making your first sales.",
    duration: "25 minutes",
    level: "Beginner",
    youtubeId: "OH33M3v8qV8", // Example YouTube video ID
    thumbnail: "https://img.youtube.com/vi/OH33M3v8qV8/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Product Knowledge Training",
    description:
      "Detailed information about our product range and their benefits.",
    duration: "45 minutes",
    level: "Intermediate",
    youtubeId: "-qBSWaN5TPk", // Example YouTube video ID
    thumbnail: "https://img.youtube.com/vi/-qBSWaN5TPk/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Building Your Team",
    description: "Strategies for recruiting and developing a successful team.",
    duration: "35 minutes",
    level: "Advanced",
    youtubeId: "Ziz67Wfz-j0", // Example YouTube video ID
    thumbnail: "https://img.youtube.com/vi/Ziz67Wfz-j0/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "Digital Marketing for Associates",
    description:
      "How to use social media and digital tools to grow your business.",
    duration: "40 minutes",
    level: "Intermediate",
    youtubeId: "oyzANSaBDgg", // Example YouTube video ID
    thumbnail: "https://img.youtube.com/vi/oyzANSaBDgg/maxresdefault.jpg",
  },
];

interface TrainingVideo {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  youtubeId: string;
  thumbnail: string;
}

export default function TrainingVideos() {
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(
    null
  );

  const openVideoModal = (video: TrainingVideo): void => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const getYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const getYouTubeWatchUrl = (videoId: string): string => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Training Videos</h2>
        {/* <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
          View All Videos
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => openVideoModal(video)}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-[#39b54b] border-[#39b54b]"
                  onClick={() => openVideoModal(video)}
                >
                  Watch Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 text-[#39b54b] border-[#39b54b]"
                  onClick={() =>
                    window.open(getYouTubeWatchUrl(video.youtubeId), "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">{selectedVideo.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeVideoModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="relative aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedVideo.duration}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedVideo.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : selectedVideo.level === "Intermediate"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {selectedVideo.level}
                </span>
              </div>
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
