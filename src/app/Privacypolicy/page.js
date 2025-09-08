import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-0 mt-0 sm:mt-10">
      <div className="">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains what personal
            data we collect and how we use it.
          </p>
        </div>

        <div className="bg-white overflow-hidden">
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-8">
            <h2 className="text-white text-xl font-semibold">
              Doon Edu Privacy Commitment
            </h2>
          </div>

          <div className="p-8">
            {/* Introduction */}
            <div className="mb-10 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-700 mb-4">
                At Doon Edu, accessible from{" "}
                <a
                  href="https://doonedu.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  https://doonedu.com
                </a>
                , one of our main priorities is the privacy of our visitors.
                This Privacy Policy document contains types of information that
                is collected and recorded by Doon Edu and how we use it.
              </p>
              <p className="text-gray-700">
                If you have additional questions or require more information
                about our Privacy Policy, do not hesitate to contact us.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-10">
              {/* Consent Section */}
              <Section title="Consent">
                <p className="text-gray-700">
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its terms.
                </p>
              </Section>

              {/* Information We Collect */}
              <Section title="Information We Collect">
                <p className="text-gray-700 mb-4">
                  The personal information that you are asked to provide, and
                  the reasons why you are asked to provide it, will be made
                  clear to you at the point we ask you to provide your personal
                  information.
                </p>
                <div className="bg-gray-50 p-5 rounded-lg mt-4">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Types of information we may collect:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Contact information (name, email, phone number)</li>
                    <li>Account registration details</li>
                    <li>Communication content when you contact us</li>
                    <li>Technical data (IP address, browser type, etc.)</li>
                  </ul>
                </div>
              </Section>

              {/* How We Use Your Information */}
              <Section title="How We Use Your Information">
                <p className="text-gray-700 mb-4">
                  We use the information we collect in various ways, including
                  to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <InfoCard title="Service Operation" icon="🚀">
                    Provide, operate, and maintain our website
                  </InfoCard>
                  <InfoCard title="Improvement" icon="📈">
                    Improve, personalize, and expand our website
                  </InfoCard>
                  <InfoCard title="Analytics" icon="📊">
                    Understand and analyze how you use our website
                  </InfoCard>
                  <InfoCard title="Communication" icon="✉️">
                    Communicate with you for updates and support
                  </InfoCard>
                </div>
              </Section>

              {/* Log Files */}
              <Section title="Log Files">
                <p className="text-gray-700">
                  Doon Edu follows a standard procedure of using log files.
                  These files log visitors when they visit websites. All hosting
                  companies do this and a part of hosting services' analytics.
                  The information collected by log files include internet
                  protocol (IP) addresses, browser type, Internet Service
                  Provider (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to any
                  information that is personally identifiable. The purpose of
                  the information is for analyzing trends, administering the
                  site, tracking users' movement on the website, and gathering
                  demographic information.
                </p>
              </Section>

              {/* Advertising Partners */}
              <Section title="Advertising Partners Privacy Policies">
                <p className="text-gray-700 mb-4">
                  You may consult this list to find the Privacy Policy for each
                  of the advertising partners of Doon Edu.
                </p>
                <p className="text-gray-700 mb-4">
                  Third-party ad servers or ad networks use technologies like
                  cookies, JavaScript, or Web Beacons that are used in their
                  respective advertisements and links that appear on Doon Edu,
                  which are sent directly to users' browser. They automatically
                  receive your IP address when this occurs. These technologies
                  are used to measure the effectiveness of their advertising
                  campaigns and/or to personalize the advertising content that
                  you see on websites that you visit.
                </p>
                <p className="text-gray-700">
                  Note that Doon Edu has no access to or control over these
                  cookies that are used by third-party advertisers.
                </p>
              </Section>

              {/* Third Party Policies */}
              <Section title="Third Party Privacy Policies">
                <p className="text-gray-700 mb-4">
                  Doon Edu's Privacy Policy does not apply to other advertisers
                  or websites. Thus, we are advising you to consult the
                  respective Privacy Policies of these third-party ad servers
                  for more detailed information. It may include their practices
                  and instructions about how to opt-out of certain options.
                </p>
                <p className="text-gray-700">
                  You can choose to disable cookies through your individual
                  browser options. To know more detailed information about
                  cookie management with specific web browsers, it can be found
                  at the browsers' respective websites.
                </p>
              </Section>

              {/* CCPA Rights */}
              <Section title="CCPA Privacy Rights (Do Not Sell My Personal Information)">
                <p className="text-gray-700 mb-4">
                  Under the CCPA, among other rights, California consumers have
                  the right to:
                </p>
                <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>
                      Request that a business disclose the categories and
                      specific pieces of personal data collected
                    </li>
                    <li>
                      Request that a business delete any personal data about the
                      consumer collected
                    </li>
                    <li>
                      Request that a business that sells personal data, not sell
                      the consumer's personal data
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  If you make a request, we have one month to respond to you. If
                  you would like to exercise any of these rights, please contact
                  us.
                </p>
              </Section>

              {/* GDPR Rights */}
              <Section title="GDPR Data Protection Rights">
                <p className="text-gray-700 mb-4">
                  We would like to make sure you are fully aware of all of your
                  data protection rights. Every user is entitled to the
                  following:
                </p>
                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>
                      The right to access – You have the right to request copies
                      of your personal data
                    </li>
                    <li>
                      The right to rectification – You have the right to request
                      correction of inaccurate information
                    </li>
                    <li>
                      The right to erasure – You have the right to request
                      erasure of your personal data
                    </li>
                    <li>
                      The right to restrict processing – You have the right to
                      restrict processing of your personal data
                    </li>
                    <li>
                      The right to object to processing – You have the right to
                      object to our processing of your personal data
                    </li>
                    <li>
                      The right to data portability – You have the right to
                      request transfer of collected data
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  If you make a request, we have one month to respond to you. If
                  you would like to exercise any of these rights, please contact
                  us.
                </p>
              </Section>

              {/* Children's Information */}
              <Section title="Children's Information">
                <p className="text-gray-700 mb-4">
                  Another part of our priority is adding protection for children
                  while using the internet. We encourage parents and guardians
                  to observe, participate in, and/or monitor and guide their
                  online activity.
                </p>
                <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                  <p className="text-gray-700">
                    Doon Edu does not knowingly collect any Personal
                    Identifiable Information from children under the age of 13.
                    If you think that your child provided this kind of
                    information on our website, we strongly encourage you to
                    contact us immediately and we will do our best efforts to
                    promptly remove such information from our records.
                  </p>
                </div>
              </Section>
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Have Questions About Our Privacy Policy?
              </h3>
              <p className="text-gray-700 mb-4">
                We're here to help you understand our data practices.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Contact Us
              </button>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
      {title}
    </h2>
    {children}
  </div>
);

// Reusable Info Card Component
const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center mb-2">
      <span className="text-2xl mr-2">{icon}</span>
      <h3 className="font-medium text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-700 text-sm">{children}</p>
  </div>
);

export default PrivacyPolicy;
