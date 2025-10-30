import React from "react";

const AboutUs = () => {
  return (
    <main className="bg-gray-50 min-h-screen bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Cpath fill=%22%23e5e7eb%22 d=%22M0 0h80v80H0z%22/%3E%3Ccircle cx=%2240%22 cy=%2240%22 r=%2215%22 fill=%22%23dbeafe%22 opacity=%220.3%22/%3E%3C/svg%3E')]">
      {/* Hero Section */}
      <section className="relative bg-[url('https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757140532/b-1_n3fw5p.jpg')] bg-cover bg-center text-white py-12 px-4 sm:px-6 lg:px-8 text-center mt-0 sm:mt-10 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-50">
        <div className="relative z-10">
          <svg
            className="w-10 h-10 mx-auto mb-3 text-white motion-safe:animate-in fade-in duration-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 motion-safe:animate-in fade-in duration-800">
            Global Edu Consulting
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto motion-safe:animate-in slide-in-from-bottom duration-800">
            Guiding families to top schools in Dehradun, the School Capital of
            India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="p-4 motion-safe:animate-in slide-in-from-bottom duration-800 space-y-6">
          {/* About Us */}
          <div>
            <header className="flex items-center mb-3">
              <svg
                className="w-6 h-6 text-indigo-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
            </header>
            <p className="text-gray-600 text-sm">
              In Dehradun, the "School Capital of India," Global Edu Consulting
              guides families to top boarding schools and overseas colleges,
              simplifying admissions with expert advice. We clarify confusing
              school information, ensuring the best choices for your child.
            </p>
          </div>

          {/* Vision */}
          <div>
            <header className="flex items-center mb-3">
              <svg
                className="w-6 h-6 text-indigo-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </header>
            <p className="text-gray-600 text-sm">
              To be India’s leading consulting group for boarding schools and
              overseas education, fostering students’ talents as global citizens
              with integrity.
            </p>
            <ul className="mt-3 space-y-1">
              {["Global access", "Skill growth", "Integrity"].map(
                (item, index) => (
                  <li key={index} className="flex items-center group">
                    <svg
                      className="w-4 h-4 text-indigo-500 mr-2 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700 text-xs group-hover:text-indigo-600">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Roles */}
          <div>
            <header className="flex items-center mb-3">
              <svg
                className="w-6 h-6 text-indigo-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Our Roles</h2>
            </header>
            <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1">
              <li>Survey boarding schools.</li>
              <li>Research facilities.</li>
              <li>Engage parents and educators.</li>
              <li>Collaborate with government.</li>
              <li>Advise on education’s role.</li>
              <li>Empower female students.</li>
            </ul>
          </div>

          {/* Head Office */}
          <div>
            <header className="flex items-center mb-3">
              <svg
                className="w-6 h-6 text-indigo-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">
                Head Office @ Dehradun
              </h2>
            </header>
            <p className="text-gray-600 text-sm">
              In Dehradun, the "School Capital," we connect families to top
              schools, leveraging the city’s educational hub for seamless
              admissions.
            </p>
          </div>

          {/* Achievements */}
          <div>
            <header className="flex items-center mb-3">
              <svg
                className="w-6 h-6 text-indigo-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 11l7-7 7 7M5 19l7-7 7 7"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "1000+", label: "Verified Boarding Schools", progress: 80 },
                { value: "10k+", label: "Students Placed", progress: 90 },
                { value: "15+", label: "Years of Experience", progress: 100 },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-indigo-600 mb-1">
                    {achievement.value}
                  </h3>
                  <p className="text-gray-600 text-xs mb-1">
                    {achievement.label}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Contact Call-to-Action */}
        <article
          id="contact"
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl shadow-xl text-center motion-safe:animate-in slide-in-from-bottom duration-800 mt-8 w-full"
        >
          <h2 className="text-2xl font-bold mb-3">Find the Perfect School</h2>
          <p className="text-sm mb-4">
            Let us guide your child’s future with expert advice.
          </p>
          <a
            href="/Contactus"
            className="inline-block px-4 py-2 bg-white text-indigo-700 font-semibold rounded-full hover:bg-indigo-100 transition-colors duration-300 text-sm"
          >
            Contact Us
          </a>
        </article>
      </section>
    </main>
  );
};

export default AboutUs;
