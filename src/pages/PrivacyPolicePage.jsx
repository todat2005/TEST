import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function PrivacyPolicy() {
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated:",

      introduction: {
        title: "Introduction",
        text1:
          "Welcome to our Privacy Policy. Your privacy is critically important to us. This privacy policy describes how we collect, use, and share your personal information when you use our website and services.",
        text2:
          "By using our website, you consent to the collection and use of information in accordance with this policy.",
      },

      informationWeCollect: {
        title: "Information We Collect",
        personalInfo: {
          title: "Personal Information",
          description:
            "When you register for an account, we may collect personal information such as:",
          items: [
            "Email address",
            "Username",
            "Password (encrypted)",
            "Profile information you provide",
          ],
        },
        usageData: {
          title: "Usage Data",
          description:
            "We automatically collect information about how you interact with our website:",
          items: [
            "IP address and browser type",
            "Pages visited and time spent",
            "Device information",
            "Cookies and tracking technologies",
          ],
        },
      },

      howWeUse: {
        title: "How We Use Your Information",
        service: "Service Provision",
        serviceDesc:
          "To create and manage your account, provide customer support, and deliver our services.",
        improvement: "Improvement",
        improvementDesc:
          "To analyze usage patterns, improve our website functionality, and develop new features.",
        communication: "Communication",
        communicationDesc:
          "To send important updates, security alerts, and respond to your inquiries.",
        security: "Security",
        securityDesc:
          "To detect and prevent fraud, unauthorized access, and ensure the security of our platform.",
      },

      cookies: {
        title: "Cookies and Tracking Technologies",
        notice: "Important Notice",
        description:
          "We use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us:",
        items: [
          "Remember your preferences and login status",
          "Analyze website traffic and performance",
          "Personalize content and advertisements",
        ],
        control:
          "You can control cookies through your browser settings. However, disabling cookies may affect some features of our website.",
      },

      dataSharing: {
        title: "Data Sharing and Disclosure",
        description:
          "We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:",
        legal: "Legal Requirements",
        legalDesc: "When required by law or to protect rights",
        serviceProviders: "Service Providers",
        serviceProvidersDesc: "Trusted partners who assist in operations",
        businessTransfer: "Business Transfer",
        businessTransferDesc: "In case of merger, acquisition, or sale",
        withConsent: "With Your Consent",
        withConsentDesc: "When you explicitly authorize sharing",
      },

      dataSecurity: {
        title: "Data Security",
        heading: "We Take Security Seriously",
        description:
          "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        items: [
          "Encryption of sensitive data",
          "Regular security audits",
          "Access controls and authentication",
          "Secure server infrastructure",
        ],
      },

      yourRights: {
        title: "Your Rights",
        access: "Access & Correction",
        accessDesc:
          "You can access and update your personal information through your account settings.",
        deletion: "Data Deletion",
        deletionDesc:
          "You may request deletion of your account and associated data by contacting us.",
        optOut: "Opt-Out",
        optOutDesc:
          "You can opt out of marketing communications at any time by clicking unsubscribe.",
        portability: "Data Portability",
        portabilityDesc:
          "You have the right to request a copy of your data in a structured format.",
      },

      contactUs: {
        title: "Contact Us",
        heading: "Questions About Our Privacy Policy?",
        description:
          "If you have any questions or concerns about our Privacy Policy or how we handle your data, please don't hesitate to contact us:",
        email: "Email:",
        address: "Address:",
      },

      updates: {
        title: "Policy Updates",
        description:
          "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.",
        terms: "View Terms of Service",
      },

      backHome: "Back to Home",
    },
    vi: {
      title: "Chính Sách Bảo Mật",
      lastUpdated: "Cập nhật lần cuối:",

      introduction: {
        title: "Giới thiệu",
        text1:
          "Chào mừng bạn đến với Chính sách Bảo mật của chúng tôi. Quyền riêng tư của bạn là vô cùng quan trọng với chúng tôi. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và chia sẻ thông tin cá nhân của bạn khi bạn sử dụng trang web và dịch vụ của chúng tôi.",
        text2:
          "Bằng việc sử dụng trang web của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.",
      },

      informationWeCollect: {
        title: "Thông Tin Chúng Tôi Thu Thập",
        personalInfo: {
          title: "Thông Tin Cá Nhân",
          description:
            "Khi bạn đăng ký tài khoản, chúng tôi có thể thu thập thông tin cá nhân như:",
          items: [
            "Địa chỉ email",
            "Tên người dùng",
            "Mật khẩu (đã mã hóa)",
            "Thông tin hồ sơ bạn cung cấp",
          ],
        },
        usageData: {
          title: "Dữ Liệu Sử Dụng",
          description:
            "Chúng tôi tự động thu thập thông tin về cách bạn tương tác với trang web của chúng tôi:",
          items: [
            "Địa chỉ IP và loại trình duyệt",
            "Trang đã truy cập và thời gian sử dụng",
            "Thông tin thiết bị",
            "Cookie và công nghệ theo dõi",
          ],
        },
      },

      howWeUse: {
        title: "Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn",
        service: "Cung Cấp Dịch Vụ",
        serviceDesc:
          "Để tạo và quản lý tài khoản của bạn, cung cấp hỗ trợ khách hàng và cung cấp dịch vụ của chúng tôi.",
        improvement: "Cải Thiện",
        improvementDesc:
          "Để phân tích mẫu sử dụng, cải thiện chức năng trang web và phát triển tính năng mới.",
        communication: "Liên Lạc",
        communicationDesc:
          "Để gửi các bản cập nhật quan trọng, cảnh báo bảo mật và phản hồi các yêu cầu của bạn.",
        security: "Bảo Mật",
        securityDesc:
          "Để phát hiện và ngăn chặn gian lận, truy cập trái phép và đảm bảo bảo mật nền tảng của chúng tôi.",
      },

      cookies: {
        title: "Cookie và Công Nghệ Theo Dõi",
        notice: "Thông Báo Quan Trọng",
        description:
          "Chúng tôi sử dụng cookie để nâng cao trải nghiệm duyệt web của bạn. Cookie là các tệp dữ liệu nhỏ được lưu trữ trên thiết bị của bạn giúp chúng tôi:",
        items: [
          "Ghi nhớ tùy chọn và trạng thái đăng nhập của bạn",
          "Phân tích lưu lượng và hiệu suất trang web",
          "Cá nhân hóa nội dung và quảng cáo",
        ],
        control:
          "Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt. Tuy nhiên, việc tắt cookie có thể ảnh hưởng đến một số tính năng của trang web của chúng tôi.",
      },

      dataSharing: {
        title: "Chia Sẻ và Tiết Lộ Dữ Liệu",
        description:
          "Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:",
        legal: "Yêu Cầu Pháp Lý",
        legalDesc: "Khi được yêu cầu bởi pháp luật hoặc để bảo vệ quyền lợi",
        serviceProviders: "Nhà Cung Cấp Dịch Vụ",
        serviceProvidersDesc: "Các đối tác đáng tin cậy hỗ trợ trong hoạt động",
        businessTransfer: "Chuyển Nhượng Kinh Doanh",
        businessTransferDesc: "Trường hợp sáp nhập, mua lại hoặc bán",
        withConsent: "Với Sự Đồng Ý Của Bạn",
        withConsentDesc: "Khi bạn ủy quyền chia sẻ rõ ràng",
      },

      dataSecurity: {
        title: "Bảo Mật Dữ Liệu",
        heading: "Chúng Tôi Coi Trọng Bảo Mật",
        description:
          "Chúng tôi triển khai các biện pháp bảo mật kỹ thuật và tổ chức thích hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy.",
        items: [
          "Mã hóa dữ liệu nhạy cảm",
          "Kiểm tra bảo mật định kỳ",
          "Kiểm soát truy cập và xác thực",
          "Cơ sở hạ tầng máy chủ an toàn",
        ],
      },

      yourRights: {
        title: "Quyền Của Bạn",
        access: "Truy Cập & Sửa Đổi",
        accessDesc:
          "Bạn có thể truy cập và cập nhật thông tin cá nhân của mình thông qua cài đặt tài khoản.",
        deletion: "Xóa Dữ Liệu",
        deletionDesc:
          "Bạn có thể yêu cầu xóa tài khoản và dữ liệu liên quan bằng cách liên hệ với chúng tôi.",
        optOut: "Không Tham Gia",
        optOutDesc:
          "Bạn có thể không tham gia nhận thông tin tiếp thị bất kỳ lúc nào bằng cách nhấp vào hủy đăng ký.",
        portability: "Tính Di Động Dữ Liệu",
        portabilityDesc:
          "Bạn có quyền yêu cầu một bản sao dữ liệu của mình ở định dạng có cấu trúc.",
      },

      contactUs: {
        title: "Liên Hệ Chúng Tôi",
        heading: "Có Câu Hỏi Về Chính Sách Bảo Mật Của Chúng Tôi?",
        description:
          "Nếu bạn có bất kỳ câu hỏi hoặc lo ngại nào về Chính sách Bảo mật của chúng tôi hoặc cách chúng tôi xử lý dữ liệu của bạn, đừng ngần ngại liên hệ với chúng tôi:",
        email: "Email:",
        address: "Địa chỉ:",
      },

      updates: {
        title: "Cập Nhật Chính Sách",
        description:
          "Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này.",
        terms: "Xem Điều Khoản Dịch Vụ",
      },

      backHome: "Quay về Trang chủ",
    },
  };

  const t = translations[language];

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
