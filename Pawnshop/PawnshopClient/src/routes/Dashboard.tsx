import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import Customers from "./Customers";
import Products from "./Products";
import Employees from "./Employees";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";
import AddEmployee from "./AddEmployee";
import EditCustomer from "./EditCustomer";
import EditProduct from "./EditProduct";
import EditEmployee from "./EditEmployee";
import Archives from "./Archives";
import Settings from "./Settings";
import ProtectedRoute from "../components/ProtectedRoute";
import StatsGrid from "../components/StatsGrid";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={
                <div className="p-6 space-y-8">
                  {/* Nagłówek dashboardu */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h1>
                      <p className="text-gray-600">{t('dashboard.subtitle')}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => navigate("/dashboard/add-product")}
                        className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg
                                 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                 focus:ring-offset-2 transition-colors duration-200"
                      >
                        {t('dashboard.buttons.addProduct')}
                      </button>
                      <button
                        onClick={() => navigate("/dashboard/add-customer")}
                        className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg
                                 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                 focus:ring-offset-2 transition-colors duration-200"
                      >
                        {t('dashboard.buttons.addCustomer')}
                      </button>
                    </div>
                  </div>

                  {/* Statystyki */}
                  <StatsGrid />

                  {/* Sekcja szybkich akcji */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('dashboard.quickActions.title')}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => navigate("/dashboard/products")}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200
                                   flex flex-col items-center justify-center text-gray-700"
                        >
                          <svg className="w-6 h-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          {t('dashboard.quickActions.productsList')}
                        </button>
                        <button
                          onClick={() => navigate("/dashboard/customers")}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200
                                   flex flex-col items-center justify-center text-gray-700"
                        >
                          <svg className="w-6 h-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {t('dashboard.quickActions.customersList')}
                        </button>
                        <button
                          onClick={() => navigate("/dashboard/settings")}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200
                                   flex flex-col items-center justify-center text-gray-700"
                        >
                          <svg className="w-6 h-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t('dashboard.quickActions.settings')}
                        </button>
                        <button
                          onClick={() => navigate("/dashboard/employees")}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200
                                   flex flex-col items-center justify-center text-gray-700"
                        >
                          <svg className="w-6 h-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {t('dashboard.quickActions.employees')}
                        </button>
                      </div>
                    </div>

                    {/* Sekcja przypomnień */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('dashboard.reminders.title')}</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="font-medium text-yellow-800">{t('dashboard.reminders.upcomingDeadline')}</p>
                              <p className="text-sm text-yellow-600">{t('dashboard.reminders.deadlineDescription')}</p>
                            </div>
                          </div>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            {t('dashboard.reminders.check')}
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="font-medium text-emerald-800">{t('dashboard.reminders.newProducts')}</p>
                              <p className="text-sm text-emerald-600">{t('dashboard.reminders.newProductsDescription')}</p>
                            </div>
                          </div>
                          <button className="text-emerald-600 hover:text-emerald-800">
                            {t('dashboard.reminders.view')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route
                path="/add-employee"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AddEmployee />
                  </ProtectedRoute>
                }
              />
              <Route path="/customers/edit/:id" element={<EditCustomer />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route
                path="/employees/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <EditEmployee />
                  </ProtectedRoute>
                }
              />
              <Route path="/archives" element={<Archives />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
