"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Dummy books (20 items)
  const allBooks = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Book ${i + 1}`,
    author: `Author ${i + 1}`,
    price: `₹${199 + i * 10}`,
    description: "This is a sample description for the book.",
    image: `https://via.placeholder.com/200x250.png?text=Book+${i + 1}`,
  }));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const totalPages = Math.ceil(allBooks.length / booksPerPage);

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = allBooks.slice(indexOfFirst, indexOfLast);

  // Function to handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center capitalize">
        {slug?.replace("-", " ")} Books
      </h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition flex flex-col"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-blue-900 mb-1">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
            <p className="text-blue-700 font-semibold mb-2">{book.price}</p>
            <p className="text-gray-500 text-sm flex-grow">{book.description}</p>
            <Link
              href={`/book/${book.id}`}
              className="mt-4 inline-block bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <nav aria-label="Page navigation">
          <ul className="inline-flex -space-x-px text-sm">
            {/* Previous */}
            <li>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-s-lg 
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => goToPage(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 
                  ${
                    currentPage === i + 1
                      ? "text-blue-600 bg-blue-50 border-blue-300"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            {/* Next */}
            <li>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg 
                ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
