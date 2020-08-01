import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n.use(XHR).init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: true
    },
    backend: {
        queryStringParams: { version: env.VERSION },
        loadPath: '/resources/locale/{{lng}}/{{ns}}.json'
    },
});

export default i18n;