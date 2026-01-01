import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const language = localStorage.getItem("language") || "vi";
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownDesktopRef = useRef(null);
  const langDropdownMobileRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const selectLanguage = (langCode) => {
    // Lưu vào localStorage
    localStorage.setItem("language", langCode);
    // Reload trang để tất cả component nhận ngôn ngữ mới
    window.location.reload();
    setIsLangDropdownOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check desktop dropdown
      if (
        langDropdownDesktopRef.current &&
        !langDropdownDesktopRef.current.contains(event.target)
      ) {
        setIsLangDropdownOpen(false);
      }
      // Check mobile dropdown
      if (
        langDropdownMobileRef.current &&
        !langDropdownMobileRef.current.contains(event.target)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    // Chỉ lắng nghe khi dropdown đang mở
    if (isLangDropdownOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  // Danh sách ngôn ngữ hỗ trợ
  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const translations = {
    vi: {
      navItems: [
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
      brandName: "CinemaHub",
      selectLanguage: "Ngôn ngữ",
      userActions: {
        login: "Đăng nhập",
        register: "Đăng ký",
        profile: "Tài khoản",
      },
      ariaLabels: {
        menu: "Menu",
        language: "Chọn ngôn ngữ",
        user: "Tài khoản",
      },
    },
    en: {
      navItems: [
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
      brandName: "CinemaHub",
      selectLanguage: "Language",
      userActions: {
        login: "Login",
        register: "Register",
        profile: "Account",
      },
      ariaLabels: {
        menu: "Menu",
        language: "Select language",
        user: "Account",
      },
    },
  };

  const t = translations[language];

  return (
    <nav className="bg-white fixed w-full z-30 top-0 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo và Brand - Clickable để về trang chủ */}
          <Link
            to="/homepage"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img
                src="./images/logo.svg"
                className="h-8 w-8"
                alt="CinemaHub Logo"
              />
              <span className="text-xl font-bold text-gray-900">
                {t.brandName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Center với Icons */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <ul className="flex space-x-1 font-medium">
              {t.navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      />
                    </svg>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions (Language + User) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.userActions.login}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.userActions.register}
              </Link>
              <Link
                to="/profile"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={t.ariaLabels.user}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>

            {/* Language Select Dropdown - DESKTOP */}
            <div className="relative" ref={langDropdownDesktopRef}>
              <button
                type="button"
                onClick={toggleLangDropdown}
                className="flex items-center justify-between w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t.ariaLabels.language}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="true"
                id="language-desktop-button"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-base">{currentLanguage.flag}</span>
                  <span className="font-medium">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - DESKTOP */}
              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  role="menu"
                  aria-labelledby="language-desktop-button"
                >
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          language === lang.code
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        role="menuitem"
                      >
                        <span className="mr-3 text-base">{lang.flag}</span>
                        <span className="flex-1 text-left">{lang.name}</span>
                        <span className="text-xs font-semibold text-gray-500">
                          {lang.code.toUpperCase()}
                        </span>
                        {language === lang.code && (
                          <svg
                            className="w-4 h-4 ml-2 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile User Icon */}
            <Link
              to="/profile"
              className="p-2 text-gray-500 hover:text-blue-600 rounded-lg"
              aria-label={t.ariaLabels.user}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Mobile Language Select - MOBILE */}
            <div className="relative" ref={langDropdownMobileRef}>
              <button
                type="button"
                onClick={toggleLangDropdown}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                aria-label={t.ariaLabels.language}
                aria-expanded={isLangDropdownOpen}
                id="language-mobile-button"
              >
                <span className="mr-1">{currentLanguage.flag}</span>
                <span className="font-semibold">
                  {currentLanguage.code.toUpperCase()}
                </span>
              </button>

              {/* Mobile Dropdown Menu - MOBILE */}
              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  role="menu"
                  aria-labelledby="language-mobile-button"
                >
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        className={`flex items-center w-full px-3 py-2 text-sm ${
                          language === lang.code
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        role="menuitem"
                      >
                        <span className="mr-2">{lang.flag}</span>
                        <span className="flex-1 text-left">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none"
              aria-label={t.ariaLabels.menu}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Expanded) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {/* Navigation Items with Icons */}
              {t.navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-lg ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}

              {/* User Actions in Mobile Menu */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    {t.userActions.login}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    {t.userActions.register}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
