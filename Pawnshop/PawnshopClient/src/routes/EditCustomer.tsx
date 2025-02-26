import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EditCustomerForm from "../containers/EditCustomerForm";

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
}

export default function EditCustomer() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        alert(t('routes.errors.fetchCustomer'));
      }
    };

    fetchCustomerData();
  }, [id, t]);

  const handleUpdate = async (updatedValues: Customer) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, updatedValues);
      alert(t('routes.success.updateCustomer'));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(t('routes.errors.updateCustomer'));
    }
  };

  if (!customer) {
    return <p>{t('routes.loading.customer')}</p>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center">{t('routes.edit.customer')}</h2>
      <EditCustomerForm initialValues={customer} onSubmit={handleUpdate} />
    </div>
  );
}
