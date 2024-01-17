import Link from "next/link"

export default function Component() {
    return (
      <footer className="w-full py-8 bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center justify-center sm:justify-start">
            <Link href="#">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/082/093/small/cute-shiba-inu-dog-paws-up-over-wall-illustration-vector.jpg" className="h-10" />

              <span className="sr-only">A-Z Dawgs</span>
            </Link>
          </div>
          <div className="flex items-center justify-center sm:justify-start sm:col-span-2 lg:col-span-1 space-x-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-sm">Subscribe to our newsletter:</p>
              <div className="flex items-center space-x-2">
                <input
                  className="w-full sm:w-48 lg:w-64 py-2 px-3 rounded-md bg-white text-gray-800"
                  placeholder="Enter your email"
                />
                <button className="py-2 px-4 rounded-md bg-white text-gray-800 hover:bg-gray-200">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start lg:justify-end sm:col-span-2 lg:col-span-1 space-x-4">
            <p className="text-sm">© 2024 A-Z Dawgs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }