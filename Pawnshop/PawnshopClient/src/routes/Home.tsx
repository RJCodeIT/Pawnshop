import { useTranslation } from "react-i18next";
import HomeNavbar from "../layouts/HomeNavbar";
import Footer from "../layouts/Footer";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const { t } = useTranslation();
  
  const features = [
    t('about.features.list.0'),
    t('about.features.list.1'),
    t('about.features.list.2'),
    t('about.features.list.3')
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-emerald-50 to-white">
      <HomeNavbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            
            {/* About Section */}
            <div className="lg:w-1/2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-4xl font-bold mb-8 text-emerald-800 border-b-2 border-emerald-200 pb-4">
                  {t('about.title')}
                </h2>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {t('about.intro')}
                  </p>
                  
                  <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
                    {t('about.features.title')}
                  </h3>
                  
                  <ul className="space-y-4 mb-8">
                    {features.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {t('about.description')}
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.contact')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form Section */}
            <div className="lg:w-1/2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-4xl font-bold mb-8 text-emerald-800 border-b-2 border-emerald-200 pb-4">
                  {t('contact.title')}
                </h2>
                <ContactForm />
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
