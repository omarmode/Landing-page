import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaHome,
  FaPhone,
  FaLock,
  FaUsers,
  FaCogs,
} from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import TranslationButton from "./Component/translatePage";
import "./locales/i18n"
import { useTranslation } from "react-i18next";

// صفحات أخرى
function Home() {
  const { t } = useTranslation();
  return <h2 className="text-2xl">{t("home.page_title")}</h2>;
}


function Contact() {
  return <h2 className="text-2xl">Contact Us Page</h2>;
}

function PrivacyPolicy() {
  return <h2 className="text-2xl">Privacy Policy Page</h2>;
}
function About() {
  const { t } = useTranslation();
  return <h2 className="text-2xl">{t("about.page_title")}</h2>;
}


function Services() {
  const { t } = useTranslation();
  return <h2 className="text-2xl">{t("services.page_title")}</h2>;
}


function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
  
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="w-full p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Icon to open sidebar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-xl font-bold text-black dark:text-white">
              My Website
            </h1>
          </div>
          <div className="hidden lg:flex space-x-4">
  <Link to="/" className="text-black dark:text-white">
    {t("navbar.home")}
  </Link>
  <Link to="/about" className="text-black dark:text-white">
    {t("navbar.about")}
  </Link>
  <Link to="/services" className="text-black dark:text-white">
    {t("navbar.services")}
  </Link>
  <Link to="/contact" className="text-black dark:text-white">
    {t("navbar.contact")}
  </Link>
</div>

<div className="flex space-x-4">
  
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

  
  <button
    onClick={toggleLanguage}
    className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
  >
    {i18n.language === "en" ? "AR" : "EN"}
  </button>
</div>

        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`h-screen bg-gray-100 dark:bg-gray-800 shadow-lg transition-all duration-500 ease-in-out ${
              isSidebarOpen ? "w-64" : "w-16"
            }`}
          >
     <div className="p-4">
  <Link
    to="/"
    className="flex items-center mb-4 text-black dark:text-white"
    onClick={() => setIsSidebarOpen(false)}
  >
    <FaHome className="mr-2" />
    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
      {t("navbar.home")}
    </span>
  </Link>
  <Link
    to="/about"
    className="flex items-center mb-4 text-black dark:text-white"
    onClick={() => setIsSidebarOpen(false)}
  >
    <FaUsers className="mr-2" />
    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
      {t("navbar.about")}
    </span>
  </Link>
  <Link
    to="/services"
    className="flex items-center mb-4 text-black dark:text-white"
    onClick={() => setIsSidebarOpen(false)}
  >
    <FaCogs className="mr-2" />
    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
      {t("navbar.services")}
    </span>
  </Link>
  <Link
    to="/contact"
    className="flex items-center mb-4 text-black dark:text-white"
    onClick={() => setIsSidebarOpen(false)}
  >
    <FaPhone className="mr-2" />
    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
      {t("navbar.contact")}
    </span>
  </Link>
</div>

          </div>

          
          <div
            className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? "pl-64" : "pl-16"
            } w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8`}
          >
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/About" element={<About />} />
              <Route path="/Services" element={<Services />} />
            </Routes>
            
          </div>
          
        </div>
        <footer className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h2 className="text-xl font-bold mb-4">{t("footer.company")}</h2>
      <p>{t("footer.description")}</p>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-4">{t("footer.policies")}</h2>
      <ul>
        <li>
          <Link to="/privacy-policy" className="hover:underline">
            {t("footer.privacy_policy")}
          </Link>
        </li>
        <li>
          <Link to="/terms" className="hover:underline">
            {t("footer.terms_of_service")}
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-4">{t("footer.contact_info")}</h2>
      <ul>
        <li>{t("footer.email")}: support@uniqlink.net</li>
        <li>{t("footer.phone")}: +123 456 789</li>
        <li>{t("footer.address")}: 27 Abdel Salam Farid Street</li>
      </ul>
    </div>
  </div>
</footer>


      </div>
    </Router>
  );
}

export default App;
