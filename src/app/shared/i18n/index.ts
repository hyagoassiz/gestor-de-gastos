import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./pt.json";
// import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    // en: { translation: en },
    pt: { translation: pt },
  },
  lng: "pt", // Define o idioma padrão
  fallbackLng: "en", // Idioma de fallback caso a tradução não seja encontrada
  interpolation: {
    escapeValue: false, // React já faz a proteção contra XSS
  },
});

export default i18n;
