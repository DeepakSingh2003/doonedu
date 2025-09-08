import React from "react";

const FAQItem = ({ question, answer }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
    <details className="group p-5 rounded-xl">
      <summary className="flex justify-between items-center cursor-pointer text-base font-semibold text-gray-900">
        <span className="group-hover:text-indigo-600 transition">
          {question}
        </span>
        <span className="transition-transform duration-300 group-open:rotate-180">
          <svg
            fill="none"
            height="20"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            className="text-gray-500 group-hover:text-indigo-600"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </summary>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{answer}</p>
    </details>
  </div>
);

const FAQPage = () => {
  const faqs = [
    {
      question:
        "Do I need to log in to create a profile for my child for admissions?",
      answer:
        "Yes, you need to log in to create a profile for your child's admissions.",
    },
    {
      question:
        "In case, I am looking for admissions in two different classes, do I need to create two different accounts?",
      answer:
        "No, you do not need to create two different accounts for admissions in two different classes.",
    },
    {
      question: "What happens once I’ve submitted the application form?",
      answer:
        "Once submitted, your application will be reviewed, and you will be notified of the next steps.",
    },
    {
      question:
        "Do I need to apply anything again to the school as well if I apply through your platform?",
      answer:
        "No, applying through our platform covers the school's requirements.",
    },
    {
      question:
        "What if I don’t have clarity regarding which school is the best fit for my child?",
      answer:
        "You can consult our guidance section or contact support for personalized advice.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-10 mt-0 sm:mt-8 text-sm">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mt-2 mb-8 text-xs">
          Find answers to common questions about school admissions, processes,
          and requirements.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
