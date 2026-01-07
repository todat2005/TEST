import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import translationsPrivacyPolicePage from "../translations/PrivacyPolicePage.js";
function PrivacyPolicy() {
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";
  const t =
    language === "vi"
      ? translationsPrivacyPolicePage.vi
      : translationsPrivacyPolicePage.en;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              {t.lastUpdated}{" "}
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
                {t.introduction.title}
              </h2>
              <p className="text-gray-700 mb-3 sm:mb-4">
                {t.introduction.text1}
              </p>
              <p className="text-gray-700">{t.introduction.text2}</p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.informationWeCollect.title}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.informationWeCollect.personalInfo.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {t.informationWeCollect.personalInfo.description}
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                    {t.informationWeCollect.personalInfo.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.informationWeCollect.usageData.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {t.informationWeCollect.usageData.description}
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                    {t.informationWeCollect.usageData.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.howWeUse.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.howWeUse.service}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {t.howWeUse.serviceDesc}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.howWeUse.improvement}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {t.howWeUse.improvementDesc}
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.howWeUse.communication}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {t.howWeUse.communicationDesc}
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.howWeUse.security}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {t.howWeUse.securityDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.cookies.title}
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">
                  {t.cookies.notice}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {t.cookies.description}
                </p>
                <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                  {t.cookies.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base">
                  {t.cookies.control}
                </p>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.dataSharing.title}
              </h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                {t.dataSharing.description}
              </p>
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          {language === "vi" ? "Tình huống" : "Situation"}
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          {language === "vi" ? "Tiết lộ" : "Disclosure"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          {t.dataSharing.legal}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          {t.dataSharing.legalDesc}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          {t.dataSharing.serviceProviders}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          {t.dataSharing.serviceProvidersDesc}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          {t.dataSharing.businessTransfer}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          {t.dataSharing.businessTransferDesc}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">
                          {t.dataSharing.withConsent}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                          {t.dataSharing.withConsentDesc}
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
                {t.dataSecurity.title}
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
                      {t.dataSecurity.heading}
                    </h3>
                    <p className="text-green-700 mt-1 sm:mt-2 text-sm sm:text-base">
                      {t.dataSecurity.description}
                    </p>
                    <ul className="list-disc pl-4 sm:pl-5 mt-2 sm:mt-3 text-green-700 space-y-1 text-sm sm:text-base">
                      {t.dataSecurity.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.yourRights.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.yourRights.access}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t.yourRights.accessDesc}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.yourRights.deletion}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t.yourRights.deletionDesc}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.yourRights.optOut}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t.yourRights.optOutDesc}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.yourRights.portability}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t.yourRights.portabilityDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {t.contactUs.title}
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-blue-800 mb-2 sm:mb-3">
                  {t.contactUs.heading}
                </h3>
                <p className="text-blue-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  {t.contactUs.description}
                </p>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-blue-700 text-sm sm:text-base">
                    <span className="font-medium">{t.contactUs.email}</span>{" "}
                    privacy@ticketsystem.com
                  </p>
                  <p className="text-blue-700 text-sm sm:text-base">
                    <span className="font-medium">{t.contactUs.address}</span>{" "}
                    123 Privacy Street, Security City, SC 12345
                  </p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    {t.updates.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-lg">
                    {t.updates.description}
                  </p>
                </div>
                <Link
                  to="/terms"
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  {t.updates.terms}
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
              {t.backHome}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
