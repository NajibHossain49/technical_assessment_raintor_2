"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Active class for active route
const getLinkClass = (path, currentPath) =>
  path === currentPath
    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300"
    : "text-gray-300 hover:bg-blue-700 hover:text-white rounded-lg px-4 py-2 transition-all duration-300";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for dropdown toggle

  return (
    <nav className="bg-gray-900 shadow-lg py-4 px-4 lg:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Navbar Start */}
        <div className="flex items-center space-x-6">
          {/* Dropdown for mobile */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 text-white rounded-xl shadow-xl z-20 p-4 space-y-2 animate-fade-in">
                <li>
                  <Link
                    href="/"
                    className={getLinkClass("/", pathname)}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/location-sharing"
                    className={getLinkClass("/location-sharing", pathname)}
                    onClick={() => setIsOpen(false)}
                  >
                    Location Sender
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Receiver"
                    className={getLinkClass("/Receiver", pathname)}
                    onClick={() => setIsOpen(false)}
                  >
                    Receiver (Map)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    className={getLinkClass("/users", pathname)}
                    onClick={() => setIsOpen(false)}
                  >
                    Users
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <a
            href="/"
            className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-white tracking-tight hover:text-blue-400 transition-colors duration-300"
          >
            Live Location Tracker
          </a>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="hidden lg:flex items-center space-x-2">
          <ul className="flex space-x-2">
            <li>
              <Link href="/" className={getLinkClass("/", pathname)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/location-sharing"
                className={getLinkClass("/location-sharing", pathname)}
              >
                Location Sender
              </Link>
            </li>
            <li>
              <Link
                href="/Receiver"
                className={getLinkClass("/Receiver", pathname)}
              >
                Receiver (Map)
              </Link>
            </li>
            <li>
              <Link href="/users" className={getLinkClass("/users", pathname)}>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
