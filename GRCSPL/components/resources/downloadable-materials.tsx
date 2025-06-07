import { Button } from "@/components/ui/button"
import { FileText, Download, FileImage, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"

// Mock downloadable materials
const materials = [
  {
    id: 1,
    title: "Business Opportunity Brochure",
    description: "Comprehensive guide to our business opportunity and compensation plan.",
    type: "pdf",
    size: "2.4 MB",
    icon: <FilePdf className="h-10 w-10 text-red-500" />,
  },
  {
    id: 2,
    title: "Product Catalog",
    description: "Complete catalog of all our products with details and pricing.",
    type: "pdf",
    size: "5.1 MB",
    icon: <FilePdf className="h-10 w-10 text-red-500" />,
  },
  {
    id: 3,
    title: "Marketing Materials Pack",
    description: "Collection of images and graphics for social media marketing.",
    type: "zip",
    size: "15.8 MB",
    icon: <FileImage className="h-10 w-10 text-purple-500" />,
  },
  {
    id: 4,
    title: "Income Tracking Spreadsheet",
    description: "Excel template to track your sales, team performance, and income.",
    type: "xlsx",
    size: "1.2 MB",
    icon: <FileSpreadsheet className="h-10 w-10 text-green-500" />,
  },
  {
    id: 5,
    title: "Business Plan Template",
    description: "Customizable template to create your business plan and goals.",
    type: "docx",
    size: "850 KB",
    icon: <FileText className="h-10 w-10 text-blue-500" />,
  },
  {
    id: 6,
    title: "Training Presentation",
    description: "Presentation slides from our latest product and business training.",
    type: "pptx",
    size: "3.5 MB",
    icon: <FileText className="h-10 w-10 text-orange-500" />,
  },
]

export default function DownloadableMaterials() {
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Downloadable Materials</h2>
        {/* <Button variant="outline" className="border-[#39b54b] text-[#39b54b]">
          View All Resources
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-md p-4 flex">
            <div className="mr-4 flex-shrink-0">{material.icon}</div>
            <div className="flex-grow">
              <h3 className="font-bold mb-1">{material.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{material.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">
                  {material.type.toUpperCase()} • {material.size}
                </span>
                <Button variant="ghost" className="p-1 h-auto text-[#39b54b] hover:text-[#2da03e]">
                  <Download className="h-5 w-5" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
