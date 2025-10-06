import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-blue-900 text-blue-100 py-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section: app info + nav */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 space-y-6 md:space-y-0">
            
            {/* App Info */}
            <div className="text-center md:text-left max-w-full sm:max-w-sm">
              <h2 className="text-2xl font-bold text-white mb-2">BookScout</h2>
              <p className="text-blue-200 text-sm">
                Discover and explore books from World of Books. Live updates, reviews, and more—all in one place.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <Link href="/categories" className="hover:text-white transition">Categories</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
  
          {/* Bottom section: copyright */}
          <div className="border-t border-blue-700 pt-6 text-center text-sm text-blue-200">
            &copy; {new Date().getFullYear()} BookScout. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  