import { Link } from "react-router-dom";

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-indigo-600 font-bold text-2xl">NaukriNow</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 mb-8">
            {description || "This page is coming soon. We're working on it!"}
          </p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Return home
          </Link>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NaukriNow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PlaceholderPage;