import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import PawnshopLogo from "../assets/PawnshopLogo.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import addCustomerIcon from "../assets/icons/addCustomer.svg";
import allCustomersIcon from "../assets/icons/allCustomers.svg";
import addProductIcon from "../assets/icons/addProduct.svg";
import allProductIcon from "../assets/icons/allProduct.svg";
import addEmployeeIcon from "../assets/icons/addEmployee.svg";
import allEmployeesIcon from "../assets/icons/allEmployees.svg";
import archivesIcon from "../assets/icons/archives.svg";
import settingsIcon from "../assets/icons/settings.svg";
import SidebarLink from "../components/SidebarLink";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const { t } = useTranslation();
  const { employee } = useAuth();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => isOpen = false}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white fixed top-0 left-0 
                   bottom-0 z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-emerald-700/50">
          <img 
            src={PawnshopLogo} 
            alt="Pawnshop Logo" 
            className="h-10 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-200" 
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-transparent">
          {/* Main Navigation */}
          <div className="flex-1 px-2 py-2 space-y-6 [&_li]:list-none [&_li]:before:content-none">
            <div>
              <h2 className="px-3 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                {t('sidebar.sections.main')}
              </h2>
              <ul className="list-none space-y-1">
                <li><SidebarLink to="/pawnshop/dashboard" iconSrc={dashboardIcon} label={t('sidebar.links.dashboard')} end={true} /></li>
              </ul>
            </div>

            <div>
              <h2 className="px-3 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                {t('sidebar.sections.customers')}
              </h2>
              <ul className="list-none space-y-1">
                <li><SidebarLink to="/pawnshop/dashboard/add-customer" iconSrc={addCustomerIcon} label={t('sidebar.links.addCustomer')} /></li>
                <li><SidebarLink to="/pawnshop/dashboard/customers" iconSrc={allCustomersIcon} label={t('sidebar.links.customerList')} /></li>
              </ul>
            </div>

            <div>
              <h2 className="px-3 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                {t('sidebar.sections.products')}
              </h2>
              <ul className="list-none space-y-1">
                <li><SidebarLink to="/pawnshop/dashboard/add-product" iconSrc={addProductIcon} label={t('sidebar.links.addProduct')} /></li>
                <li><SidebarLink to="/pawnshop/dashboard/products" iconSrc={allProductIcon} label={t('sidebar.links.productList')} /></li>
              </ul>
            </div>

            {employee?.role === "admin" && (
              <div>
                <h2 className="px-3 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                  {t('sidebar.sections.employees')}
                </h2>
                <ul className="list-none space-y-1">
                  <li><SidebarLink to="/pawnshop/dashboard/add-employee" iconSrc={addEmployeeIcon} label={t('sidebar.links.addEmployee')} /></li>
                  <li><SidebarLink to="/pawnshop/dashboard/employees" iconSrc={allEmployeesIcon} label={t('sidebar.links.employeeList')} /></li>
                </ul>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-emerald-700/50 px-2 py-2">
            <h2 className="px-3 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              {t('sidebar.sections.system')}
            </h2>
            <ul className="list-none space-y-1">
              <li><SidebarLink to="/pawnshop/dashboard/archives" iconSrc={archivesIcon} label={t('sidebar.links.archives')} /></li>
              <li><SidebarLink to="/pawnshop/dashboard/settings" iconSrc={settingsIcon} label={t('sidebar.links.settings')} /></li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
