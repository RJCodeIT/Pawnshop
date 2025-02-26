import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enSettings from "./translations/settings/en.json";
import plSettings from "./translations/settings/pl.json";
import enHomeNavbar from "./translations/homeNavbar/en.json";
import plHomeNavbar from "./translations/homeNavbar/pl.json";
import enFooter from "./translations/footer/en.json";
import plFooter from "./translations/footer/pl.json";
import enContactForm from "./translations/contactForm/en.json";
import plContactForm from "./translations/contactForm/pl.json";
import enHome from "./translations/home/en.json";
import plHome from "./translations/home/pl.json";
import loginEN from "./translations/login/en.json";
import loginPL from "./translations/login/pl.json";
import navbarEN from "./translations/navbar/en.json";
import navbarPL from "./translations/navbar/pl.json";
import sidebarEN from "./translations/sidebar/en.json";
import sidebarPL from "./translations/sidebar/pl.json";
import contactFormEN from "./translations/contactForm/en.json";
import contactFormPL from "./translations/contactForm/pl.json";
import formsEN from "./translations/forms/en.json";
import formsPL from "./translations/forms/pl.json";
import dashboardEN from "./translations/dashboard/en.json";
import dashboardPL from "./translations/dashboard/pl.json";

const resources = {
  en: {
    translation: {
      ...enSettings,
      ...enHomeNavbar,
      ...enFooter,
      ...enContactForm,
      ...enHome,
      ...loginEN,
      ...navbarEN,
      ...sidebarEN,
      ...contactFormEN,
      ...formsEN,
      ...dashboardEN
    }
  },
  pl: {
    translation: {
      ...plSettings,
      ...plHomeNavbar,
      ...plFooter,
      ...plContactForm,
      ...plHome,
      ...loginPL,
      ...navbarPL,
      ...sidebarPL,
      ...contactFormPL,
      ...formsPL,
      ...dashboardPL
    }
  }
};

const savedLanguage = localStorage.getItem("language") || "pl";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
