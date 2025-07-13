import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-5 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Raintor Text */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-extrabold tracking-tight">
            Raintor
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/location-sharing"
            className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300"
          >
            Location Sharing
          </Link>
          <Link
            href="/user-feed"
            className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300"
          >
            User Feed
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
