"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          About BookScout
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Welcome to <span className="font-semibold">BookScout</span>, your ultimate
          destination for discovering, exploring, and collecting knowledge from books across
          genres and categories. Our mission is to make the world of books accessible, engaging,
          and enjoyable for everyone.
        </p>

        <p className="text-gray-700 text-lg mb-4">
          At BookScout, we believe that reading empowers individuals, broadens horizons, and
          connects communities. Whether you're looking for fiction, science, travel, history,
          or children's books, we provide curated collections, recommendations, and insights to
          enrich your reading journey.
        </p>

        <p className="text-gray-700 text-lg mb-4">
          Our platform is designed to help book lovers easily explore different categories,
          find their next read, and get inspired by reviews and ratings from fellow readers.
          BookScout is continuously growing, adding new books and categories to keep your
          exploration fresh and exciting.
        </p>

        <p className="text-gray-700 text-lg text-center font-semibold mt-6">
          Happy Reading! 📚
        </p>
      </div>
    </div>
  );
}
