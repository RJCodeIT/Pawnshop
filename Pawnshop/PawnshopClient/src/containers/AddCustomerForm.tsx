import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';

export default function AddCustomerForm() {
  const { t } = useTranslation();
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    pesel: '',
    dateOfBirth: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    idSeries: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    notes: '',
  });

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
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
    ];

    for (const field of requiredFields) {
      if (!customerData[field as keyof typeof customerData]) {
        showAlert(t('forms.customer.validation.required', { field: t(`forms.customer.fields.${field}.label`) }), 'error');
        return false;
      }
    }

    if (customerData.pesel.length !== 11 || !/^\d+$/.test(customerData.pesel)) {
      showAlert(t('forms.customer.validation.pesel'), 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, customerData);

      if (response.status === 201) {
        showAlert(t('forms.customer.validation.success'), 'success');
        navigate('/pawnshop/dashboard/customers');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      showAlert(t('forms.customer.validation.error'), 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">        
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.personal')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.customer.fields.firstName.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.firstName.placeholder')} 
                value={customerData.firstName} 
                required={true} 
                onChange={handleChange} 
                name="firstName" 
              />
              <CreateForm 
                label={t('forms.customer.fields.lastName.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.lastName.placeholder')} 
                value={customerData.lastName} 
                required={true} 
                onChange={handleChange} 
                name="lastName" 
              />
              <CreateForm 
                label={t('forms.customer.fields.pesel.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.pesel.placeholder')} 
                value={customerData.pesel} 
                required={true} 
                onChange={handleChange} 
                name="pesel" 
              />
              <CreateForm 
                label={t('forms.customer.fields.dateOfBirth.label')} 
                type="date" 
                placeholder={t('forms.customer.fields.dateOfBirth.placeholder')} 
                value={customerData.dateOfBirth} 
                required={true} 
                onChange={handleChange} 
                name="dateOfBirth" 
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.address')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.customer.fields.street.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.street.placeholder')} 
                value={customerData.street} 
                required={true} 
                onChange={handleChange} 
                name="street" 
              />
              <CreateForm 
                label={t('forms.customer.fields.houseNumber.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.houseNumber.placeholder')} 
                value={customerData.houseNumber} 
                required={true} 
                onChange={handleChange} 
                name="houseNumber" 
              />
              <CreateForm 
                label={t('forms.customer.fields.postalCode.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.postalCode.placeholder')} 
                value={customerData.postalCode} 
                required={true} 
                onChange={handleChange} 
                name="postalCode" 
              />
              <CreateForm 
                label={t('forms.customer.fields.city.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.city.placeholder')} 
                value={customerData.city} 
                required={true} 
                onChange={handleChange} 
                name="city" 
              />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.identification')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm 
                label={t('forms.customer.fields.idSeries.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.idSeries.placeholder')} 
                value={customerData.idSeries} 
                required={true} 
                onChange={handleChange} 
                name="idSeries" 
              />
              <CreateForm 
                label={t('forms.customer.fields.idNumber.label')} 
                type="text" 
                placeholder={t('forms.customer.fields.idNumber.placeholder')} 
                value={customerData.idNumber} 
                required={true} 
                onChange={handleChange} 
                name="idNumber" 
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.contact')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.customer.fields.phoneNumber.label')} 
                type="tel" 
                placeholder={t('forms.customer.fields.phoneNumber.placeholder')} 
                value={customerData.phoneNumber} 
                required={false} 
                onChange={handleChange} 
                name="phoneNumber" 
              />
              <CreateForm 
                label={t('forms.customer.fields.email.label')} 
                type="email" 
                placeholder={t('forms.customer.fields.email.placeholder')} 
                value={customerData.email} 
                required={false} 
                onChange={handleChange} 
                name="email" 
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.notes')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm
                label={t('forms.customer.fields.notes.label')}
                placeholder={t('forms.customer.fields.notes.placeholder')}
                type="text"
                name="notes"
                value={customerData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 
                       focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
            >
              {t('forms.customer.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
