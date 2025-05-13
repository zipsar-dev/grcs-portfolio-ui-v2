export default function ContactMap() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Our Locations</h3>

      <div className="aspect-[16/9] rounded-lg overflow-hidden">
        {/* This would be replaced with an actual map component */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Chennai Office</h4>
          <p className="text-gray-600 text-sm">
            123 Business Street, T. Nagar
            <br />
            Chennai, Tamil Nadu 600017
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Coimbatore Office</h4>
          <p className="text-gray-600 text-sm">
            456 Business Avenue, RS Puram
            <br />
            Coimbatore, Tamil Nadu 641002
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Madurai Office</h4>
          <p className="text-gray-600 text-sm">
            789 Business Boulevard, Anna Nagar
            <br />
            Madurai, Tamil Nadu 625020
          </p>
        </div>
      </div>
    </div>
  )
}
