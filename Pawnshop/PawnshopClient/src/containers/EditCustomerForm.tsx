import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CreateForm from "../components/CreateForm";
import { useAlert } from '../context/AlertContext';
import { useTranslation } from 'react-i18next';

interface Customer {
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
  notes: string;
  products?: {
    id: string;
    productName: string;
    transactionType: string;
  }[];
}

interface EditCustomerFormProps {
  initialValues: Customer;
  onSubmit: (values: Customer) => Promise<void>;
}

export default function EditCustomerForm({ initialValues, onSubmit }: EditCustomerFormProps) {
  const { t } = useTranslation();
  const [customerData, setCustomerData] = useState<Customer>(initialValues);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Initial values received:', initialValues);
    setCustomerData(initialValues);
  }, [initialValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!customerData?.[field as keyof typeof customerData]) {
        showAlert(t('forms.customer.validation.required', { field: t(`forms.customer.fields.${field}.label`) }), 'error');
        return false;
      }
    }

    if (customerData?.pesel.length !== 11 || !/^\d+$/.test(customerData.pesel)) {
      showAlert(t('forms.customer.validation.pesel'), 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        ...customerData,
        id: initialValues.id // Make sure we keep the original ID
      });
      showAlert(t('forms.customer.validation.editSuccess'), 'success');
      navigate('/pawnshop/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      showAlert(t('forms.customer.validation.editError'), 'error');
    }
  };

  const handleGoBack = () => {
    navigate('/pawnshop/dashboard/customers');
  };

  if (!initialValues || !customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.personal')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.customer.fields.firstName.label')} type="text" name="firstName" value={customerData.firstName} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.lastName.label')} type="text" name="lastName" value={customerData.lastName} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.pesel.label')} type="text" name="pesel" value={customerData.pesel} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.dateOfBirth.label')} type="date" name="dateOfBirth" value={customerData.dateOfBirth} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.address')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.customer.fields.street.label')} type="text" name="street" value={customerData.street} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.houseNumber.label')} type="text" name="houseNumber" value={customerData.houseNumber} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.postalCode.label')} type="text" name="postalCode" value={customerData.postalCode} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.city.label')} type="text" name="city" value={customerData.city} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.identification')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.customer.fields.idSeries.label')} type="text" name="idSeries" value={customerData.idSeries} required={true} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.idNumber.label')} type="text" name="idNumber" value={customerData.idNumber} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.contact')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label={t('forms.customer.fields.phoneNumber.label')} type="text" name="phoneNumber" value={customerData.phoneNumber} onChange={handleInputChange} />
              <CreateForm label={t('forms.customer.fields.email.label')} type="email" name="email" value={customerData.email} onChange={handleInputChange} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.sections.notes')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm label={t('forms.customer.fields.notes.label')} type="text" name="notes" value={customerData.notes || ''} onChange={handleInputChange} />
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
              {t('forms.customer.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.customer.editSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
