import i18n from "i18next"
import translations from "./translations"

i18n.init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    saveMissing: false,
    interpolation: {
        escapeValue: false,
    },
    defaultNS: 'general',
    react : {
        wait : false,
        useSuspense: false,
        nsMode : "fallback",
        withRef: true
    },
    resources: {
        'en': translations
    }
});

export default i18n;
