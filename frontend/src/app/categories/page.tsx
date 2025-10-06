"use client";
import Link from "next/link";
import { FaBook, FaGlobe, FaChild, FaUniversity, FaHistory, FaFlask } from "react-icons/fa";

export default function CategoriesPage() {
  const categories = [
    { id: 1, title: "Fiction", slug: "fiction", icon: <FaBook className="text-4xl text-blue-600" /> },
    { id: 2, title: "Children's Books", slug: "childrens-books", icon: <FaChild className="text-4xl text-blue-600" /> },
    { id: 3, title: "Education", slug: "education", icon: <FaUniversity className="text-4xl text-blue-600" /> },
    { id: 4, title: "Travel & Geography", slug: "travel-geography", icon: <FaGlobe className="text-4xl text-blue-600" /> },
    { id: 5, title: "History", slug: "history", icon: <FaHistory className="text-4xl text-blue-600" /> },
    { id: 6, title: "Science", slug: "science", icon: <FaFlask className="text-4xl text-blue-600" /> },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          All Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white hover:shadow-lg transition duration-300 rounded-lg shadow-md p-6 text-center flex flex-col items-center"
            >
              <div className="mb-4">{category.icon}</div>
              <h2 className="text-lg font-semibold text-blue-900">{category.title}</h2>
              <p className="text-sm text-gray-500 mt-2">View Books →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
