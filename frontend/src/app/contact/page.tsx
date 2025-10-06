"use client";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const contacts = [
    {
      id: 1,
      icon: <FaEnvelope size={30} className="text-blue-600" />,
      title: "Email",
      info: "contact@bookscout.com",
    },
    {
      id: 2,
      icon: <FaPhoneAlt size={30} className="text-blue-600" />,
      title: "Phone",
      info: "+91 98765 43210",
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt size={30} className="text-blue-600" />,
      title: "Address",
      info: "123 Book Street, Knowledge City",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg">
          We'd love to hear from you! Reach out to us through any of the options below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="mb-4">{contact.icon}</div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">{contact.title}</h2>
            <p className="text-gray-700">{contact.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
