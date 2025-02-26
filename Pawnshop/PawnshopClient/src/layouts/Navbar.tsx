import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import burgerIcon from "../assets/icons/burger.svg";
import { useAuth } from "../context/AuthContext";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { t } = useTranslation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { employee, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="w-full h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <img src={burgerIcon} alt="Menu" className="h-6 w-6 filter brightness-0 invert" />
        </button>

        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium">
            {employee ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{`${employee.firstName} ${employee.lastName}`}</span>
              </div>
            ) : (
              "John Doe"
            )}
          </span>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 rounded-full cursor-pointer 
                       flex items-center justify-center transition-colors duration-200
                       border-2 border-white/20 shadow-inner"
            >
              <span className="text-lg font-medium">
                {employee ? employee.firstName[0] + employee.lastName[0] : "JD"}
              </span>
            </button>

            {isDropdownVisible && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-200 z-50">
                <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
                  <p className="text-sm text-emerald-900 font-medium">{t('navbar.loggedInAs')}</p>
                  <p className="text-sm text-emerald-700">{`${employee?.firstName || 'John'} ${employee?.lastName || 'Doe'}`}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => logout()}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 
                               flex items-center space-x-2 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>{t('navbar.logout')}</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
