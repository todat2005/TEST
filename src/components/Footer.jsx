import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  // Đọc ngôn ngữ từ localStorage khi component mount
  const language = localStorage.getItem("language") || "vi";

  const translations = {
    vi: {
      footerLinks: [
        {
          to: "/homepage",
          label: "Trang chủ",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          to: "/movies",
          label: "Phim",
          icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z",
        },
        {
          to: "/theaters",
          label: "Rạp phim",
          icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        },
      ],
      legalLinks: [
        { to: "/privacy", label: "Chính sách bảo mật" },
        { to: "/contact", label: "Liên hệ" },
      ],
      headings: {
        quickLinks: "Liên kết nhanh",
        contact: "Liên hệ",
        followUs: "Theo dõi chúng tôi",
      },
      contactInfo: {
        hotline: "Hotline",
        email: "Email",
        address: "Địa chỉ",
      },
      description: "Nền tảng đặt vé trực tuyến hàng đầu Việt Nam.",
      copyright: "Tất cả quyền được bảo lưu.",
    },
    en: {
      footerLinks: [
        {
          to: "/homepage",
          label: "Home",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          to: "/movies",
          label: "Movies",
          icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z",
        },
        {
          to: "/theaters",
          label: "Theaters",
          icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        },
      ],
      legalLinks: [
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/contact", label: "Contact" },
      ],
      headings: {
        quickLinks: "Quick Links",
        contact: "Contact",
        followUs: "Follow Us",
      },
      contactInfo: {
        hotline: "Hotline",
        email: "Email",
        address: "Address",
      },
      description: "Vietnam's leading online ticket booking platform.",
      copyright: "All rights reserved.",
    },
  };

  const t = translations[language];

  const socialLinks = [
    {
      href: "https://www.facebook.com/freefiredi",
      label: "Facebook",
      icon: (
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      ),
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
      ),
    },
  ];

  return (
    <footer className="bg-gray-50 border-t-2 border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <img
                src="./images/logo.svg"
                className="h-10 w-10"
                alt="CinemaHub Logo"
              />
              <span className="text-2xl font-bold text-gray-900">
                CinemaHub
              </span>
            </div>
            <p className="text-gray-600 mb-6">{t.description}</p>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t.headings.followUs}
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
                    aria-label={social.label}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links with Icons */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.headings.quickLinks}
            </h3>
            <ul className="space-y-3">
              {t.footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={link.icon}
                      />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information with Icons */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.headings.contact}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">
                    {t.contactInfo.hotline}
                  </p>
                  <a
                    href="tel:19001234"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    1900-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">
                    {t.contactInfo.email}
                  </p>
                  <a
                    href="mailto:support@cinemahub.vn"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    support@cinemahub.vn
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">
                    {t.contactInfo.address}
                  </p>
                  <p className="text-gray-600">123 Nguyễn Huệ, Q.1, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CinemaHub. {t.copyright}
            </p>

            {/* Legal Links */}
            <ul className="flex justify-center space-x-6 text-sm">
              {t.legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
