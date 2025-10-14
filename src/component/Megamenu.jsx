'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";


export default function Megamenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add scroll effect for better visual appearance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" top-0 left-0 right-0 z-50">
      <header
        className={`w-full backdrop-blur-md border-b transition-all duration-200 ${
          isScrolled
            ? "border-gray-200 shadow-md py-2"
            : "border-gray-100 shadow-sm py-3"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h5 className="font-bold text-xl text-gray-900 tracking-tight">
                BullsEye
              </h5>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-8">
            <Link
              href="/articles"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              Articles
            </Link>
            <Link
              href="/market-news"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              Market News
            </Link>
            <Link
              href="/screeners"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              Screeners
            </Link>
            <Link
              href="/newsSection"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              News
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/cart"
              className="flex items-center space-x-2 p-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </Link>

            <Link
              href="#"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="hidden xs:inline">Login</span>
              <span className="xs:hidden">Sign In</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/articles"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/market-news"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Market News
            </Link>
            <Link
              href="/screeners"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Screeners
            </Link>
            <Link
              href="/newsSection"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              News
            </Link>

            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link
                href="/cart"
                className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
