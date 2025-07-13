import React from "react";
import Link from "next/link";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Welcome to Raintor
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your location in real-time, connect with friends, and explore
            your community like never before.
          </p>
          <Link
            href="/location-sharing"
            className="inline-block bg-indigo-200 text-indigo-900 px-6 py-3 rounded-lg font-medium hover:bg-indigo-300 transition-colors duration-300"
          >
            Start Sharing Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Raintor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Real-Time Location Sharing */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Real-Time Location Sharing
              </h3>
              <p className="text-gray-600">
                Share your live location with friends and family securely and
                effortlessly.
              </p>
            </div>
            {/* Feature 2: User Feed */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Dynamic User Feed
              </h3>
              <p className="text-gray-600">
                Stay updated with posts, updates, and activities from your
                community in real-time.
              </p>
            </div>
            {/* Feature 3: Community Connection */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Connect with Your Community
              </h3>
              <p className="text-gray-600">
                Discover nearby events, meet new people, and build meaningful
                connections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
