"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Zap,
  CheckCircle2,
  Heart,
  BarChart,
  Building2,
  Users,
} from "lucide-react";

export default function RegisterSchoolForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    contact_name: "",
    password1: "",
    school_category: "Day School",
    country: "1",
    state: "",
    city: "",
    district: "",
    district_region: "",
    short_address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "School name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.contact_number.trim())
      newErrors.contact_number = "Phone number is required";
    if (!formData.contact_name.trim())
      newErrors.contact_name = "Contact person name is required";
    if (!formData.password1) newErrors.password1 = "Password is required";
    else if (formData.password1.length < 8)
      newErrors.password1 = "Password must be at least 8 characters";
    if (!formData.short_address.trim())
      newErrors.short_address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, contact_number: value });
    if (errors.contact_number) setErrors({ ...errors, contact_number: "" });
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Register Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="mb-10 lg:mb-0 text-center lg:text-left lg:ml-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Be A Part Of The{" "}
            <span className="text-blue-700 block mt-2 font-extrabold">
              Global Edu Consulting
            </span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg lg:w-3/4 leading-relaxed">
            India's largest digital platform transforming the future of
            education. Join us in revolutionizing school management.
          </p>
        </div>

        {/* Right Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full lg:w-3/4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Register Your School
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Powered by{" "}
            <span className="font-semibold text-blue-700">
              Global Edu Consulting
            </span>
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`block w-full border-0 border-b-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className={`block w-full border-0 border-b-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className={`block w-full border-0 border-b-2 ${
                    errors.contact_number ? "border-red-500" : "border-gray-300"
                  } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handlePhoneChange}
                  maxLength="10"
                />
                {errors.contact_number && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contact_number}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Person + Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`block w-full border-0 border-b-2 ${
                    errors.contact_name ? "border-red-500" : "border-gray-300"
                  } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                />
                {errors.contact_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contact_name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    className={`block w-full border-0 border-b-2 ${
                      errors.password1 ? "border-red-500" : "border-gray-300"
                    } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
                    type={showPassword ? "text" : "password"}
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password1 && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password1}
                  </p>
                )}
              </div>
            </div>

            {/* School Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Category
              </label>
              <select
                name="school_category"
                value={formData.school_category}
                onChange={handleChange}
                className="block w-full border-0 border-b-2 border-gray-300 text-base outline-none py-2 focus:border-blue-600 bg-transparent"
              >
                <option>Day School</option>
                <option>Boarding School</option>
                <option>International School</option>
                <option>Other</option>
              </select>
            </div>

            {/* Short Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="short_address"
                value={formData.short_address}
                onChange={handleChange}
                className={`block w-full border-0 border-b-2 ${
                  errors.short_address ? "border-red-500" : "border-gray-300"
                } text-base outline-none py-2 focus:border-blue-600 bg-transparent`}
              />
              {errors.short_address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.short_address}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-700 text-white rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Start your Journey
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Why Section */}
      <section className="bg-blue-50 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Global Edu Consulting?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Zap className="mx-auto text-purple-500" size={28} />
            <h3 className="mt-4 font-semibold">Streamlined Process</h3>
            <p className="text-sm text-gray-600 mt-2">
              Simple and efficient school management system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <CheckCircle2 className="mx-auto text-yellow-500" size={28} />
            <h3 className="mt-4 font-semibold">Automated Process</h3>
            <p className="text-sm text-gray-600 mt-2">
              Smart automation for admissions and tasks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Heart className="mx-auto text-red-500" size={28} />
            <h3 className="mt-4 font-semibold">Relationships</h3>
            <p className="text-sm text-gray-600 mt-2">
              Stronger connections with parents and students.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <BarChart className="mx-auto text-blue-500" size={28} />
            <h3 className="mt-4 font-semibold">Fully Digital</h3>
            <p className="text-sm text-gray-600 mt-2">
              Complete digital transformation of operations.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Offer Section */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What does Global Edu Consulting offer?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="border p-6 rounded-xl shadow-sm  border-blue-500">
            <Users className="text-blue-500 mb-4" size={28} />
            <h3 className="font-semibold text-gray-900">Parents</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>✔ Easy access to schools</li>
              <li>✔ Track applications</li>
              <li>✔ Digital documentation</li>
            </ul>
          </div>
          <div className="border p-6 rounded-xl border-yellow-500 shadow-sm">
            <BarChart className="text-yellow-500 mb-4" size={28} />
            <h3 className="font-semibold text-gray-900">Insights</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>✔ Real-time analytics</li>
              <li>✔ Performance metrics</li>
              <li>✔ Data-driven decisions</li>
            </ul>
          </div>
          <div className="border p-6 rounded-xl shadow-sm border-purple-500">
            <Building2 className="text-purple-500 mb-4" size={28} />
            <h3 className="font-semibold text-gray-900">Process</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>✔ Streamlined workflow</li>
              <li>✔ Automated systems</li>
              <li>✔ Efficient management</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
