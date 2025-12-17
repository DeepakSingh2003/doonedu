"use client";

import { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AskQuestionPage() {
  const [faqOpen, setFaqOpen] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

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

  // 📌 FORM SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const formData = new FormData(e.target);

    // 📍 GTM Conversion Event Push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "ask_question_form_submit",
      user_name: formData.get("name"),
      user_phone: formData.get("phone"),
      user_email: formData.get("email"),
      question_title: formData.get("title"),
      question_details: formData.get("details"),
      question_category: formData.get("category"),
      school_name: formData.get("schoolname"),
      anonymous: formData.get("anonymous") ? "yes" : "no",
    });

    setSubmitStatus("success");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-inter mt-0 sm:mt-12">
      <main className="container mx-auto px-4 py-8">
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

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Question Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="What would you like to ask?"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Details
                  </label>
                  <textarea
                    rows="5"
                    name="details"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Provide more details about your question..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
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

                {/* School Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School (if applicable)
                  </label>
                  <input
                    type="text"
                    name="schoolname"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter school name"
                  />
                </div>

                {/* Anonymous */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    id="anonymous"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="anonymous"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Post question anonymously
                  </label>
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <p className="text-green-600 font-medium text-sm">
                    Thank you! Your question has been submitted.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-base transition"
                >
                  Submit Question
                </button>
              </form>
            </div>
          </div>

          {/* Right FAQ */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg border cursor-pointer hover:shadow-md transition"
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {faq.question}
                      </h4>
                      {faqOpen[idx] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {faqOpen[idx] && (
                      <p className="text-gray-600 mt-2 text-xs">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="block text-center text-blue-600 font-medium mt-6 text-sm"
              >
                View all FAQs
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Question Tips
              </h3>
              <ul className="space-y-2">
                {[
                  "Keep your question clear and concise",
                  "Provide relevant details about your situation",
                  "Choose the right category for faster responses",
                  "Be respectful and constructive",
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <FaCheckCircle className="text-blue-500 mt-1 mr-2" />
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
