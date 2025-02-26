import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const saveLanguage = () => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('settings.welcome')}</h1>
          <p className="text-gray-600">{t('settings.description')}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              {t('settings.selectLanguage')}
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={handleLanguageChange}
              className="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       shadow-sm transition-colors duration-200"
            >
              <option value="en">English</option>
              <option value="pl">Polish</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={saveLanguage}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('settings.saveButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
