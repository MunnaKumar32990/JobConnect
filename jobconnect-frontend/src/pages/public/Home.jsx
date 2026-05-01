export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-4">JobConnect</h1>
        <p className="text-xl text-blue-100 mb-8">
          Find your perfect job or hire the best talent
        </p>
        <div className="space-x-4">
          <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </a>
          <a href="/login" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
