"use client"; // Add this at the very top

import { useState } from "react";

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    dateOfBirth: "",
    parentsFirstName: "",
    parentsMiddleName: "",
    parentsLastName: "",
    relationship: "",
    email: "",
    classAdmission: "",
    mobile: "",
    fathersOccupation: "",
    address: "",
    landmark: "",
    amount: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 📌 Push conversion event to GTM DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "student_registration_form_submit",
      student_name: `${formData.studentFirstName} ${formData.studentMiddleName} ${formData.studentLastName}`,
      dob: formData.dateOfBirth,
      parent_name: `${formData.parentsFirstName} ${formData.parentsMiddleName} ${formData.parentsLastName}`,
      relationship: formData.relationship,
      email: formData.email,
      class_admission: formData.classAdmission,
      phone: formData.mobile,
      occupation: formData.fathersOccupation,
      address: formData.address,
      landmark: formData.landmark,
      amount: formData.amount,
      accepted_terms: formData.acceptTerms ? "yes" : "no",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Student Registration Form</h1>
          <p className="mt-2">
            Please fill the form to get registered with global edu consulting
            which further provide consultation & school registration for the
            boarding schools across India.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Student Name Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students First Name
                </label>
                <input
                  type="text"
                  name="studentFirstName"
                  value={formData.studentFirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Students First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Middle Name (Optional)
                </label>
                <input
                  type="text"
                  name="studentMiddleName"
                  value={formData.studentMiddleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Students Middle Name (Optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Last Name
                </label>
                <input
                  type="text"
                  name="studentLastName"
                  value={formData.studentLastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Students Last Name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Parents Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Parent/Guardian Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parents First Name
                </label>
                <input
                  type="text"
                  name="parentsFirstName"
                  value={formData.parentsFirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Parents First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parents Middle Name (Optional)
                </label>
                <input
                  type="text"
                  name="parentsMiddleName"
                  value={formData.parentsMiddleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Parents Middle Name (Optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parents Last Name
                </label>
                <input
                  type="text"
                  name="parentsLastName"
                  value={formData.parentsLastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Parents Last Name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Relation With Student</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
          </div>

          {/* Class and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class in which admission is wanted
              </label>
              <select
                name="classAdmission"
                value={formData.classAdmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mobile Number"
                required
              />
            </div>
          </div>

          {/* Fathers Occupation */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fathers Occupation (optional)
            </label>
            <input
              type="text"
              name="fathersOccupation"
              value={formData.fathersOccupation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Fathers Occupation (optional)"
            />
          </div>

          {/* Address and Landmark */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Address..."
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Landmark"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              This Amount is against the registration of the students and will
              be valid in the same academic year.
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 mr-2"
                id="acceptTerms"
                required
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                I accept terms, condition and privacy policies.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
