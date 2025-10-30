import React from 'react'

function ContactCallAction() {
  return (
    <>
        {/* Contact Call-to-Action */}
        <article
          id="contact"
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6  shadow-xl text-center motion-safe:animate-in slide-in-from-bottom duration-800 mt-8 w-full"
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
    </>
  )
}

export default ContactCallAction