"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users } from "lucide-react"

// Mock event data
const events = [
  {
    id: 1,
    title: "Business Opportunity Seminar",
    date: "2023-05-15",
    time: "10:00 AM - 12:00 PM",
    location: "Hotel Grand, Chennai",
    type: "seminar",
    capacity: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Product Training Workshop",
    date: "2023-05-18",
    time: "2:00 PM - 5:00 PM",
    location: "Business Center, Coimbatore",
    type: "training",
    capacity: 50,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Leadership Development",
    date: "2023-05-22",
    time: "9:00 AM - 4:00 PM",
    location: "Conference Hall, Madurai",
    type: "workshop",
    capacity: 30,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Product Launch Event",
    date: "2023-05-25",
    time: "6:00 PM - 8:00 PM",
    location: "Grand Ballroom, Chennai",
    type: "launch",
    capacity: 200,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Business Success Stories",
    date: "2023-05-29",
    time: "11:00 AM - 1:00 PM",
    location: "Community Center, Trichy",
    type: "seminar",
    capacity: 80,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Get current month and year
const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

export default function EventCalendar() {
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)
  const [view, setView] = useState<"calendar" | "list">("list")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={previousMonth} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous month</span>
          </Button>
          <h3 className="text-xl font-bold">
            {monthNames[month]} {year}
          </h3>
          <Button variant="outline" onClick={nextMonth} className="ml-2">
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            onClick={() => setView("calendar")}
            className={view === "calendar" ? "bg-[#39b54b] hover:bg-[#2da03e]" : ""}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Calendar
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className={view === "list" ? "bg-[#39b54b] hover:bg-[#2da03e]" : ""}
          >
            <Users className="h-5 w-5 mr-2" />
            List
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-[#39b54b]" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-[#39b54b]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-[#39b54b]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-[#39b54b]" />
                        <span>Capacity: {event.capacity} people</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#39b54b]/10 text-[#39b54b] mb-4">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button className="bg-[#39b54b] hover:bg-[#2da03e]">Register Now</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium p-2">
                {day}
              </div>
            ))}

            {/* Calendar days would be generated here */}
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className={`p-2 min-h-[80px] border ${index % 7 === 0 || index % 7 === 6 ? "bg-gray-50" : ""}`}
              >
                <div className="font-medium">{(index % 30) + 1}</div>
                {index === 14 && (
                  <div className="mt-1 p-1 text-xs bg-[#39b54b]/10 text-[#39b54b] rounded">Business Seminar</div>
                )}
                {index === 17 && (
                  <div className="mt-1 p-1 text-xs bg-[#39b54b]/10 text-[#39b54b] rounded">Product Training</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
