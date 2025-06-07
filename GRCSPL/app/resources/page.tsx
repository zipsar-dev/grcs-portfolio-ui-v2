import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import TrainingVideos from "@/components/resources/training-videos"
import BlogPosts from "@/components/resources/blog-posts"
import DownloadableMaterials from "@/components/resources/downloadable-materials"

export const metadata: Metadata = {
  title: "Resource Center | Business Opportunities in Tamil Nadu",
  description: "Access training videos, blogs, and downloadable materials",
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Resource Center"
        description="Access training materials, blogs, and resources to help you succeed"
      />

      <div className="mt-12 space-y-16">
        <TrainingVideos />
        <BlogPosts />
        {/* <DownloadableMaterials /> */}
      </div>
    </div>
  )
}
