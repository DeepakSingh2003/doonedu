"use client";

import { useState } from "react";
import { FaGraduationCap, FaCheckCircle, FaSearch } from "react-icons/fa";

export default function AskQuestionPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [faqOpen, setFaqOpen] = useState({});

  const categories = [
    { name: "Admissions", color: "blue" },
    { name: "Fees", color: "green" },
    { name: "Curriculum", color: "purple" },
    { name: "Transport", color: "yellow" },
    { name: "Facilities", color: "red" },
  ];

  const faqs = [
    {
      question: "What documents are needed for school admission?",
      answer:
        "Typically, you'll need birth certificate, previous school records, address proof, and passport-sized photographs.",
    },
    {
      question: "How do I apply for a fee concession?",
      answer:
        "Most schools have a process for fee concessions. You'll need to apply with supporting documents to the principal's office.",
    },
    {
      question: "What is the average student-teacher ratio?",
      answer:
        "This varies by school, but most good schools maintain a ratio between 15:1 to 25:1.",
    },
    {
      question: "Do schools provide transportation services?",
      answer:
        "Most schools offer transportation services, though routes and fees vary by school and location.",
    },
  ];

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-inter mt-0 sm:mt-12">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            How can we help you?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Find answers to your questions about schools, admissions, fees, and
            more. Our community is here to help!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5">
                Ask a Question
              </h3>

              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="What would you like to ask?"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Question Details
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Provide more details about your question..."
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
                    <option>Select a category</option>
                    <option>Admissions Process</option>
                    <option>Fee Structure</option>
                    <option>Curriculum & Academics</option>
                    <option>Transportation</option>
                    <option>Facilities</option>
                    <option>Extracurricular Activities</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    School (if applicable)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter school name"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="anonymous"
                    className="ml-2 block text-sm sm:text-base text-gray-700"
                  >
                    Post question anonymously
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-base sm:text-lg transition"
                >
                  Submit Question
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - FAQ */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 cursor-pointer transition hover:shadow-md"
                    onClick={() => toggleFaq(idx)}
                  >
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                      {faq.question}
                    </h4>
                    {faqOpen[idx] && (
                      <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="block text-center text-blue-600 font-medium mt-4 sm:mt-6 text-sm sm:text-base"
              >
                View all FAQs
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Question Tips
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Keep your question clear and concise",
                  "Provide relevant details about your situation",
                  "Choose the right category for faster responses",
                  "Be respectful and constructive",
                ].map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm sm:text-base"
                  >
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2 sm:mr-3" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
