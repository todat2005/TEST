import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFoundPage from "./pages/404Page.jsx";
import ErrorServerPage from "./pages/500Page.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<NotFoundPage />} />
        <Route path="/about" element={<NotFoundPage />} />
        <Route path="/services" element={<NotFoundPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/500" element={<ErrorServerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
