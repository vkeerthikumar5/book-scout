"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md shadow-md">
      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl md:text-3xl font-bold text-blue-700"
      >
        BookScout
      </motion.h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-medium text-gray-700">
        {navItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.6 }}
          >
            <Link
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-blue-700 focus:outline-none text-2xl"
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-3 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`transition ${
                pathname === item.href
                  ? "text-blue-700 font-semibold border-b border-blue-700"
                  : "hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
