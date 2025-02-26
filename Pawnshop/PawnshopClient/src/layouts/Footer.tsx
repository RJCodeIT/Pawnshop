import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">{t('contact.title')}</h3>
              <p className="text-emerald-100">{t('contact.email')}</p>
              <p className="text-emerald-100">{t('contact.phone')}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">{t('openingHours.title')}</h3>
              <p className="text-emerald-100">{t('openingHours.weekdays')}</p>
              <p className="text-emerald-100">{t('openingHours.saturday')}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">{t('information.title')}</h3>
              <ul className="text-emerald-100 space-y-2">
                <li>{t('information.terms')}</li>
                <li>{t('information.privacy')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-500">
            <p className="text-center text-emerald-100">&copy; {new Date().getFullYear()} Pawnshop. {t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
