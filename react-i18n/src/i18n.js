import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    whitelist: ["en", "es"],
    interpolation: {
      escapeValue: false,
    },
    react: { wait: true, useSuspense: false },
  });

export default i18n;
