import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Content Container */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Introduction */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 mb-3 sm:mb-4">
                Welcome to our Privacy Policy. Your privacy is critically
                important to us. This privacy policy describes how we collect,
                use, and share your personal information when you use our
                website and services.
              </p>
              <p className="text-gray-700">
                By using our website, you consent to the collection and use of
                information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Information We Collect
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    When you register for an account, we may collect personal
                    information such as:
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                    <li>Email address</li>
                    <li>Username</li>
                    <li>Password (encrypted)</li>
                    <li>Profile information you provide</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Usage Data
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    We automatically collect information about how you interact
                    with our website:
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent</li>
                    <li>Device information</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                How We Use Your Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Service Provision
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    To create and manage your account, provide customer support,
                    and deliver our services.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Improvement
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    To analyze usage patterns, improve our website
                    functionality, and develop new features.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Communication
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    To send important updates, security alerts, and respond to
                    your inquiries.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Security
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    To detect and prevent fraud, unauthorized access, and ensure
                    the security of our platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Cookies and Tracking Technologies
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">
                  Important Notice
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  We use cookies to enhance your browsing experience. Cookies
                  are small data files stored on your device that help us:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                  <li>Remember your preferences and login status</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Personalize content and advertisements</li>
                </ul>
                <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base">
                  You can control cookies through your browser settings.
                  However, disabling cookies may affect some features of our
                  website.
                </p>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Data Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information in the following
                circumstances:
              </p>
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Situation
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Disclosure
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          Legal Requirements
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          When required by law or to protect rights
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          Service Providers
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          Trusted partners who assist in operations
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          Business Transfer
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          In case of merger, acquisition, or sale
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          With Your Consent
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          When you explicitly authorize sharing
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Data Security
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                    <svg
                      className="h-6 w-6 sm:h-8 sm:w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="sm:ml-0">
                    <h3 className="text-base sm:text-lg font-medium text-green-800">
                      We Take Security Seriously
                    </h3>
                    <p className="text-green-700 mt-1 sm:mt-2 text-sm sm:text-base">
                      We implement appropriate technical and organizational
                      security measures to protect your personal information
                      against unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                    <ul className="list-disc pl-4 sm:pl-5 mt-2 sm:mt-3 text-green-700 space-y-1 text-sm sm:text-base">
                      <li>Encryption of sensitive data</li>
                      <li>Regular security audits</li>
                      <li>Access controls and authentication</li>
                      <li>Secure server infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Your Rights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Access & Correction
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    You can access and update your personal information through
                    your account settings.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Data Deletion
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    You may request deletion of your account and associated data
                    by contacting us.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Opt-Out
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    You can opt out of marketing communications at any time by
                    clicking unsubscribe.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Data Portability
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    You have the right to request a copy of your data in a
                    structured format.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Contact Us
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-blue-800 mb-2 sm:mb-3">
                  Questions About Our Privacy Policy?
                </h3>
                <p className="text-blue-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  If you have any questions or concerns about our Privacy Policy
                  or how we handle your data, please don't hesitate to contact
                  us:
                </p>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-blue-700 text-sm sm:text-base">
                    <span className="font-medium">Email:</span>{" "}
                    privacy@ticketsystem.com
                  </p>
                  <p className="text-blue-700 text-sm sm:text-base">
                    <span className="font-medium">Address:</span> 123 Privacy
                    Street, Security City, SC 12345
                  </p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    Policy Updates
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-lg">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new policy on this
                    page.
                  </p>
                </div>
                <Link
                  to="/terms"
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  View Terms of Service
                  <svg
                    className="ml-2 h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              <svg
                className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
