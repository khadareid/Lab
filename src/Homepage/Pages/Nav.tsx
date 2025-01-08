"use client";

import React, { useState, useEffect } from "react";
import { Phone, User, Menu, X } from 'lucide-react';

const SiteHeader = () => {
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolling ? "bg-gradient-to-r from-green-600 to-indigo-600 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M16 4L4 10L16 16L28 10L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 22L16 28L28 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 16L16 22L28 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-3xl font-bold text-white">Talento</span>
            </a>

            {/* Navigation for desktop */}
            <nav className="hidden lg:flex">
              <ul className="flex gap-6">
                <li>
                  <a href="/" className="text-white font-semibold text-lg hover:text-green-200 transition-colors">
                    Home
                  </a>
                </li>
                <li className="relative group">
                  <button
                    onClick={() => toggleDropdown('about')}
                    className="text-white font-semibold text-lg hover:text-green-200 transition-colors flex items-center"
                  >
                    About
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 mt-2">
                      <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Our Story</a>
                      <a href="/team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Team</a>
                    </div>
                  )}
                </li>
                <li className="relative group">
                  <button
                    onClick={() => toggleDropdown('services')}
                    className="text-white font-semibold text-lg hover:text-green-200 transition-colors flex items-center"
                  >
                    Services
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 mt-2">
                      <a href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Consulting</a>
                      <a href="/development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Development</a>
                    </div>
                  )}
                </li>
                <li>
                  <a href="/contact" className="text-white font-semibold text-lg hover:text-green-200 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {/* Phone Button */}
              <a
                href="tel:1123456789"
                className="hidden md:flex bg-white text-green-600 hover:bg-green-100 rounded-full px-4 py-2 items-center transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                <span className="font-semibold">1.123.456.789</span>
              </a>

              {/* Login Button */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 flex items-center transition-colors"
              >
                <User className="mr-2 h-4 w-4" />
                <span className="font-semibold">Login</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white hover:text-green-200 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <nav className="px-2 pt-2 pb-4 space-y-1">
                <a href="/" className="block text-white font-semibold text-lg hover:bg-green-700 px-3 py-2 rounded-md">
                  Home
                </a>
                <button
                  onClick={() => toggleDropdown('mobileAbout')}
                  className="w-full text-left text-white font-semibold text-lg hover:bg-green-700 px-3 py-2 rounded-md flex items-center justify-between"
                >
                  About
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobileAbout' && (
                  <div className="pl-6 space-y-1">
                    <a href="/about" className="block text-white py-2 hover:bg-green-700 rounded-md">Our Story</a>
                    <a href="/team" className="block text-white py-2 hover:bg-green-700 rounded-md">Team</a>
                  </div>
                )}
                <button
                  onClick={() => toggleDropdown('mobileServices')}
                  className="w-full text-left text-white font-semibold text-lg hover:bg-green-700 px-3 py-2 rounded-md flex items-center justify-between"
                >
                  Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobileServices' && (
                  <div className="pl-6 space-y-1">
                    <a href="/services" className="block text-white py-2 hover:bg-green-700 rounded-md">Consulting</a>
                    <a href="/development" className="block text-white py-2 hover:bg-green-700 rounded-md">Development</a>
                  </div>
                )}
                <a href="/contact" className="block text-white font-semibold text-lg hover:bg-green-700 px-3 py-2 rounded-md">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

    </>
  );
};

export default SiteHeader;

