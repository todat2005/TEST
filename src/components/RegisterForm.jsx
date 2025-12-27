import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.jsx";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    birthdate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkConfirmPassword = () => {
    return formData.password === formData.confirmPassword;
  };

  const checkLengthPassword = () => {
    return formData.password.length >= 8;
  };

  const checkBirthdate = () => {
    const today = new Date();
    const birthDate = new Date(formData.birthdate);
    if (birthDate >= today) {
      return false;
    }
    return true;
  };

  const checkGender = () => {
    const genders = ["male", "female", "other"];
    return genders.includes(formData.gender);
  };

  const toMySQLDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage("");
      setIsSuccess(false);

      if (!acceptedTerms) {
        setErrorMessage("You must accept the Terms and Conditions.");
        setIsLoading(false);
        return;
      }

      if (!checkConfirmPassword()) {
        setErrorMessage("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      if (!checkBirthdate()) {
        setErrorMessage("Invalid birthdate.");
        setIsLoading(false);
        return;
      }

      if (!checkGender()) {
        setErrorMessage("Please select a valid gender.");
        setIsLoading(false);
        return;
      }

      if (!checkLengthPassword()) {
        setErrorMessage("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          phonenumber: formData.phonenumber,
          birthdate: toMySQLDate(formData.birthdate),
          gender: formData.gender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phonenumber: "",
        birthdate: "",
        gender: "",
      });
      setAcceptedTerms(false);
      setIsSuccess(true);
    } catch (err) {
      navigate("/500");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} message="Creating account..." />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
        <div className={`max-w-6xl w-full ${isLoading ? "opacity-60" : ""}`}>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <img
                src="./images/logo.svg"
                alt="logo"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 inline-block mb-3 md:mb-4"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Create Account
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Fill in your details to create an account
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 sm:mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm text-center">
                {errorMessage}
              </div>
            )}

            {isSuccess && (
              <div className="mb-4 sm:mb-6 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm text-center">
                Account created successfully! You can now login.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - Personal Information */}
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-base sm:text-lg font-medium text-gray-700 border-b pb-2">
                    Personal Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      value={formData.fullname}
                      onChange={(e) => {
                        setFormData({ ...formData, fullname: e.target.value });
                      }}
                      type="text"
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Nguyen Van A"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your first and last name
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      type="email"
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      value={formData.phonenumber}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phonenumber: e.target.value,
                        });
                      }}
                      type="tel"
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="+84 123 456 789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Birthdate *
                    </label>
                    <input
                      value={formData.birthdate}
                      onChange={(e) => {
                        setFormData({ ...formData, birthdate: e.target.value });
                      }}
                      type="date"
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be a past date
                    </p>
                  </div>
                </div>

                {/* Right Column - Account Details */}
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-base sm:text-lg font-medium text-gray-700 border-b pb-2">
                    Account Details
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => {
                        setFormData({ ...formData, gender: e.target.value });
                      }}
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      required
                    >
                      <option value="">--Select gender--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-10 sm:pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
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
                    <p className="text-xs text-gray-500 mt-1">
                      At least 8 characters with letters and numbers
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          });
                        }}
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isLoading}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-10 sm:pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
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
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Re-enter your password
                    </p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="lg:col-span-2 pt-4">
                    <div className="flex items-start">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        disabled={isLoading}
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-600"
                      >
                        I accept the{" "}
                        <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                          Terms and Conditions
                        </span>{" "}
                        and acknowledge the{" "}
                        <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                          Privacy Policy
                        </span>
                        . *
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="lg:col-span-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="lg:col-span-2 text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
