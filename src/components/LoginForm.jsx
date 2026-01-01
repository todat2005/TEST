import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.jsx";

function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("vi");

  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Khởi tạo ngôn ngữ từ localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Theo dõi thay đổi ngôn ngữ
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage && savedLanguage !== language) {
        setLanguage(savedLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [language]);

  const translations = {
    vi: {
      title: "Đăng nhập vào tài khoản của bạn",
      subtitle: "Chào mừng trở lại! Vui lòng nhập thông tin của bạn",
      usernameLabel: "Số điện thoại hoặc Email",
      usernamePlaceholder: "Nhập số điện thoại hoặc email của bạn",
      passwordLabel: "Mật khẩu",
      passwordPlaceholder: "Nhập mật khẩu của bạn",
      rememberMe: "Ghi nhớ đăng nhập",
      forgotPassword: "Quên mật khẩu?",
      signIn: "Đăng nhập",
      signingIn: "Đang đăng nhập...",
      noAccount: "Chưa có tài khoản?",
      signUpNow: "Đăng ký ngay",
      errorMessages: {
        loginFailed: "Đăng nhập thất bại",
        serverError: "Lỗi máy chủ",
      },
    },
    en: {
      title: "Sign in to your account",
      subtitle: "Welcome back! Please enter your details",
      usernameLabel: "Phone Number or Email",
      usernamePlaceholder: "Enter your phone or email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign in",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      signUpNow: "Sign up now",
      errorMessages: {
        loginFailed: "Login failed",
        serverError: "Server error",
      },
    },
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || t.errorMessages.loginFailed);
        return;
      }

      if (isRememberMe) {
        localStorage.setItem("username", username);
      } else {
        localStorage.removeItem("username");
      }

      document.cookie = `token=${data.token}; path=/; max-age=3600`;
      navigate("/homepage");
    } catch (err) {
      navigate("/500");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} message={t.signingIn} />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
        <div className={`max-w-md w-full ${isLoading ? "opacity-60" : ""}`}>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <img
                src="./images/logo.svg"
                alt="logo"
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {t.title}
              </h1>
              <p className="mt-1 sm:mt-2 text-sm text-gray-600">{t.subtitle}</p>
            </div>

            {message && (
              <div className="mb-4 sm:mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm text-center">
                {message}
              </div>
            )}

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  {t.usernameLabel}
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  disabled={isLoading}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  placeholder={t.usernamePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-10 sm:pr-12 transition-colors"
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                    aria-label={
                      showPassword
                        ? language === "vi"
                          ? "Ẩn mật khẩu"
                          : "Hide password"
                        : language === "vi"
                        ? "Hiện mật khẩu"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    checked={isRememberMe}
                    onChange={(e) => setIsRememberMe(e.target.checked)}
                    type="checkbox"
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    {t.rememberMe}
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className={`text-sm font-medium ${
                    isLoading
                      ? "text-gray-400 pointer-events-none"
                      : "text-blue-600 hover:text-blue-500"
                  } transition-colors`}
                >
                  {t.forgotPassword}
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.signingIn}
                  </span>
                ) : (
                  t.signIn
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  {t.noAccount}{" "}
                  <Link
                    to="/register"
                    className={`font-medium ${
                      isLoading
                        ? "text-gray-400 pointer-events-none"
                        : "text-blue-600 hover:text-blue-500"
                    } transition-colors`}
                  >
                    {t.signUpNow}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
