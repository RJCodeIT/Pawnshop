import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EditEmployeeForm from "../containers/EditEmployeeForm";

type Employee = {
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

export default function EditEmployee() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log("Fetching employee with ID:", id);
        const response = await axios.get<Employee>(
          `${import.meta.env.VITE_API_URL}/api/employees/${id}`
        );
        console.log("API Response:", response.data);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
        alert(t('routes.errors.fetchEmployee'));
        navigate('/dashboard/employees');
      }
    };

    if (id) fetchEmployee();
  }, [id, t, navigate]);

  if (!employeeData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg">{t('routes.loading.employee')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">{t('routes.edit.employee')}</h2>
      <EditEmployeeForm employee={employeeData} />
    </div>
  );
}
