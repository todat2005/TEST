import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import translationsContactPage from "../translations/ContactPage.js";
function Contact() {
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";
  // Dữ liệu đa ngôn ngữ cho trang Contact
  const googleMapAddress =
    "https://www.google.com/maps/place/%C4%90%E1%BA%AFk+L%E1%BA%AFk,+Vi%E1%BB%87t+Nam/@12.7892072,107.5791459,217713m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3171f7daf7307157:0x8ef97694d9883315!8m2!3d12.7100116!4d108.2377519!16zL20vMDUzZDU3?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";
  const t =
    language === "en" ? translationsContactPage.en : translationsContactPage.vi;

  const contactMethods = [
    {
      title: t.phoneSupport,
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      contacts: [
        { label: t.hotline, number: "+84 357 808 450" },
        { label: t.support, number: "+84 357 808 450" },
        { label: t.sales, number: "+84 357 808 450" },
      ],
      hours: t.hours,
    },
    {
      title: t.emailContact,
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      contacts: [
        { label: t.general, email: "freefirediae@gmail.com" },
        { label: t.support, email: "freefirediae@gmail.com" },
        { label: t.technical, email: "freefirediae@gmail.com" },
      ],
      response: t.response,
    },
    {
      title: t.officeLocation,
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      contacts: [
        { label: t.headquarters, address: "123 Business St, District 1" },
        { label: t.city, address: "Ho Chi Minh City" },
        { label: t.country, address: "Vietnam 700000" },
      ],
      hours: t.openHours,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d={method.icon}
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {method.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {method.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-blue-200 pl-4 py-1"
                    >
                      <p className="text-sm text-gray-600 font-medium">
                        {contact.label}
                      </p>
                      <p className="text-gray-800 font-medium">
                        {contact.number || contact.email || contact.address}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {method.hours || method.response}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {t.quickActions}
              </h2>
              <p className="text-gray-600">{t.quickSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href={`tel:${contactMethods[0].contacts[0].number}`}
                className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t.callNow}
                </h3>
                <p className="text-blue-600 font-medium text-center">
                  {contactMethods[0].contacts[0].number}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {t.immediateAssistance}
                </p>
              </a>

              <a
                href="mailto:support@ticketsystem.com"
                className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t.emailUs}
                </h3>
                <p className="text-green-600 font-medium text-center">
                  {contactMethods[1].contacts[1].email}
                </p>
                <p className="text-sm text-gray-500 mt-2">{t.emailSupport}</p>
              </a>

              <a
                href={googleMapAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t.visitOffice}
                </h3>
                <p className="text-purple-600 font-medium text-center">
                  {contactMethods[2].contacts[0].address +
                    ", " +
                    contactMethods[2].contacts[1].address +
                    ", " +
                    contactMethods[2].contacts[2].address}
                </p>
                <p className="text-sm text-gray-500 mt-2">{t.getDirections}</p>
              </a>

              <Link
                to="/support"
                className="flex flex-col items-center p-6 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t.supportCenter}
                </h3>
                <p className="text-orange-600 font-medium text-center">
                  {t.faqHelp}
                </p>
                <p className="text-sm text-gray-500 mt-2">{t.findAnswers}</p>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              <svg
                className="mr-2 h-5 w-5"
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

export default Contact;
