import {
  MdCampaign,
  MdTrendingUp,
  MdDescription,
  MdArrowRightAlt,
} from "react-icons/md";

export default function ApplyNowSection() {
  return (
    <section id="delhi-apply-now">
      <div className="pt-8 sm:pt-10 pb-4">
        <div className="py-3 bg-[#e2f5ff] md:w-full">
          <div className="flex justify-between items-center flex-col-reverse md:flex-row w-5/6 md:w-9/12 mx-auto">
            {/* Left Content */}
            <div className="w-full md:w-3/5 p-1 sm:p-4">
              <h3 className="font-semibold text-[#333333] text-center md:text-left">
                Apply Easily to Multiple Schools at Once
              </h3>
              <p className="text-[#333333] mt-4 text-sm text-center md:text-left">
                Simplify your application process by submitting one application
                to multiple schools. Save time and effort.
              </p>

              {/* List Items */}
              <ul className="list-none mt-4 space-y-3 sm:space-y-4 pl-0">
                <li className="flex items-center">
                  <MdCampaign className="text-2xl text-[#1978CD]" />
                  <span className="ml-3 text-[#333333] text-xs md:text-sm">
                    Real-Time Updates &amp; notifications on WhatsApp, SMS, and
                    emails.
                  </span>
                </li>
                <li className="flex items-center">
                  <MdTrendingUp className="text-2xl text-[#1978CD]" />
                  <span className="ml-3 text-[#333333] text-xs md:text-sm">
                    Track the status of your applications with our Live
                    Application Tracking system.
                  </span>
                </li>
                <li className="flex items-center">
                  <MdDescription className="text-2xl text-[#1978CD]" />
                  <span className="ml-3 text-[#333333] text-xs md:text-sm">
                    No Need to visit schools physically.
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="mt-6 text-center md:text-left flex">
                <a
                  className="flex items-center bg-[#1978CD] text-white px-3 py-1 font-medium rounded-lg text-xs md:text-sm group"
                  href="/admissions/school-admission-in-delhi"
                >
                  Start Your Application Now
                  <MdArrowRightAlt className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-2/5 text-center hidden md:block">
              <img
                alt="/form_apply.avif"
                title="Apply Now"
                loading="lazy"
                width={600}
                height={400}
                className="mx-auto w-3/5 md:w-3/5 xl:w-3/6"
                src="/form_apply.avif"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
