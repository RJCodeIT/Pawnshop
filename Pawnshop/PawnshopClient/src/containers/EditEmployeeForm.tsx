import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import { useAlert } from '../context/AlertContext';
import { useTranslation } from 'react-i18next';

type EmployeeData = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  dateOfBirth: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  login: string;
  password: string;
  role: string;
};

interface EditEmployeeFormProps {
  employee: EmployeeData;
}

export default function EditEmployeeForm({ employee }: EditEmployeeFormProps) {
  const { t } = useTranslation();
  const [employeeData, setEmployeeData] = useState<EmployeeData>(employee);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'pesel',
      'dateOfBirth',
      'street',
      'houseNumber',
      'postalCode',
      'city',
      'idSeries',
      'idNumber',
      'phoneNumber',
      'email',
      'login',
      'password',
      'role',
    ];

    for (const field of requiredFields) {
      if (!employeeData[field as keyof EmployeeData]) {
        showAlert(t('forms.employee.validation.required', { field: t(`forms.employee.fields.${field}.label`) }), 'error');
        return false;
      }
    }
  
    if (employeeData.pesel.length !== 11 || !/^\d+$/.test(employeeData.pesel)) {
      showAlert(t('forms.employee.validation.pesel'), 'error');
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeData.email)) {
      showAlert(t('forms.employee.validation.email'), 'error');
      return false;
    }
  
    if (employeeData.phoneNumber.length < 9 || employeeData.phoneNumber.length > 15 || !/^\d+$/.test(employeeData.phoneNumber)) {
      showAlert(t('forms.employee.validation.phoneNumber'), 'error');
      return false;
    }
  
    if (employeeData.role !== 'admin' && employeeData.role !== 'employee') {
      showAlert(t('forms.employee.validation.role'), 'error');
      return false;
    }
  
    return true;
  };
  

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/employees/${employeeData.id}`, employeeData);
  
      if (response.status === 200) {
        showAlert(t('forms.employee.validation.editSuccess'), 'success');
        navigate('/pawnshop/dashboard/employees');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      showAlert(t('forms.employee.validation.editError'), 'error');
    }
  };
  

  const handleGoBack = () => {
    navigate('/pawnshop/dashboard/employees');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.employee.sections.personal')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.employee.fields.firstName.label')} type="text" placeholder={t('forms.employee.fields.firstName.placeholder')} value={employeeData.firstName} required={true} onChange={handleChange} name="firstName" />
              <CreateForm label={t('forms.employee.fields.lastName.label')} type="text" placeholder={t('forms.employee.fields.lastName.placeholder')} value={employeeData.lastName} required={true} onChange={handleChange} name="lastName" />
              <CreateForm label={t('forms.employee.fields.pesel.label')} type="text" placeholder={t('forms.employee.fields.pesel.placeholder')} value={employeeData.pesel} required={true} onChange={handleChange} name="pesel" />
              <CreateForm label={t('forms.employee.fields.dateOfBirth.label')} type="date" placeholder="YYYY-MM-DD" value={employeeData.dateOfBirth} required={true} onChange={handleChange} name="dateOfBirth" />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.employee.sections.address')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.employee.fields.street.label')} type="text" placeholder={t('forms.employee.fields.street.placeholder')} value={employeeData.street} required={true} onChange={handleChange} name="street" />
              <CreateForm label={t('forms.employee.fields.houseNumber.label')} type="text" placeholder={t('forms.employee.fields.houseNumber.placeholder')} value={employeeData.houseNumber} required={true} onChange={handleChange} name="houseNumber" />
              <CreateForm label={t('forms.employee.fields.postalCode.label')} type="text" placeholder={t('forms.employee.fields.postalCode.placeholder')} value={employeeData.postalCode} required={true} onChange={handleChange} name="postalCode" />
              <CreateForm label={t('forms.employee.fields.city.label')} type="text" placeholder={t('forms.employee.fields.city.placeholder')} value={employeeData.city} required={true} onChange={handleChange} name="city" />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.employee.sections.id')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.employee.fields.idSeries.label')} type="text" placeholder={t('forms.employee.fields.idSeries.placeholder')} value={employeeData.idSeries} required={true} onChange={handleChange} name="idSeries" />
              <CreateForm label={t('forms.employee.fields.idNumber.label')} type="text" placeholder={t('forms.employee.fields.idNumber.placeholder')} value={employeeData.idNumber} required={true} onChange={handleChange} name="idNumber" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.employee.sections.contact')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.employee.fields.phoneNumber.label')} type="tel" placeholder={t('forms.employee.fields.phoneNumber.placeholder')} value={employeeData.phoneNumber} required={true} onChange={handleChange} name="phoneNumber" />
              <CreateForm label={t('forms.employee.fields.email.label')} type="email" placeholder={t('forms.employee.fields.email.placeholder')} value={employeeData.email} required={true} onChange={handleChange} name="email" />
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.employee.sections.account')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CreateForm label={t('forms.employee.fields.login.label')} type="text" placeholder={t('forms.employee.fields.login.placeholder')} value={employeeData.login} required={true} onChange={handleChange} name="login" />
              <CreateForm label={t('forms.employee.fields.password.label')} type="password" placeholder={t('forms.employee.fields.password.placeholder')} value={employeeData.password} required={true} onChange={handleChange} name="password" />
              <CreateForm label={t('forms.employee.fields.role.label')} type="text" placeholder={t('forms.employee.fields.role.placeholder')} value={employeeData.role} required={true} onChange={handleChange} name="role" />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg
                       hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.employee.cancel')}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.employee.editSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
