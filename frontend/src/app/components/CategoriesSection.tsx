import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBook, FaChild, FaPenFancy, FaGlobe } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Fiction",
    icon: <FaBook className="text-white text-4xl" />,
    description: "Explore stories and novels from various genres.",
    slug: "fiction",
  },
  {
    id: 2,
    title: "Children's Books",
    icon: <FaChild className="text-white text-4xl" />,
    description: "Fun and educational books for kids.",
    slug: "childrens-books",
  },
  {
    id: 3,
    title: "Education",
    icon: <FaPenFancy className="text-white text-4xl" />,
    description: "Books for learning and self-improvement.",
    slug: "education",
  },
  {
    id: 4,
    title: "Travel & Geography",
    icon: <FaGlobe className="text-white text-4xl" />,
    description: "Travel guides, maps, and exploration stories.",
    slug: "travel-geography",
  },
];

export default function CategoriesSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // initialize AOS
  }, []);

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              data-aos="fade-up"
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {category.title}
              </h3>
              <p className="text-blue-100 text-sm mb-4">{category.description}</p>
              <a
                href={`/categories/${category.slug}`}
                className="mt-auto inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300"
              >
                View Books
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <a
            href="/categories"
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          >
            View More Categories
          </a>
        </div>
      </div>
    </section>
  );
}
