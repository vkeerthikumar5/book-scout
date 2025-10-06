import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSyncAlt, FaBookOpen, FaClipboardList, FaMobileAlt, FaHistory } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Live Scraping",
    description: "Get real-time, up-to-date book information directly from World of Books.",
    icon: <FaSyncAlt className="text-blue-700 text-4xl" />,
  },
  {
    id: 2,
    title: "Category Drilldown",
    description: "Browse high-level categories and subcategories easily to find books.",
    icon: <FaBookOpen className="text-blue-700 text-4xl" />,
  },
  {
    id: 3,
    title: "Product Details",
    description: "View book description, ratings, reviews, related books, and metadata (author, ISBN, publisher, etc.).",
    icon: <FaClipboardList className="text-blue-700 text-4xl" />,
  },
  {
    id: 4,
    title: "On-Demand Refresh",
    description: "Re-fetch updated product data whenever needed without overloading the source.",
    icon: <FaSyncAlt className="text-blue-700 text-4xl" />,
  },
  {
    id: 5,
    title: "Browsing History",
    description: "Your navigation history is saved locally and on the backend for easy resuming.",
    icon: <FaHistory className="text-blue-700 text-4xl" />,
  },
  {
    id: 6,
    title: "Responsive & Accessible",
    description: "Works smoothly on desktop and mobile; accessible to all users.",
    icon: <FaMobileAlt className="text-blue-700 text-4xl" />,
  },
];

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-aos="fade-up"
              data-aos-delay={index * 100} // staggered animation
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-blue-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
