"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AssociatePortalPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      // This would be replaced with the actual login URL
      window.location.href = "https://user.grcspl.com/"
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="flex flex-col items-center justify-center text-center">
        <Loader2 className="h-16 w-16 animate-spin text-[#39b54b]" />
        <h1 className="mt-6 text-3xl font-bold">Redirecting to User Dashboard Portal</h1>
        <p className="mt-2 text-gray-600">Please wait while we redirect you to the login page...</p>
      </div>
    </div>
  )
}
