// Mock timeline data
const timelineEvents = [
  {
    year: 2023,
    title: "Company Founded",
    description: "Started operations in Coimbatore with a small team of 5 people.",
  },
  {
    year: 2024,
    title: "Website Launch",
    description: "Launched our first website to connect with customers and associates.",
  },
  {
    year: 2025,
    title: "Website 2.0 Launch",
    description: "Upgraded our website with new features and improved user experience.",
  },
]

export default function Timeline() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Our Journey</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2"></div>

              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#39b54b] transform -translate-x-1/2 z-10"></div>

              <div className="pl-6 md:pl-0 md:w-1/2 md:px-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="inline-block px-3 py-1 rounded bg-[#39b54b]/10 text-[#39b54b] font-bold mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
