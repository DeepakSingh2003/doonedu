"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // Default to English

  // Function to translate text using LibreTranslate API
  const translateText = async (text, targetLang) => {
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: targetLang === "hi" ? "hi" : "en",
          format: "text",
        }),
      });
      const data = await response.json();
      return data.translatedText || text; // Fallback to original text if translation fails
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
