import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Contact Information</h3>

      <div className="space-y-6">
        <div className="flex">
          <MapPin className="h-6 w-6 text-[#39b54b] mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Head Office</h4>
            <p className="text-gray-600">
              Periyanaikenpalayam
              <br />
              Coimbatore, Tamil Nadu 641020
              <br />
              India
            </p>
          </div>
        </div>

        <div className="flex">
          <Phone className="h-6 w-6 text-[#39b54b] mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Phone</h4>
            <p className="text-gray-600">
              Toll-Free:{" "}
              <a href="tel:+918925532450" className="hover:text-[#39b54b]">
                +91 892 553 2450
              </a>
              <br />
              Support:{" "}
              <a href="tel:+918000000001" className="hover:text-[#39b54b]">
                +91 8000 000 001
              </a>
            </p>
          </div>
        </div>

        <div className="flex">
          <Mail className="h-6 w-6 text-[#39b54b] mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Email</h4>
            <p className="text-gray-600">
              General Inquiries:{" "}
              <a href="mailto:office@grcspl.com" className="hover:text-[#39b54b]">
                office@grcspl.com
              </a>
              <br />
              Support:{" "}
              <a href="mailto:support@grcspl.com" className="hover:text-[#39b54b]">
                support@grcspl.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex">
          <Clock className="h-6 w-6 text-[#39b54b] mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Business Hours</h4>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 2:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-medium mb-3">Connect With Us</h4>
        <div className="flex space-x-3">
          <a href="tel:+918925532450">
          <Button className="bg-[#39b54b] hover:bg-[#2da03e] flex-1">
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </Button>
          </a>
          <a href="https://wa.me/+918925532450">
            <Button variant="outline" className="border-[#39b54b] text-[#39b54b] flex-1">
              <MessageSquare className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
