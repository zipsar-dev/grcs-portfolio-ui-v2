import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
      {description && <p className="mt-4 text-lg text-gray-600">{description}</p>}
      {children}
    </div>
  )
}
