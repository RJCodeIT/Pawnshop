import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PawnshopLogo from "../assets/PawnshopLogo.png";

export default function HomeNavbar() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <img src={PawnshopLogo} alt="Pawnshop Logo" className="h-12 w-auto filter drop-shadow-md hover:scale-105 transition-transform duration-200" />
          </div>
          <nav>
            <Link 
              to="/pawnshop/login" 
              className="inline-flex items-center px-6 py-2.5 border-2 border-white text-white font-medium rounded-lg
                         hover:bg-white hover:text-emerald-600 transition-all duration-200 ease-in-out
                         shadow-sm hover:shadow-md text-sm tracking-wide"
            >
              {t('login')}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
