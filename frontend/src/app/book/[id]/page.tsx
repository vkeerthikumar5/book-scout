"use client";
import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params?.id as string;

  // Dummy book data for now
  const book = {
    id: bookId,
    title: "The Great Adventure",
    author: "John Smith",
    price: "₹399",
    rating: 2.5,
    reviews: [
      { id: 1, user: "Alice", text: "Loved this book! Very inspiring." },
      { id: 2, user: "Bob", text: "Good but a bit long in the middle." },
    ],
    description:
      "This is a detailed description of the book. It explores themes of courage, discovery, and resilience.",
    image: "https://via.placeholder.com/300x400.png?text=Book+Cover",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Book Image + Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-80 object-cover rounded-lg shadow"
          />

          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              {book.title}
            </h1>
            <p className="text-gray-600 mb-1">by {book.author}</p>
            <p className="text-xl text-blue-700 font-semibold mb-4">
              {book.price}
            </p>

            {/* Rating */}
            <p className="text-yellow-500 mb-2">
              {"★".repeat(Math.floor(book.rating))}
              {"☆".repeat(5 - Math.floor(book.rating))}{" "}
              <span className="text-gray-600 text-sm">
                ({book.rating}/5)
              </span>
            </p>

            <p className="text-gray-700">{book.description}</p>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Reviews</h2>
          {book.reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-2 mb-2"
            >
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
