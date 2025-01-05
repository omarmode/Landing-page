import { useState } from "react";
import axios from "axios";

function TranslationButton() {
  const [language, setLanguage] = useState("en");

  const translatePage = async () => {
    try {
      const targetLang = language === "en" ? "ar" : "en";
      const elementsToTranslate = document.querySelectorAll("h1, h2, p, span, a, li");

      for (let element of elementsToTranslate) {
        const text = element.innerText.trim(); // إزالة المسافات الفارغة
        if (!text) continue; // تخطي العناصر الفارغة

        const response = await axios.get(
          `https://translation.googleapis.com/language/translate/v2`,
          {
            params: {
              key: "YOUR_GOOGLE_API_KEY", // ضع مفتاح Google API هنا
              q: text,
              target: targetLang,
              format: "text",
            },
          }
        );

        element.innerText = response.data.data.translations[0].translatedText;
      }

      setLanguage(targetLang);
    } catch (error) {
      console.error("Error translating page:", error);
    }
  };

  return (
    <button
      onClick={translatePage}
      className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
    >
      {language === "en" ? "ترجمة إلى العربية" : "Translate to English"}
    </button>
  );
}

export default TranslationButton;
